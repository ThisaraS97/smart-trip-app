import Vendor from '../models/Vendor.js';

// @desc    Register a new vendor
// @route   POST /api/vendors/register
// @access  Private
export const registerVendor = async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      registrationNumber,
      taxId,
      yearEstablished,
      businessEmail,
      businessPhone,
      website,
      socialMedia,
      address,
      primaryContact,
      services,
      otherServices,
      bankDetails,
    } = req.body;

    // The user ID will come from the auth middleware
    const user = req.user._id;

    // Check if a vendor profile already exists for this user
    const existingVendor = await Vendor.findOne({ user });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor profile already exists for this user.' });
    }

    const vendor = new Vendor({
      user,
      businessName,
      businessType,
      registrationNumber,
      taxId,
      yearEstablished,
      businessEmail,
      businessPhone,
      website,
      socialMedia,
      address,
      primaryContact,
      services,
      otherServices,
      bankDetails,
    });

    const createdVendor = await vendor.save();
    res.status(201).json(createdVendor);
  } catch (error) {
    console.error('Error registering vendor:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
