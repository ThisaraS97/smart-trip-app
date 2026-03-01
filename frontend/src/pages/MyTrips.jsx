import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MyTrips() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
      if (!userInfo?.token) {
        navigate('/login');
        return;
      }
      try {
        setLoading(true);
        const { data } = await axios.get('/api/trips', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        // Normalize tripId -> id so all existing template references continue to work
        setTrips(data.map(t => ({ ...t, id: t.tripId || t._id })));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load trips');
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [navigate]);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Trips', count: trips.filter(t => t.status === 'confirmed').length },
    { id: 'pending', label: 'Pending Approval', count: trips.filter(t => t.status === 'pending').length },
    { id: 'confirmed', label: 'Confirmed', count: trips.filter(t => t.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: trips.filter(t => t.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: trips.filter(t => t.status === 'cancelled').length }
  ];

  const statusConfig = {
    pending: { color: 'yellow', label: 'Pending Approval', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    confirmed: { color: 'green', label: 'Confirmed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    completed: { color: 'blue', label: 'Completed', icon: 'M5 13l4 4L19 7' },
    cancelled: { color: 'red', label: 'Cancelled', icon: 'M6 18L18 6M6 6l12 12' }
  };

  const filterTrips = () => {
    let filtered = trips;

    // Filter by active tab
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(t => t.status === 'confirmed' || t.status === 'pending');
    } else if (activeTab !== 'all') {
      filtered = filtered.filter(t => t.status === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(t => t.status === selectedStatus);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.bookingDate) - new Date(a.bookingDate);
        case 'oldest':
          return new Date(a.bookingDate) - new Date(b.bookingDate);
        case 'price-high':
          return b.totalCost - a.totalCost;
        case 'price-low':
          return a.totalCost - b.totalCost;
        case 'date':
          return new Date(a.dates.from) - new Date(b.dates.from);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredTrips = filterTrips();

  const toggleTripSelection = (tripId) => {
    if (selectedTrips.includes(tripId)) {
      setSelectedTrips(selectedTrips.filter(id => id !== tripId));
    } else {
      setSelectedTrips([...selectedTrips, tripId]);
    }
  };

  const selectAllTrips = () => {
    if (selectedTrips.length === filteredTrips.length) {
      setSelectedTrips([]);
    } else {
      setSelectedTrips(filteredTrips.map(t => t.id));
    }
  };

  const handleBulkExport = () => {
    alert(`Exporting ${selectedTrips.length} trips...`);
  };

  const handleBulkPrint = () => {
    alert(`Printing ${selectedTrips.length} trips...`);
  };

  const handleCancelTrip = async (tripId) => {
    if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
      await axios.patch(`/api/trips/${tripId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: 'cancelled' } : t));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel trip');
    }
  };

  const getTripActions = (trip) => {
    const actions = [
      { id: 'details', label: 'View Full Details', icon: 'eye', color: 'purple' },
      { id: 'pdf', label: 'Download PDF', icon: 'download', color: 'gray' },
      { id: 'share', label: 'Share Trip', icon: 'share', color: 'gray' }
    ];

    if (trip.status === 'pending') {
      actions.push(
        { id: 'track', label: 'Track Status', icon: 'clock', color: 'blue' },
        { id: 'modify', label: 'Modify Trip', icon: 'edit', color: 'orange' }
      );
    }

    if (trip.status === 'confirmed') {
      actions.push(
        { id: 'contact', label: 'Contact Vendor', icon: 'message', color: 'green' }
      );
    }

    if (trip.status === 'completed' && trip.reviewStatus === 'pending') {
      actions.push(
        { id: 'review', label: 'Leave Review', icon: 'star', color: 'yellow' }
      );
    }

    if (trip.status === 'completed') {
      actions.push(
        { id: 'book-again', label: 'Book Again', icon: 'refresh', color: 'purple' }
      );
    }

    if (trip.status === 'pending' || trip.status === 'confirmed') {
      actions.push(
        { id: 'cancel', label: 'Cancel Booking', icon: 'x', color: 'red' }
      );
    }

    return actions;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .trip-card { transition: transform 0.2s, box-shadow 0.2s; }
        .trip-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
      `}</style>

      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium">Loading your trips...</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-lime-500 text-slate-950 rounded-lg">Retry</button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>

      {/* Top Navigation */}
      <nav className="bg-slate-900 border border-white/10 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-200">My Trips</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/itinerary')}
                className="px-4 py-2 bg-lime-500 text-slate-950 rounded-lg font-medium hover:bg-lime-400 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Plan New Trip
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="p-2 text-slate-400 hover:bg-slate-800/50 rounded-lg"
                title="Profile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-sm p-2 mb-6 flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-lime-500 text-slate-950'
                  : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-slate-900 border border-white/10/20 text-white'
                  : 'bg-gray-200 text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by destination, location, or booking ID..."
                  className="w-full pl-10 pr-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="date">Travel Date</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTrips.length === filteredTrips.length && filteredTrips.length > 0}
                  onChange={selectAllTrips}
                  className="w-5 h-5 text-lime-400 rounded"
                />
                <span className="text-sm font-medium text-slate-300">
                  Select All ({filteredTrips.length})
                </span>
              </label>
              {selectedTrips.length > 0 && (
                <span className="text-sm text-lime-400 font-medium">
                  {selectedTrips.length} selected
                </span>
              )}
            </div>
            {selectedTrips.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkExport}
                  className="px-4 py-2 text-sm font-medium text-slate-300 border border-white/20 rounded-lg hover:bg-slate-950 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Export Selected
                </button>
                <button
                  onClick={handleBulkPrint}
                  className="px-4 py-2 text-sm font-medium text-slate-300 border border-white/20 rounded-lg hover:bg-slate-950 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  Print Selected
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trip Cards Grid */}
        {filteredTrips.length === 0 ? (
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <h3 className="text-xl font-bold text-slate-200 mb-2">No trips found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your filters or start planning a new adventure!</p>
            <button className="px-6 py-3 bg-lime-500 text-slate-950 rounded-lg font-semibold hover:bg-lime-400">
              Plan New Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTrips.map(trip => {
              const status = statusConfig[trip.status];
              const actions = getTripActions(trip);
              const isSelected = selectedTrips.includes(trip.id);

              return (
                <div
                  key={trip.id}
                  className={`trip-card bg-slate-900 border border-white/10 rounded-xl shadow-md overflow-hidden ${
                    isSelected ? 'ring-2 ring-lime-500' : ''
                  }`}
                >
                  {/* Trip Header */}
                  <div className="relative h-40" style={{ background: trip.image }}>
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-white/10/90 text-${status.color}-700`}>
                        {status.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTripSelection(trip.id)}
                        className="w-5 h-5 text-lime-400 rounded bg-slate-900 border border-white/10"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {trip.destination}
                      </h3>
                      <p className="text-white/90 text-sm drop-shadow-lg">{trip.location}</p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Travel Dates</p>
                        <p className="text-sm font-semibold text-slate-200">
                          {trip.dates.from} - {trip.dates.to}
                        </p>
                        <p className="text-xs text-slate-400">{trip.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Travelers</p>
                        <p className="text-sm font-semibold text-slate-200">
                          {trip.travelers.adults} Adult{trip.travelers.adults > 1 ? 's' : ''}
                          {trip.travelers.children > 0 && `, ${trip.travelers.children} Child${trip.travelers.children > 1 ? 'ren' : ''}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Booking ID</p>
                        <p className="text-sm font-semibold text-slate-200">{trip.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Total Cost</p>
                        <p className="text-sm font-semibold text-lime-400">
                          LKR {trip.totalCost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-slate-950 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span>Primary Vendor: <span className="font-medium text-slate-200">{trip.vendor}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Booked on: {trip.bookingDate}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {actions.slice(0, 3).map(action => (
                        <button
                          key={action.id}
                          onClick={() => {
                            if (action.id === 'cancel') {
                              handleCancelTrip(trip.id);
                            } else if (action.id === 'details') {
                              navigate(`/trip/${trip.id}`);
                            } else if (action.id === 'modify' || action.id === 'book-again') {
                              navigate('/itinerary');
                            } else {
                              alert(`${action.label} for ${trip.id}`);
                            }
                          }}
                          className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                            action.color === 'purple'
                              ? 'bg-lime-500 text-slate-950 hover:bg-lime-400'
                              : action.color === 'red'
                              ? 'border border-red-300 text-red-400 hover:bg-red-500/10'
                              : 'border border-white/20 text-slate-300 hover:bg-slate-950'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>

                    {actions.length > 3 && (
                      <details className="mt-3">
                        <summary className="text-sm text-lime-400 hover:text-purple-700 cursor-pointer font-medium">
                          More Actions ({actions.length - 3})
                        </summary>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {actions.slice(3).map(action => (
                            <button
                              key={action.id}
                              onClick={() => {
                                if (action.id === 'cancel') {
                                  handleCancelTrip(trip.id);
                                } else if (action.id === 'details') {
                                  navigate(`/trip/${trip.id}`);
                                } else if (action.id === 'modify' || action.id === 'book-again') {
                                  navigate('/itinerary');
                                } else {
                                  alert(`${action.label} for ${trip.id}`);
                                }
                              }}
                              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                                action.color === 'red'
                                  ? 'border border-red-300 text-red-400 hover:bg-red-500/10'
                                  : action.color === 'yellow'
                                  ? 'border border-yellow-300 text-yellow-700 hover:bg-yellow-500/10'
                                  : action.color === 'blue'
                                  ? 'border border-blue-300 text-lime-300 hover:bg-lime-500/10'
                                  : action.color === 'green'
                                  ? 'border border-green-300 text-green-600 hover:bg-green-500/10'
                                  : action.color === 'orange'
                                  ? 'border border-orange-300 text-orange-600 hover:bg-orange-50'
                                  : action.color === 'purple'
                                  ? 'bg-lime-500 text-slate-950 hover:bg-lime-400'
                                  : 'border border-white/20 text-slate-300 hover:bg-slate-950'
                              }`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {filteredTrips.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-950">
              Previous
            </button>
            <button className="px-4 py-2 bg-lime-500 text-slate-950 rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-950">
              2
            </button>
            <button className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-950">
              3
            </button>
            <button className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-950">
              Next
            </button>
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}