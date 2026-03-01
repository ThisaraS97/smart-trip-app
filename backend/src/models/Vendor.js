import mongoose from 'mongoose';

const socialMediaSchema = mongoose.Schema({
  facebook: { type: String },
  instagram: { type: String },
});

const addressSchema = mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String },
  country: { type: String, default: 'Sri Lanka' },
});

const primaryContactSchema = mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const bankDetailsSchema = mongoose.Schema({
  bankName: { type: String, required: true },
  branch: { type: String },
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String },
  swiftCode: { type: String },
});

const vendorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    registrationNumber: { type: String },
    taxId: { type: String },
    yearEstablished: { type: Number },
    businessEmail: { type: String, required: true },
    businessPhone: { type: String, required: true },
    website: { type: String },
    socialMedia: socialMediaSchema,
    address: addressSchema,
    primaryContact: primaryContactSchema,
    services: [{ type: String }],
    otherServices: { type: String },
    bankDetails: bankDetailsSchema,
    status: {
      type: String,
      enum: ['pending_review', 'approved', 'rejected', 'suspended'],
      default: 'pending_review',
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
