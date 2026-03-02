/**
 * Seed script — populates MongoDB with sample data for all collections.
 * Run: node src/seed.js
 * Add --fresh flag to wipe existing data first: node src/seed.js --fresh
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

import User from './models/User.js';
import Vendor from './models/Vendor.js';
import Trip from './models/Trip.js';
import SavedTrip from './models/SavedTrip.js';
import InventoryItem from './models/InventoryItem.js';

const FRESH = process.argv.includes('--fresh');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  if (FRESH) {
    await Promise.all([
      User.deleteMany({}),
      Vendor.deleteMany({}),
      Trip.deleteMany({}),
      SavedTrip.deleteMany({}),
      InventoryItem.deleteMany({}),
    ]);
    console.log('🗑  Cleared all collections');
  }

  // ─── USERS ────────────────────────────────────────────────────────────────
  const hash = (pw) => bcrypt.hash(pw, 10);

  const [adminUser, user1, user2, vendorUser1, vendorUser2] = await Promise.all([
    User.create({
      name: 'Admin User',
      email: 'admin@smarttrip.lk',
      password: await hash('Admin@123'),
      role: 'admin',
      phone: '+94 77 000 0001',
      location: 'Colombo, Sri Lanka',
      bio: 'Platform administrator for SmartTrip.',
      photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin',
    }),
    User.create({
      name: 'Thisara Perera',
      email: 'thisara@example.com',
      password: await hash('User@123'),
      role: 'user',
      phone: '+94 71 234 5678',
      dateOfBirth: '1995-06-15',
      location: 'Kandy, Sri Lanka',
      bio: 'Passionate traveller who loves exploring hill country routes.',
      photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Thisara',
      travelInterests: ['Nature', 'Adventure', 'Cultural'],
      travelPreferences: {
        accommodationType: ['Hotel', 'Villa'],
        mealPlan: 'all-inclusive',
        budgetRange: 75,
        travelStyle: 'adventure',
        activityInterests: ['Hiking', 'Wildlife', 'Photography'],
        dietaryRestrictions: [],
        accessibilityNeeds: [],
        petTraveler: false,
      },
    }),
    User.create({
      name: 'Nimasha Silva',
      email: 'nimasha@example.com',
      password: await hash('User@123'),
      role: 'user',
      phone: '+94 76 987 6543',
      dateOfBirth: '1998-03-22',
      location: 'Galle, Sri Lanka',
      bio: 'Beach lover and food enthusiast.',
      photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Nimasha',
      travelInterests: ['Beach', 'Food', 'Relaxation'],
      travelPreferences: {
        accommodationType: ['Resort', 'Boutique Hotel'],
        mealPlan: 'breakfast',
        budgetRange: 60,
        travelStyle: 'luxury',
        activityInterests: ['Snorkeling', 'Spa', 'Sunset Cruises'],
      },
    }),
    User.create({
      name: 'Roshan De Silva',
      email: 'roshan.vendor@example.com',
      password: await hash('Vendor@123'),
      role: 'vendor',
      phone: '+94 72 111 2222',
      location: 'Colombo, Sri Lanka',
      photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Roshan',
    }),
    User.create({
      name: 'Amaya Tours',
      email: 'amaya.vendor@example.com',
      password: await hash('Vendor@123'),
      role: 'vendor',
      phone: '+94 77 333 4444',
      location: 'Negombo, Sri Lanka',
      photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Amaya',
    }),
  ]);
  console.log('👤 Created 5 users');

  // ─── VENDORS ──────────────────────────────────────────────────────────────
  const [vendor1, vendor2] = await Promise.all([
    Vendor.create({
      user: vendorUser1._id,
      businessName: 'Ceylon Journeys Pvt Ltd',
      businessType: 'Tour Operator',
      registrationNumber: 'BP/12345/2018',
      taxId: 'TAX-567890',
      yearEstablished: 2018,
      businessEmail: 'info@ceylanjourneys.lk',
      businessPhone: '+94 11 234 5678',
      website: 'https://ceylanjourneys.lk',
      socialMedia: { facebook: 'fb.com/ceylanjourneys', instagram: '@ceylanjourneys' },
      address: {
        addressLine1: '45, Galle Road',
        addressLine2: 'Level 2',
        city: 'Colombo',
        province: 'Western',
        postalCode: '00300',
        country: 'Sri Lanka',
      },
      primaryContact: {
        name: 'Roshan De Silva',
        designation: 'Managing Director',
        phone: '+94 72 111 2222',
        email: 'roshan@ceylanjourneys.lk',
      },
      services: ['Tour Packages', 'Hotel Bookings', 'Transport', 'Guide Services'],
      bankDetails: {
        bankName: 'Commercial Bank of Ceylon',
        branch: 'Colombo Branch',
        accountName: 'Ceylon Journeys Pvt Ltd',
        accountNumber: '1234567890',
        accountType: 'Current',
      },
      status: 'approved',
    }),
    Vendor.create({
      user: vendorUser2._id,
      businessName: 'Amaya Coastal Tours',
      businessType: 'Travel Agency',
      registrationNumber: 'BP/78901/2020',
      yearEstablished: 2020,
      businessEmail: 'hello@amayacoastal.lk',
      businessPhone: '+94 31 456 7890',
      website: 'https://amayacoastal.lk',
      socialMedia: { instagram: '@amayacoastal' },
      address: {
        addressLine1: '12, Beach Road',
        city: 'Negombo',
        province: 'Western',
        postalCode: '11500',
        country: 'Sri Lanka',
      },
      primaryContact: {
        name: 'Amaya Gunawardena',
        designation: 'Director',
        phone: '+94 77 333 4444',
        email: 'amaya@amayacoastal.lk',
      },
      services: ['Beach Tours', 'Water Sports', 'Day Trips', 'Airport Transfers'],
      bankDetails: {
        bankName: 'People\'s Bank',
        branch: 'Negombo Branch',
        accountName: 'Amaya Coastal Tours',
        accountNumber: '9876543210',
        accountType: 'Current',
      },
      status: 'approved',
    }),
  ]);
  console.log('🏢 Created 2 vendors');

  // ─── INVENTORY ITEMS ──────────────────────────────────────────────────────
  const inventoryData = [
    // Ceylon Journeys inventory
    { vendor: vendor1._id, name: 'Sigiriya Rock Fortress Day Tour', type: 'activity', description: 'Full-day guided tour to the iconic Sigiriya Rock Fortress with lunch.', price: 12500, capacity: 20, availableCount: 18, location: 'Sigiriya, Central Province', amenities: ['Lunch included', 'English guide', 'Transport', 'Entry tickets'], images: ['https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800'] },
    { vendor: vendor1._id, name: 'Kandy Cultural Triangle Tour (3D/2N)', type: 'package', description: 'Explore Kandy, Dambulla and Polonnaruwa in a 3-day cultural package.', price: 45000, capacity: 10, availableCount: 8, location: 'Kandy & Central Province', amenities: ['Hotel stay', 'All meals', 'Guide', 'AC transport', 'Entry tickets'], images: ['https://images.unsplash.com/photo-1616128417859-3a984dd35f02?w=800'] },
    { vendor: vendor1._id, name: 'Ella Hill Country Train & Hike (2D/1N)', type: 'package', description: 'Scenic train ride from Kandy to Ella + hike to Little Adam\'s Peak.', price: 32000, capacity: 15, availableCount: 12, location: 'Ella, Uva Province', amenities: ['Train ticket', 'Guesthouse stay', 'Breakfast', 'Hiking guide'], images: ['https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800'] },
    { vendor: vendor1._id, name: 'Luxury Mountain Villa (per night)', type: 'accommodation', description: 'Boutique villa overlooking the Knuckles Mountain Range.', price: 28000, capacity: 4, availableCount: 2, location: 'Knuckles, Kandy', amenities: ['Breakfast', 'WiFi', 'Mountain view', 'Private pool', 'Airport pickup'], images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'] },
    { vendor: vendor1._id, name: 'AC Mini Van Hire (per day)', type: 'transport', description: 'Air-conditioned Toyota KDH minivan with experienced driver. Seats 9.', price: 9500, capacity: 9, availableCount: 3, location: 'Island-wide', amenities: ['AC', 'WiFi hotspot', 'Experienced driver', 'Fuel included'], images: [] },
    // Amaya Coastal Tours inventory
    { vendor: vendor2._id, name: 'Mirissa Whale Watching Cruise', type: 'activity', description: 'Morning whale watching cruise off the south coast with breakfast on board.', price: 8500, capacity: 30, availableCount: 25, location: 'Mirissa Harbour, Southern Province', amenities: ['Breakfast', 'Life jackets', 'Marine biologist guide', 'Photos'], images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'] },
    { vendor: vendor2._id, name: 'Galle Fort & South Coast Day Tour', type: 'activity', description: 'Explore historic Galle Fort, sea turtle hatchery, and Unawatuna beach.', price: 11000, capacity: 12, availableCount: 10, location: 'Galle, Southern Province', amenities: ['Lunch', 'Guide', 'AC transport', 'Entrance fees'], images: ['https://images.unsplash.com/photo-1593553584634-b7a2b24d1f2c?w=800'] },
    { vendor: vendor2._id, name: 'Negombo Beach Resort (per night)', type: 'accommodation', description: 'Beachfront room at Amaya Lagoon with sea views and pool access.', price: 18500, capacity: 2, availableCount: 6, location: 'Negombo Beach', amenities: ['Breakfast', 'Pool', 'Beach access', 'WiFi', 'Spa discount'], images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'] },
    { vendor: vendor2._id, name: 'Airport Transfer (Negombo <-> CMB)', type: 'transport', description: 'Private AC car transfer between Bandaranaike International Airport and Negombo.', price: 3500, capacity: 4, availableCount: 8, location: 'Katunayake / Negombo', amenities: ['AC car', 'Meet & greet at airport', 'Flight tracking'], images: [] },
    { vendor: vendor2._id, name: 'Snorkeling & Water Sports Package', type: 'activity', description: 'Half-day snorkeling, kayaking and jet ski at Bentota lagoon.', price: 7500, capacity: 8, availableCount: 7, location: 'Bentota, Southern Province', amenities: ['Equipment provided', 'Safety briefing', 'Instructor', 'Soft drinks'], images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'] },
  ];
  await InventoryItem.insertMany(inventoryData);
  console.log('📦 Created 10 inventory items');

  // ─── TRIPS (for user1 — Thisara) ──────────────────────────────────────────
  const now = new Date();
  const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const isoDate = (d) => d.toISOString().split('T')[0];

  const future1 = new Date(now); future1.setDate(now.getDate() + 14);
  const future2 = new Date(now); future2.setDate(now.getDate() + 18);
  const future3 = new Date(now); future3.setDate(now.getDate() + 35);
  const future4 = new Date(now); future4.setDate(now.getDate() + 38);
  const past1s  = new Date(now); past1s.setDate(now.getDate() - 60);
  const past1e  = new Date(now); past1e.setDate(now.getDate() - 57);
  const past2s  = new Date(now); past2s.setDate(now.getDate() - 30);
  const past2e  = new Date(now); past2e.setDate(now.getDate() - 27);
  const pend3s  = new Date(now); pend3s.setDate(now.getDate() + 50);
  const pend3e  = new Date(now); pend3e.setDate(now.getDate() + 55);
  const u2future = new Date(now); u2future.setDate(now.getDate() + 10);
  const u2futEnd = new Date(now); u2futEnd.setDate(now.getDate() + 13);
  const u2past   = new Date(now); u2past.setDate(now.getDate() - 45);
  const u2pastE  = new Date(now); u2pastE.setDate(now.getDate() - 42);

  const tripDefs = [
    // 1. Confirmed upcoming
    {
      user: user1._id,
      destination: 'Sigiriya & Cultural Triangle',
      location: 'Sigiriya',
      status: 'confirmed',
      dates: { from: isoDate(future1), to: isoDate(future2) },
      totalCost: 45000,
      paymentStatus: 'paid',
      travelers: { adults: 2, children: 1 },
      travelerDetails: [
        { name: 'Thisara Perera', email: 'thisara@example.com', phone: '+94711234567', type: 'Adult' },
        { name: 'Priya Perera', email: '', phone: '', type: 'Adult' },
        { name: 'Sahan Perera', email: '', phone: '', type: 'Child' },
      ],
      bookingDate: fmt(new Date(now.getTime() - 7 * 86400000)),
      image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800',
      duration: '4 Days / 3 Nights',
      vendor: 'Ceylon Journeys Pvt Ltd',
      specialRequests: 'We need a child-friendly guide and vegetarian meals.',
      reviewStatus: 'none',
      timeline: [
        { step: 'Booking Submitted', status: 'completed', date: fmt(new Date(now.getTime() - 7 * 86400000)) },
        { step: 'Vendor Approval', status: 'completed', date: fmt(new Date(now.getTime() - 5 * 86400000)) },
        { step: 'Confirmed', status: 'completed', date: fmt(new Date(now.getTime() - 5 * 86400000)) },
        { step: 'Trip Completed', status: 'pending', date: null },
      ],
      itinerary: [
        { day: 1, date: isoDate(future1), sections: [{ time: 'Morning', items: [{ type: 'transport', name: 'Pickup from Kandy', details: { note: 'AC minivan from hotel' } }] }, { time: 'Afternoon', items: [{ type: 'activity', name: 'Dambulla Cave Temple', details: { duration: '2h' } }] }, { time: 'Evening', items: [{ type: 'hotel', name: 'Sigiriya Village Hotel', details: { checkIn: '18:00' } }] }] },
        { day: 2, date: isoDate(future2), sections: [{ time: 'Morning', items: [{ type: 'activity', name: 'Sigiriya Rock Fortress Climb', details: { difficulty: 'Moderate' } }, { type: 'meal', name: 'Breakfast at hotel', details: {} }] }] },
      ],
    },
    // 2. Pending approval
    {
      user: user1._id,
      destination: 'Ella Hill Country Escape',
      location: 'Ella',
      status: 'pending',
      dates: { from: isoDate(future3), to: isoDate(future4) },
      totalCost: 32000,
      paymentStatus: 'pending',
      travelers: { adults: 2, children: 0 },
      travelerDetails: [
        { name: 'Thisara Perera', email: 'thisara@example.com', phone: '+94711234567', type: 'Adult' },
        { name: 'Priya Perera', email: '', phone: '', type: 'Adult' },
      ],
      bookingDate: fmt(new Date(now.getTime() - 2 * 86400000)),
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
      duration: '3 Days / 2 Nights',
      vendor: 'Ceylon Journeys Pvt Ltd',
      specialRequests: '',
      reviewStatus: 'none',
      timeline: [
        { step: 'Booking Submitted', status: 'completed', date: fmt(new Date(now.getTime() - 2 * 86400000)) },
        { step: 'Vendor Approval', status: 'pending', date: null },
        { step: 'Confirmed', status: 'pending', date: null },
        { step: 'Trip Completed', status: 'pending', date: null },
      ],
    },
    // 3. Completed (with review pending)
    {
      user: user1._id,
      destination: 'Mirissa Whale Watching & Beach',
      location: 'Mirissa',
      status: 'completed',
      dates: { from: isoDate(past1s), to: isoDate(past1e) },
      totalCost: 28500,
      paymentStatus: 'paid',
      travelers: { adults: 2, children: 0 },
      bookingDate: fmt(new Date(past1s.getTime() - 10 * 86400000)),
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      duration: '3 Days / 2 Nights',
      vendor: 'Amaya Coastal Tours',
      specialRequests: '',
      reviewStatus: 'pending',
      timeline: [
        { step: 'Booking Submitted', status: 'completed', date: fmt(new Date(past1s.getTime() - 10 * 86400000)) },
        { step: 'Vendor Approval', status: 'completed', date: fmt(new Date(past1s.getTime() - 8 * 86400000)) },
        { step: 'Confirmed', status: 'completed', date: fmt(new Date(past1s.getTime() - 8 * 86400000)) },
        { step: 'Trip Completed', status: 'completed', date: fmt(past1e) },
      ],
    },
    // 4. Cancelled
    {
      user: user1._id,
      destination: 'Yala Safari Adventure',
      location: 'Yala',
      status: 'cancelled',
      dates: { from: isoDate(past2s), to: isoDate(past2e) },
      totalCost: 38000,
      paymentStatus: 'refunded',
      travelers: { adults: 3, children: 0 },
      bookingDate: fmt(new Date(past2s.getTime() - 14 * 86400000)),
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800',
      duration: '3 Days / 2 Nights',
      vendor: 'Ceylon Journeys Pvt Ltd',
      specialRequests: 'Safari jeep from sunrise.',
      reviewStatus: 'none',
      timeline: [
        { step: 'Booking Submitted', status: 'completed', date: fmt(new Date(past2s.getTime() - 14 * 86400000)) },
        { step: 'Vendor Approval', status: 'pending', date: null },
        { step: 'Confirmed', status: 'pending', date: null },
        { step: 'Trip Completed', status: 'pending', date: null },
      ],
    },
    // 5. Another pending (further future)
    {
      user: user1._id,
      destination: 'Negombo Beach Resort Weekend',
      location: 'Negombo',
      status: 'pending',
      dates: { from: isoDate(pend3s), to: isoDate(pend3e) },
      totalCost: 55000,
      paymentStatus: 'pending',
      travelers: { adults: 2, children: 2 },
      bookingDate: fmt(now),
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      duration: '5 Days / 4 Nights',
      vendor: 'Amaya Coastal Tours',
      specialRequests: 'Kids club activities needed.',
      reviewStatus: 'none',
      timeline: [
        { step: 'Booking Submitted', status: 'completed', date: fmt(now) },
        { step: 'Vendor Approval', status: 'pending', date: null },
        { step: 'Confirmed', status: 'pending', date: null },
        { step: 'Trip Completed', status: 'pending', date: null },
      ],
    },
    // user2 trips
    {
      user: user2._id,
      destination: 'Galle Fort & Southern Coast',
      location: 'Galle',
      status: 'confirmed',
      dates: { from: isoDate(u2future), to: isoDate(u2futEnd) },
      totalCost: 33000,
      paymentStatus: 'paid',
      travelers: { adults: 2, children: 0 },
      bookingDate: fmt(new Date(now.getTime() - 4 * 86400000)),
      image: 'https://images.unsplash.com/photo-1593553584634-b7a2b24d1f2c?w=800',
      duration: '3 Days / 2 Nights',
      vendor: 'Amaya Coastal Tours',
      reviewStatus: 'none',
      timeline: [
        { step: 'Booking Submitted', status: 'completed', date: fmt(new Date(now.getTime() - 4 * 86400000)) },
        { step: 'Vendor Approval', status: 'completed', date: fmt(new Date(now.getTime() - 3 * 86400000)) },
        { step: 'Confirmed', status: 'completed', date: fmt(new Date(now.getTime() - 3 * 86400000)) },
        { step: 'Trip Completed', status: 'pending', date: null },
      ],
    },
    {
      user: user2._id,
      destination: 'Bentota Water Sports Weekend',
      location: 'Bentota',
      status: 'completed',
      dates: { from: isoDate(u2past), to: isoDate(u2pastE) },
      totalCost: 22500,
      paymentStatus: 'paid',
      travelers: { adults: 1, children: 0 },
      bookingDate: fmt(new Date(u2past.getTime() - 7 * 86400000)),
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      duration: '3 Days / 2 Nights',
      vendor: 'Amaya Coastal Tours',
      reviewStatus: 'completed',
      timeline: [
        { step: 'Booking Submitted', status: 'completed', date: fmt(new Date(u2past.getTime() - 7 * 86400000)) },
        { step: 'Vendor Approval', status: 'completed', date: fmt(new Date(u2past.getTime() - 6 * 86400000)) },
        { step: 'Confirmed', status: 'completed', date: fmt(new Date(u2past.getTime() - 6 * 86400000)) },
        { step: 'Trip Completed', status: 'completed', date: fmt(u2pastE) },
      ],
    },
  ];

  // Save one-by-one so Mongoose pre-save hook generates tripId
  for (const def of tripDefs) {
    await new Trip(def).save();
  }
  console.log(`✈️  Created ${tripDefs.length} trips`);

  // ─── SAVED TRIPS ──────────────────────────────────────────────────────────
  await SavedTrip.insertMany([
    {
      user: user1._id,
      destination: 'Nuwara Eliya Tea Country',
      location: 'Nuwara Eliya',
      estimatedCost: 25000,
      duration: '3 Days / 2 Nights',
      thumbnail: 'https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?w=800',
      highlights: ['Tea factory visit', 'Gregory Lake boat ride', 'Horton Plains hike', 'Waterfall tour'],
      accommodationType: 'Colonial Hotel',
      travelers: '2 Adults',
      notes: 'Best visited April–June for cooler weather.',
    },
    {
      user: user1._id,
      destination: 'Arugam Bay Surf Holiday',
      location: 'Arugam Bay',
      estimatedCost: 35000,
      duration: '5 Days / 4 Nights',
      thumbnail: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=800',
      highlights: ['Surfing lessons', 'Kumana bird sanctuary', 'Lahugala elephant park', 'Seafood dining'],
      accommodationType: 'Beach Bungalow',
      travelers: '2 Adults',
      notes: 'Surf season May–September.',
    },
    {
      user: user1._id,
      destination: 'Adams Peak Pilgrimage Trek',
      location: 'Adam\'s Peak',
      estimatedCost: 8500,
      duration: '2 Days / 1 Night',
      thumbnail: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=800',
      highlights: ['Night trek', 'Sunrise summit view', 'Sri Pada footprint shrine', 'Waterfalls'],
      accommodationType: 'Guesthouse',
      travelers: '3 Adults',
      notes: 'Season: December–May. Start climb at 2 AM for sunrise.',
    },
    {
      user: user2._id,
      destination: 'Trincomalee Beach Week',
      location: 'Trincomalee',
      estimatedCost: 42000,
      duration: '6 Days / 5 Nights',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      highlights: ['Pigeon Island snorkeling', 'Marble Beach', 'Whale watching', 'Fort Frederick'],
      accommodationType: 'Beach Resort',
      travelers: '2 Adults',
      notes: 'Best April–September.',
    },
  ]);
  console.log('💾 Created 4 saved trips');

  // ─── SUMMARY ──────────────────────────────────────────────────────────────
  console.log('\n✅ Seed complete! Login credentials:');
  console.log('   Admin  : admin@smarttrip.lk        / Admin@123');
  console.log('   User 1 : thisara@example.com        / User@123  (5 trips, 3 saved)');
  console.log('   User 2 : nimasha@example.com        / User@123  (2 trips, 1 saved)');
  console.log('   Vendor1: roshan.vendor@example.com  / Vendor@123 (Ceylon Journeys)');
  console.log('   Vendor2: amaya.vendor@example.com   / Vendor@123 (Amaya Coastal Tours)');

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  mongoose.disconnect();
  process.exit(1);
});
