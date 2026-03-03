import Booking from '../models/Booking.js';
import InventoryItem from '../models/InventoryItem.js';
import Vendor from '../models/Vendor.js';

// GET /api/bookings  — current user's bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('items.inventory', 'name type price images location')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      'items.inventory',
      'name type price images location description'
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (
      booking.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorised' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/bookings  — create a booking (inventory-based OR itinerary-based)
export const createBooking = async (req, res) => {
  try {
    const {
      items, tripDates, pax, specialRequests,
      destination, location, duration, itinerarySummary, totalCost: bodyTotal,
    } = req.body;

    // ── Itinerary-based booking (no items) ────────────────────────────────
    if (!Array.isArray(items) || items.length === 0) {
      if (!bodyTotal)
        return res.status(400).json({ message: 'totalCost is required for itinerary bookings' });

      const booking = await Booking.create({
        user: req.user._id,
        items: [],
        destination: destination || '',
        location: location || '',
        duration: duration || '',
        itinerarySummary: itinerarySummary || [],
        totalCost: bodyTotal,
        tripDates: tripDates || {},
        pax: pax || { adults: 1, children: 0 },
        specialRequests: specialRequests || '',
      });
      return res.status(201).json(booking);
    }

    // ── Inventory-based booking ──────────────────────────────────────────
    let totalCost = 0;
    const resolvedItems = [];

    for (const item of items) {
      const inv = await InventoryItem.findById(item.inventory);
      if (!inv) return res.status(404).json({ message: `Inventory item ${item.inventory} not found` });
      const price = item.priceAtBooking ?? inv.price;
      totalCost += price;
      resolvedItems.push({ inventory: inv._id, priceAtBooking: price });
    }

    const booking = await Booking.create({
      user: req.user._id,
      items: resolvedItems,
      totalCost,
      tripDates: tripDates || {},
      pax: pax || { adults: 1, children: 0 },
      specialRequests: specialRequests || '',
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/bookings/:id/cancel  — user cancels own booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorised' });
    if (['cancelled', 'rejected'].includes(booking.status))
      return res.status(400).json({ message: 'Booking already closed' });

    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/bookings/:id/status  — admin/vendor updates status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/all  — admin: all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('items.inventory', 'name type price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/vendor  — vendor: only their bookings
export const getVendorBookings = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) return res.status(404).json({ message: 'Vendor profile not found' });

    const inventoryItems = await InventoryItem.find({ vendor: vendor._id }).select('_id');
    const inventoryIds = inventoryItems.map(i => i._id);

    const bookings = await Booking.find({ 'items.inventory': { $in: inventoryIds } })
      .populate('user', 'name email phone')
      .populate('items.inventory', 'name type price')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/bookings/:id/vendor-action  — vendor approves or rejects their booking
export const vendorBookingAction = async (req, res) => {
  try {
    const { action, notes } = req.body; // action: 'confirmed' | 'rejected'
    if (!['confirmed', 'rejected'].includes(action))
      return res.status(400).json({ message: 'action must be confirmed or rejected' });

    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) return res.status(404).json({ message: 'Vendor profile not found' });

    const inventoryItems = await InventoryItem.find({ vendor: vendor._id }).select('_id');
    const inventoryIds = inventoryItems.map(i => i._id.toString());

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Verify this booking actually belongs to this vendor
    const belongs = booking.items.some(item => inventoryIds.includes(item.inventory?.toString()));
    if (!belongs) return res.status(403).json({ message: 'Not authorised to update this booking' });

    if (booking.status !== 'pending')
      return res.status(400).json({ message: `Booking is already ${booking.status}` });

    booking.status = action;
    if (notes) booking.vendorNotes = notes;
    await booking.save();

    const updated = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate('items.inventory', 'name type price');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
