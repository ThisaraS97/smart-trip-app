import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingReview() {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // show after submit
  const [specialRequests, setSpecialRequests] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');

  const bookingDetails = {
    bookingRef: 'ST2025-KND-1847',
    destination: 'Kandy Cultural Tour',
    dates: {
      checkIn: 'March 15, 2025',
      checkOut: 'March 18, 2025',
      duration: '3 Days, 2 Nights'
    },
    travelers: {
      adults: 2,
      children: 1,
      infants: 0
    },
    itinerary: [
      {
        day: 1,
        date: 'March 15, 2025',
        hotel: 'Earl\'s Regency Hotel',
        transport: 'Private Car from Colombo',
        activities: ['Temple of the Tooth Visit', 'Kandy Lake Walk'],
        meals: ['Traditional Rice & Curry Lunch']
      },
      {
        day: 2,
        date: 'March 16, 2025',
        hotel: 'Earl\'s Regency Hotel',
        transport: null,
        activities: ['Royal Botanical Gardens', 'Cultural Dance Show'],
        meals: ['Hotel Restaurant Dinner']
      },
      {
        day: 3,
        date: 'March 17, 2025',
        hotel: 'Thilanka Hotel',
        transport: 'Shared Van to Colombo',
        activities: ['Tea Plantation Tour'],
        meals: ['Breakfast at Hotel']
      }
    ],
    costs: {
      accommodation: 42000,
      transport: 13000,
      activities: 10500,
      meals: 4000,
      addOns: 8000,
      subtotal: 77500,
      taxes: 9300,
      serviceFee: 3875,
      discount: 0,
      total: 90675
    }
  };

  const promoCodes = {
    'FIRST10': { type: 'percentage', value: 10, description: '10% off first booking' },
    'SUMMER25': { type: 'fixed', value: 5000, description: 'LKR 5,000 off' },
    'FAMILY15': { type: 'percentage', value: 15, description: '15% off for families' }
  };

  const handleApplyPromo = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo({ code: promoCode.toUpperCase(), ...promo });
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percentage') {
      return (bookingDetails.costs.subtotal * appliedPromo.value) / 100;
    }
    return appliedPromo.value;
  };

  const discount = calculateDiscount();
  const finalTotal = bookingDetails.costs.total - discount;

  const handleConfirmBooking = () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    setShowConfirmation(true);
  };

  const handleDownloadPDF = () => {
    alert('PDF download started...');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .slide-in { animation: slideIn 0.3s ease-out; }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Top Navigation */}
      <nav className="bg-slate-900 border border-white/10 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-800/50 rounded-lg">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-200">Review & Confirm Booking</h1>
                <p className="text-sm text-slate-400">{bookingDetails.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleDownloadPDF}
                className="px-4 py-2 text-sm font-medium text-lime-400 hover:bg-lime-50 rounded-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download PDF
              </button>
              <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/50 rounded-lg">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Itinerary & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Overview */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">{bookingDetails.destination}</h2>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{bookingDetails.dates.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                      </svg>
                      <span>{bookingDetails.travelers.adults} Adults, {bookingDetails.travelers.children} Child</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-lime-400 hover:bg-lime-50 rounded-lg border border-purple-200">
                  Edit Itinerary
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950 rounded-lg">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Check-in</p>
                  <p className="font-semibold text-slate-200">{bookingDetails.dates.checkIn}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Check-out</p>
                  <p className="font-semibold text-slate-200">{bookingDetails.dates.checkOut}</p>
                </div>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-200 mb-6">Complete Itinerary</h3>
              <div className="space-y-6">
                {bookingDetails.itinerary.map((day, index) => (
                  <div key={index} className="relative">
                    {index < bookingDetails.itinerary.length - 1 && (
                      <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center font-bold text-sm flex-shrink-0 relative z-10">
                        {day.day}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="mb-4">
                          <h4 className="font-bold text-slate-200 mb-1">Day {day.day}</h4>
                          <p className="text-sm text-slate-400">{day.date}</p>
                        </div>

                        <div className="space-y-3">
                          {/* Accommodation */}
                          <div className="flex items-start gap-3 p-3 bg-lime-500/10 rounded-lg">
                            <svg className="w-5 h-5 text-lime-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                            <div>
                              <p className="font-medium text-slate-200">Accommodation</p>
                              <p className="text-sm text-slate-400">{day.hotel}</p>
                            </div>
                          </div>

                          {/* Transport */}
                          {day.transport && (
                            <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                              </svg>
                              <div>
                                <p className="font-medium text-slate-200">Transportation</p>
                                <p className="text-sm text-slate-400">{day.transport}</p>
                              </div>
                            </div>
                          )}

                          {/* Activities */}
                          {day.activities.length > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-lime-50 rounded-lg">
                              <svg className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                              </svg>
                              <div className="flex-1">
                                <p className="font-medium text-slate-200">Activities</p>
                                <ul className="text-sm text-slate-400 space-y-1 mt-1">
                                  {day.activities.map((activity, idx) => (
                                    <li key={idx}>• {activity}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Meals */}
                          {day.meals.length > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                              <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                              </svg>
                              <div className="flex-1">
                                <p className="font-medium text-slate-200">Meals Included</p>
                                <ul className="text-sm text-slate-400 space-y-1 mt-1">
                                  {day.meals.map((meal, idx) => (
                                    <li key={idx}>• {meal}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-200 mb-4">Special Requests (Optional)</h3>
              <p className="text-sm text-slate-400 mb-4">
                Let us know if you have any special requirements or preferences for your trip.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="Any special requests or preferences..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="e.g., Vegetarian, Halal, Allergies..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Accessibility Needs
                  </label>
                  <input
                    type="text"
                    value={accessibilityNeeds}
                    onChange={(e) => setAccessibilityNeeds(e.target.value)}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="e.g., Wheelchair access, Mobility assistance..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Special Occasion
                  </label>
                  <input
                    type="text"
                    value={specialOccasion}
                    onChange={(e) => setSpecialOccasion(e.target.value)}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="e.g., Birthday, Anniversary, Honeymoon..."
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-200 mb-4">Terms & Conditions</h3>
              
              <div className="space-y-4 text-sm text-slate-300 max-h-64 overflow-y-auto p-4 bg-slate-950 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Soft-Booking Process</h4>
                  <p className="text-slate-400 leading-relaxed">
                    This is a soft booking request. Your booking will be sent to our partner vendors for confirmation. 
                    You will receive a confirmation within 24-48 hours. No payment is required at this stage.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Cancellation Policy</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Free cancellation up to 7 days before check-in</li>
                    <li>50% refund for cancellations 3-7 days before check-in</li>
                    <li>No refund for cancellations within 3 days of check-in</li>
                    <li>Cancellation fees may apply for certain services</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Payment Terms</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Once your booking is confirmed by vendors, you will receive a payment link via email. 
                    Full payment is required within 48 hours of confirmation to secure your booking. 
                    We accept credit cards, debit cards, and bank transfers.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Vendor Policies</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Each service provider (hotels, transport, activities) has their own terms and conditions. 
                    You will receive detailed vendor policies upon confirmation. By proceeding, you agree to 
                    comply with all vendor-specific requirements and policies.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Liability & Insurance</h4>
                  <p className="text-slate-400 leading-relaxed">
                    SmartTRIP acts as a booking intermediary. We recommend purchasing travel insurance. 
                    We are not liable for any changes, delays, or cancellations made by service providers.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Changes & Modifications</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Modifications to confirmed bookings may incur additional charges and are subject to 
                    availability. Contact our support team for assistance with changes.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-lime-50 border border-purple-200 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 text-lime-400 rounded mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-slate-300">
                    I have read and agree to the terms and conditions, cancellation policy, and understand 
                    that this is a soft booking request pending vendor confirmation.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Cost Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Cost Breakdown */}
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-slate-200 mb-6">Cost Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Accommodation</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.accommodation.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Transportation</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.transport.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Activities</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.activities.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Meals</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.meals.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Add-ons</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.addOns.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Taxes (12%)</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.taxes.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Service Fee (5%)</span>
                    <span className="font-semibold text-slate-200">
                      LKR {bookingDetails.costs.serviceFee.toLocaleString()}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600">Discount ({appliedPromo.code})</span>
                      <span className="font-semibold text-green-600">
                        - LKR {discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-white/20 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-slate-200">Grand Total</span>
                    <span className="text-2xl font-bold text-lime-400">
                      LKR {finalTotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 text-right">
                    Payment due after confirmation
                  </p>
                </div>

                {/* Promo Code Section */}
                <div className="mt-6">
                  {!showPromoCode ? (
                    <button
                      onClick={() => setShowPromoCode(true)}
                      className="w-full py-2 text-sm text-lime-400 hover:bg-lime-50 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                      Apply Discount Code
                    </button>
                  ) : (
                    <div className="space-y-2 slide-in">
                      {appliedPromo ? (
                        <div className="p-3 bg-green-500/10 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                              <div>
                                <p className="text-sm font-semibold text-green-400">{appliedPromo.code}</p>
                                <p className="text-xs text-green-600">{appliedPromo.description}</p>
                              </div>
                            </div>
                            <button
                              onClick={handleRemovePromo}
                              className="text-red-400 hover:text-red-300"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                              placeholder="Enter promo code"
                              className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-sm focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            />
                            <button
                              onClick={handleApplyPromo}
                              className="px-4 py-2 bg-lime-500 text-slate-950 rounded-lg text-sm font-medium hover:bg-lime-400"
                            >
                              Apply
                            </button>
                          </div>
                          <button
                            onClick={() => setShowPromoCode(false)}
                            className="w-full text-xs text-slate-400 hover:text-slate-200"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 space-y-3">
                <button
                  onClick={handleConfirmBooking}
                  disabled={!agreedToTerms}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                    agreedToTerms
                      ? 'bg-lime-500 text-slate-950 hover:bg-lime-400'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Booking Request
                </button>

                <button className="w-full py-3 border-2 border-purple-200 text-lime-400 rounded-lg font-semibold hover:bg-lime-50 transition-all">
                  Edit Itinerary
                </button>

                <button className="w-full py-2 text-sm text-slate-400 hover:text-slate-200 font-medium">
                  Cancel Booking
                </button>
              </div>

              {/* Help Info */}
              <div className="bg-lime-500/10 border border-lime-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-lime-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lime-300 text-sm mb-1">Need Help?</h4>
                    <p className="text-xs text-blue-300 leading-relaxed">
                      Our support team is available 24/7 to assist you with your booking. 
                      Contact us at support@smarttrip.lk or call +94 11 234 5678
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-8 fade-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-slate-200 mb-2">Booking Request Submitted!</h2>
              <p className="text-slate-400 mb-6">
                Your booking request has been successfully submitted to our partner vendors.
              </p>

              {/* Booking Reference */}
              <div className="bg-lime-50 border border-purple-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-400 mb-1">Your Booking Reference</p>
                <p className="text-2xl font-bold text-lime-400">{bookingDetails.bookingRef}</p>
              </div>

              {/* What Happens Next */}
              <div className="text-left bg-slate-950 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-slate-200 mb-3">What Happens Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Vendor Confirmation</p>
                      <p className="text-xs text-slate-400">We'll send your request to our partner vendors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Confirmation Email</p>
                      <p className="text-xs text-slate-400">You'll receive confirmation within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Payment Link</p>
                      <p className="text-xs text-slate-400">Complete payment to secure your booking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Final Details</p>
                      <p className="text-xs text-slate-400">Receive vouchers and trip details via email</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/my-trips')}
                  className="w-full py-3 bg-lime-500 text-slate-950 rounded-lg font-semibold hover:bg-lime-400"
                >
                  View My Trips
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-3 border-2 border-purple-200 text-lime-400 rounded-lg font-semibold hover:bg-lime-50"
                >
                  Download Receipt
                </button>
                <button
                  onClick={() => navigate('/my-trips')}
                  className="w-full py-2 text-sm text-slate-400 hover:text-slate-200 font-medium"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}