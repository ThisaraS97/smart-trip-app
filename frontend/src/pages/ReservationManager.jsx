import React, { useState } from 'react';

export default function ReservationManager() {
  const [activeTab, setActiveTab] = useState('pending');
  const [viewMode, setViewMode] = useState('card'); // card, list, calendar
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showAcceptModal, setShowAcceptModal] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    serviceType: 'all',
    dateFrom: '',
    dateTo: '',
    priceMin: '',
    priceMax: '',
    sortBy: 'newest'
  });

  const bookings = {
    pending: [
      {
        id: 'BK-2025-0847',
        customerName: 'John Smith',
        requestDate: '2025-02-11 09:30',
        serviceType: 'Hotel',
        serviceName: 'Deluxe Room with Garden View',
        checkIn: '2025-03-15',
        checkOut: '2025-03-18',
        guests: 2,
        nights: 3,
        mealPlan: 'Breakfast Included',
        specialRequests: 'Late check-in around 10 PM. Anniversary celebration.',
        pricePerNight: 15000,
        totalAmount: 45000,
        commission: 4500,
        vendorPayout: 40500,
        customerPhone: '+94 77 123 4567',
        customerEmail: 'john.smith@email.com',
        timeRemaining: '18h 45m',
        urgent: false
      },
      {
        id: 'BK-2025-0848',
        customerName: 'Sarah Williams',
        requestDate: '2025-02-11 14:20',
        serviceType: 'Activity',
        serviceName: 'Cultural Dance Show Experience',
        bookingDate: '2025-03-16',
        guests: 4,
        specialRequests: 'Need vegetarian meal options',
        pricePerPerson: 2500,
        totalAmount: 10000,
        commission: 1000,
        vendorPayout: 9000,
        customerPhone: '+94 71 234 5678',
        customerEmail: 'sarah.w@email.com',
        timeRemaining: '4h 20m',
        urgent: true
      },
      {
        id: 'BK-2025-0849',
        customerName: 'Mike Chen',
        requestDate: '2025-02-10 16:45',
        serviceType: 'Transport',
        serviceName: 'Private Car with Driver - Full Day',
        bookingDate: '2025-03-17',
        guests: 3,
        specialRequests: 'Airport pickup required at 8 AM',
        pricePerDay: 8000,
        totalAmount: 8000,
        commission: 800,
        vendorPayout: 7200,
        customerPhone: '+94 76 345 6789',
        customerEmail: 'mike.chen@email.com',
        timeRemaining: '22h 15m',
        urgent: false
      }
    ],
    confirmed: [
      {
        id: 'BK-2025-0820',
        customerName: 'Emma Davis',
        confirmDate: '2025-02-09',
        serviceType: 'Hotel',
        serviceName: 'Suite with Ocean View',
        checkIn: '2025-03-20',
        checkOut: '2025-03-23',
        guests: 2,
        nights: 3,
        totalAmount: 75000,
        daysUntil: 37,
        paymentStatus: 'Paid'
      }
    ],
    rejected: [
      {
        id: 'BK-2025-0801',
        customerName: 'Alex Johnson',
        rejectDate: '2025-02-08',
        serviceType: 'Hotel',
        serviceName: 'Standard Room',
        reason: 'No Availability',
        totalAmount: 30000
      }
    ],
    completed: [
      {
        id: 'BK-2025-0750',
        customerName: 'David Kumar',
        completionDate: '2025-02-05',
        serviceType: 'Activity',
        serviceName: 'Temple Tour Package',
        totalAmount: 15000,
        hasReview: true,
        rating: 5
      }
    ],
    cancelled: [
      {
        id: 'BK-2025-0785',
        customerName: 'Lisa Anderson',
        cancelDate: '2025-02-07',
        cancelReason: 'Customer Request',
        serviceType: 'Hotel',
        totalAmount: 45000,
        refundStatus: 'Refunded'
      }
    ]
  };

  const [acceptForm, setAcceptForm] = useState({
    notes: '',
    checkInTime: '',
    sendEmail: true
  });

  const [rejectForm, setRejectForm] = useState({
    reason: '',
    notes: '',
    alternativeDates: false,
    dateFrom: '',
    dateTo: '',
    alternativeService: '',
    sendEmail: true
  });

  const handleSelectBooking = (id) => {
    setSelectedBookings(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleAcceptBooking = (booking) => {
    // TODO: hook up to actual API
    alert(`Booking ${booking.id} accepted!`);
    setShowAcceptModal(null);
    setAcceptForm({ notes: '', checkInTime: '', sendEmail: true });
  };

  const handleRejectBooking = (booking) => {
    if (!rejectForm.reason) {
      alert('Please select a rejection reason');
      return;
    }
    alert(`Booking ${booking.id} rejected`);
    setShowRejectModal(null);
    setRejectForm({
      reason: '',
      notes: '',
      alternativeDates: false,
      dateFrom: '',
      dateTo: '',
      alternativeService: '',
      sendEmail: true
    });
  };

  const getServiceIcon = (type) => {
    const icons = {
      Hotel: '🏨',
      Transport: '🚗',
      Activity: '🎭'
    };
    return icons[type] || '📋';
  };

  const getTabCount = (tab) => {
    return bookings[tab]?.length || 0;
  };

  const tabs = [
    { id: 'pending', label: 'Pending Requests', color: 'yellow' },
    { id: 'confirmed', label: 'Confirmed', color: 'green' },
    { id: 'rejected', label: 'Rejected', color: 'red' },
    { id: 'completed', label: 'Completed', color: 'blue' },
    { id: 'cancelled', label: 'Cancelled', color: 'gray' }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      `}</style>

      {/* Header */}
      <div className="bg-slate-900 border border-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Reservation Manager</h1>
              <p className="text-slate-400 mt-1">Manage all your booking requests and reservations</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Export CSV
              </button>
              <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                </svg>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 border border-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#BFBD31] text-[#BFBD31]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
                {getTabCount(tab.id) > 0 && (
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-${tab.color}-100 text-${tab.color}-700 font-bold`}>
                    {getTabCount(tab.id)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode & Filters */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('card')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  viewMode === 'card' ? 'bg-[#BFBD31] text-slate-950' : 'bg-slate-800/50 text-slate-300'
                }`}
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  viewMode === 'list' ? 'bg-[#BFBD31] text-slate-950' : 'bg-slate-800/50 text-slate-300'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  viewMode === 'calendar' ? 'bg-[#BFBD31] text-slate-950' : 'bg-slate-800/50 text-slate-300'
                }`}
              >
                Calendar View
              </button>
            </div>

            {selectedBookings.length > 0 && activeTab === 'pending' && (
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Bulk Accept ({selectedBookings.length})
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Bulk Reject ({selectedBookings.length})
                </button>
                <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                  Export Selected CSV
                </button>
                <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                  Print Selected
                </button>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by ID or name..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-2 border border-white/20 rounded-lg"
            />
            <select
              value={filters.serviceType}
              onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
              className="px-4 py-2 border border-white/20 rounded-lg"
            >
              <option value="all">All Services</option>
              <option value="Hotel">Hotel</option>
              <option value="Transport">Transport</option>
              <option value="Activity">Activity</option>
            </select>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="px-4 py-2 border border-white/20 rounded-lg"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="px-4 py-2 border border-white/20 rounded-lg"
            />
          </div>
        </div>

        {/* Pending Requests - Card View */}
        {activeTab === 'pending' && viewMode === 'card' && (
          <div>
            {bookings.pending.length > 0 && (
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === bookings.pending.length}
                    onChange={() => {
                      if (selectedBookings.length === bookings.pending.length) {
                        setSelectedBookings([]);
                      } else {
                        setSelectedBookings(bookings.pending.map(b => b.id));
                      }
                    }}
                    className="w-5 h-5 text-[#BFBD31] rounded"
                  />
                  <span className="text-sm font-medium text-slate-300">
                    Select All ({bookings.pending.length})
                  </span>
                </label>
              </div>
            )}
            
            <div className="space-y-4">{bookings.pending.map(booking => (
              <div key={booking.id} className={`bg-slate-900 border border-white/10 rounded-xl shadow-md overflow-hidden ${booking.urgent ? 'ring-2 ring-red-500' : ''}`}>
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(booking.id)}
                        onChange={() => handleSelectBooking(booking.id)}
                        className="w-5 h-5 text-[#BFBD31] rounded mt-1"
                      />
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{booking.id}</h3>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                            PENDING APPROVAL
                          </span>
                          {booking.urgent && (
                            <span className="px-3 py-1 bg-red-100 text-red-300 text-sm font-semibold rounded-full animate-pulse">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400">Requested: {booking.requestDate}</p>
                        <p className="text-sm text-red-400 font-medium mt-1">
                          ⏰ Respond within: {booking.timeRemaining}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Customer Details</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-slate-300"><span className="font-medium">Name:</span> {booking.customerName}</p>
                        <p className="text-slate-300"><span className="font-medium">Phone:</span> {booking.customerPhone}</p>
                        <p className="text-slate-300"><span className="font-medium">Email:</span> {booking.customerEmail}</p>
                        <button className="mt-2 text-[#BFBD31] hover:text-purple-700 font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                          Contact Customer
                        </button>
                      </div>
                    </div>

                    {/* Service Info */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Service Details</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <span className="text-2xl">{getServiceIcon(booking.serviceType)}</span>
                          <span className="font-medium">{booking.serviceType}</span>
                        </p>
                        <p className="text-slate-300 font-medium">{booking.serviceName}</p>
                        {booking.checkIn && (
                          <>
                            <p className="text-slate-300">Check-in: {booking.checkIn}</p>
                            <p className="text-slate-300">Check-out: {booking.checkOut}</p>
                            <p className="text-slate-300">Nights: {booking.nights}</p>
                          </>
                        )}
                        {booking.bookingDate && (
                          <p className="text-slate-300">Date: {booking.bookingDate}</p>
                        )}
                        <p className="text-slate-300">Guests: {booking.guests}</p>
                        {booking.mealPlan && (
                          <p className="text-slate-300">Meal: {booking.mealPlan}</p>
                        )}
                        {booking.specialRequests && (
                          <div className="mt-2 p-2 bg-[#BFBD31]/10 rounded">
                            <p className="text-xs text-blue-900 font-medium">Special Requests:</p>
                            <p className="text-xs text-[#BFBD31]">{booking.specialRequests}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Pricing</h4>
                      <div className="space-y-2 text-sm">
                        {booking.pricePerNight && (
                          <p className="text-slate-300">Per Night: LKR {booking.pricePerNight.toLocaleString()}</p>
                        )}
                        {booking.pricePerPerson && (
                          <p className="text-slate-300">Per Person: LKR {booking.pricePerPerson.toLocaleString()}</p>
                        )}
                        {booking.pricePerDay && (
                          <p className="text-slate-300">Per Day: LKR {booking.pricePerDay.toLocaleString()}</p>
                        )}
                        <div className="border-t border-white/10 pt-2 mt-2">
                          <p className="text-white font-semibold">Total: LKR {booking.totalAmount.toLocaleString()}</p>
                          <p className="text-slate-400 text-xs">Commission: LKR {booking.commission.toLocaleString()}</p>
                          <p className="text-green-600 font-bold text-lg mt-1">
                            Your Payout: LKR {booking.vendorPayout.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                    <button
                      onClick={() => setShowAcceptModal(booking)}
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Accept Booking
                    </button>
                    <button
                      onClick={() => setShowRejectModal(booking)}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Reject
                    </button>
                    <button
                      onClick={() => setShowDetailsModal(booking)}
                      className="px-4 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
                    >
                      View Full Details
                    </button>
                    <button className="px-4 py-3 border border-[#BFBD31]/40 text-[#BFBD31] rounded-lg font-semibold hover:bg-[#BFBD31]/10">
                      Check Availability
                    </button>
                    <button className="px-4 py-3 border border-[#BFBD31]/40 text-[#BFBD31] rounded-lg font-semibold hover:bg-[#d4d235]/10">
                      Request More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}

        {/* Confirmed Bookings */}
        {activeTab === 'confirmed' && (
          <div className="space-y-4">
            {bookings.confirmed.map(booking => (
              <div key={booking.id} className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{booking.id}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-300 text-sm font-semibold rounded-full">
                        CONFIRMED
                      </span>
                    </div>
                    <p className="text-slate-400">Confirmed: {booking.confirmDate}</p>
                    <p className="text-[#BFBD31] font-medium mt-1">
                      Service in {booking.daysUntil} days ({booking.checkIn})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">LKR {booking.totalAmount.toLocaleString()}</p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-300 text-xs font-semibold rounded-full">
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                    Download Voucher
                  </button>
                  <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                    Send Reminder
                  </button>
                  <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                    Contact Customer
                  </button>
                  <button
                    onClick={() => setShowModifyModal(booking)}
                    className="px-4 py-2 border border-[#BFBD31]/40 text-[#BFBD31] rounded-lg hover:bg-[#BFBD31]/10"
                  >
                    Modify Booking
                  </button>
                  <button className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-500/10">
                    Mark as Completed
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-400 rounded-lg hover:bg-red-500/10">
                    Cancel Booking
                  </button>
                  <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                    Report Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rejected Requests */}
        {activeTab === 'rejected' && (
          <div className="space-y-4">
            {bookings.rejected.map(booking => (
              <div key={booking.id} className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{booking.id}</h3>
                      <span className="px-3 py-1 bg-red-100 text-red-300 text-sm font-semibold rounded-full">
                        REJECTED
                      </span>
                    </div>
                    <p className="text-slate-400">Customer: {booking.customerName}</p>
                    <p className="text-slate-400">Rejected: {booking.rejectDate}</p>
                    <div className="mt-2 p-3 bg-red-500/10 rounded-lg">
                      <p className="text-sm font-semibold text-red-900">Rejection Reason:</p>
                      <p className="text-sm text-red-400">{booking.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">LKR {booking.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-500/10">
                    Re-open Request
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-400 rounded-lg hover:bg-red-500/10">
                    Delete from List
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Bookings */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {bookings.completed.map(booking => (
              <div key={booking.id} className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{booking.id}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-300 text-sm font-semibold rounded-full">
                        COMPLETED
                      </span>
                      {booking.hasReview && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: booking.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-slate-400">Customer: {booking.customerName}</p>
                    <p className="text-slate-400">Completed: {booking.completionDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">LKR {booking.totalAmount.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">Revenue Earned</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                    Download Invoice
                  </button>
                  {!booking.hasReview && (
                    <button className="px-4 py-2 border border-[#BFBD31]/40 text-[#BFBD31] rounded-lg hover:bg-[#BFBD31]/10">
                      Request Review
                    </button>
                  )}
                  {booking.hasReview && (
                    <button className="px-4 py-2 border border-[#BFBD31]/40 text-[#BFBD31] rounded-lg hover:bg-[#d4d235]/10">
                      View Customer Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancelled Bookings */}
        {activeTab === 'cancelled' && (
          <div className="space-y-4">
            {bookings.cancelled.map(booking => (
              <div key={booking.id} className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{booking.id}</h3>
                      <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm font-semibold rounded-full">
                        CANCELLED
                      </span>
                      {booking.refundStatus && (
                        <span className="px-3 py-1 bg-green-100 text-green-300 text-sm font-semibold rounded-full">
                          {booking.refundStatus}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400">Customer: {booking.customerName}</p>
                    <p className="text-slate-400">Cancelled: {booking.cancelDate}</p>
                    <div className="mt-2 p-3 bg-slate-950 rounded-lg">
                      <p className="text-sm font-semibold text-white">Cancellation Reason:</p>
                      <p className="text-sm text-slate-300">{booking.cancelReason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">LKR {booking.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {viewMode !== 'calendar' && (
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-300">Items per page:</span>
                <select className="px-3 py-2 border border-white/20 rounded-lg text-sm">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-white/20 rounded-lg hover:bg-slate-950 disabled:opacity-50" disabled>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <span className="px-4 py-2 text-sm text-slate-300">Page 1 of 1</span>
                <button className="p-2 border border-white/20 rounded-lg hover:bg-slate-950 disabled:opacity-50" disabled>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mt-6">
          <h3 className="text-lg font-bold text-white mb-4">Notification Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-300">Email me for new booking requests</span>
              <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-[#BFBD31] text-slate-950 relative cursor-pointer transition-colors" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-300">SMS me for new booking requests</span>
              <input type="checkbox" className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-[#BFBD31] text-slate-950 relative cursor-pointer transition-colors" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-300">Sound notification for new requests (in-app)</span>
              <input type="checkbox" defaultChecked className="w-12 h-6 rounded-full appearance-none bg-gray-300 checked:bg-[#BFBD31] text-slate-950 relative cursor-pointer transition-colors" />
            </label>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">February 2025</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-white/20 rounded-lg hover:bg-slate-950">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-slate-950">
                  Today
                </button>
                <button className="p-2 border border-white/20 rounded-lg hover:bg-slate-950">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-slate-300 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 28 }, (_, i) => (
                <div key={i} className="aspect-square border border-white/10 rounded-lg p-2 hover:bg-slate-950 cursor-pointer">
                  <p className="text-sm font-medium text-slate-300">{i + 1}</p>
                  {i === 14 && (
                    <div className="mt-1 space-y-1">
                      <div className="w-full h-2 bg-yellow-400 rounded"></div>
                      <div className="w-full h-2 bg-green-500 rounded"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Rejected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span>Cancelled</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accept Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Accept Booking</h2>
            <p className="text-slate-400 mb-6">Confirm acceptance of booking {showAcceptModal.id}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Expected Check-in Time
                </label>
                <input
                  type="time"
                  value={acceptForm.checkInTime}
                  onChange={(e) => setAcceptForm({ ...acceptForm, checkInTime: e.target.value })}
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Confirmation Notes (Optional)
                </label>
                <textarea
                  value={acceptForm.notes}
                  onChange={(e) => setAcceptForm({ ...acceptForm, notes: e.target.value })}
                  rows={3}
                  placeholder="Add any special instructions or notes..."
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptForm.sendEmail}
                  onChange={(e) => setAcceptForm({ ...acceptForm, sendEmail: e.target.checked })}
                  className="w-5 h-5 text-[#BFBD31] rounded"
                />
                <span className="text-sm text-slate-300">Send confirmation email to customer</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAcceptModal(null)}
                className="flex-1 px-4 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAcceptBooking(showAcceptModal)}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Confirm Acceptance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-8 my-8">
            <h2 className="text-2xl font-bold text-white mb-4">Reject Booking</h2>
            <p className="text-slate-400 mb-6">Provide reason for rejecting {showRejectModal.id}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Reason for Rejection <span className="text-red-500">*</span>
                </label>
                <select
                  value={rejectForm.reason}
                  onChange={(e) => setRejectForm({ ...rejectForm, reason: e.target.value })}
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                >
                  <option value="">Select reason</option>
                  <option value="No Availability">No Availability</option>
                  <option value="Maintenance">Maintenance Issues</option>
                  <option value="Price">Price Discrepancy</option>
                  <option value="Customer">Customer Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={rejectForm.notes}
                  onChange={(e) => setRejectForm({ ...rejectForm, notes: e.target.value })}
                  rows={3}
                  placeholder="Provide more details..."
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rejectForm.alternativeDates}
                  onChange={(e) => setRejectForm({ ...rejectForm, alternativeDates: e.target.checked })}
                  className="w-5 h-5 text-[#BFBD31] rounded"
                />
                <span className="text-sm text-slate-300">Suggest alternative dates</span>
              </label>

              {rejectForm.alternativeDates && (
                <div className="grid grid-cols-2 gap-3 pl-7">
                  <input
                    type="date"
                    value={rejectForm.dateFrom}
                    onChange={(e) => setRejectForm({ ...rejectForm, dateFrom: e.target.value })}
                    className="px-4 py-2 border border-white/20 rounded-lg"
                  />
                  <input
                    type="date"
                    value={rejectForm.dateTo}
                    onChange={(e) => setRejectForm({ ...rejectForm, dateTo: e.target.value })}
                    className="px-4 py-2 border border-white/20 rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Suggest Alternative Service
                </label>
                <select
                  value={rejectForm.alternativeService}
                  onChange={(e) => setRejectForm({ ...rejectForm, alternativeService: e.target.value })}
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                >
                  <option value="">None</option>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rejectForm.sendEmail}
                  onChange={(e) => setRejectForm({ ...rejectForm, sendEmail: e.target.checked })}
                  className="w-5 h-5 text-[#BFBD31] rounded"
                />
                <span className="text-sm text-slate-300">Send rejection email to customer</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(null)}
                className="flex-1 px-4 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectBooking(showRejectModal)}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Booking Modal */}
      {showModifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Modify Booking</h2>
            <p className="text-slate-400 mb-6">Update booking details for {showModifyModal.id}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  New Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  New Service/Room
                </label>
                <select className="w-full px-4 py-2 border border-white/20 rounded-lg">
                  <option>Keep Current Service</option>
                  <option>Deluxe Room</option>
                  <option>Suite</option>
                  <option>Standard Room</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Price Adjustment (LKR)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Reason for Modification
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain why you're modifying this booking..."
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-[#BFBD31] rounded"
                />
                <span className="text-sm text-slate-300">Send notification to customer</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModifyModal(null)}
                className="flex-1 px-4 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Booking modified successfully!');
                  setShowModifyModal(null);
                }}
                className="flex-1 px-4 py-3 bg-[#BFBD31] text-slate-950 rounded-lg font-semibold hover:bg-[#BFBD31]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}