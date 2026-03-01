import Trip from '../models/Trip.js';

// @desc  Get all trips for the logged-in user
// @route GET /api/trips
// @access Private
export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Get single trip by ID (tripId string or MongoDB _id)
// @route GET /api/trips/:id
// @access Private
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      $or: [{ tripId: req.params.id }, { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null }],
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Create a new trip (booking request)
// @route POST /api/trips
// @access Private
export const createTrip = async (req, res) => {
  try {
    const tripData = { ...req.body, user: req.user._id };

    // Build initial timeline
    if (!tripData.timeline || tripData.timeline.length === 0) {
      tripData.timeline = [
        { step: 'Booking Submitted', status: 'completed', date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
        { step: 'Vendor Approval', status: 'pending', date: null },
        { step: 'Confirmed', status: 'pending', date: null },
        { step: 'Trip Completed', status: 'pending', date: null },
      ];
    }

    const trip = await Trip.create(tripData);
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create trip', error: error.message });
  }
};

// @desc  Cancel a trip
// @route PATCH /api/trips/:id/cancel
// @access Private
export const cancelTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripId: req.params.id, user: req.user._id });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.status === 'completed' || trip.status === 'cancelled') {
      return res.status(400).json({ message: `Cannot cancel a ${trip.status} trip` });
    }

    trip.status = 'cancelled';
    await trip.save();
    res.json({ message: 'Trip cancelled successfully', trip });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Update trip status (admin/vendor use)
// @route PATCH /api/trips/:id/status
// @access Private
export const updateTripStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const trip = await Trip.findOne({ tripId: req.params.id, user: req.user._id });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.status = status;
    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Delete a trip
// @route DELETE /api/trips/:id
// @access Private
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ tripId: req.params.id, user: req.user._id });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
