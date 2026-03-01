import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ItineraryCustomization() {
  const navigate = useNavigate();
  const [budget] = useState(150000); // total trip budget in LKR
  const [currentTotal, setCurrentTotal] = useState(125000);
  const [showBudgetAlert, setShowBudgetAlert] = useState(false);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [undoStack, setUndoStack] = useState([]);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const [itinerary, setItinerary] = useState({
    day1: {
      date: 'Mar 15, 2025',
      hotel: {
        id: 'h1',
        name: 'Earl\'s Regency Hotel',
        location: 'Kandy',
        price: 15000,
        rating: 4.5,
        amenities: ['WiFi', 'Pool', 'Breakfast'],
        image: '#667eea'
      },
      transport: {
        id: 't1',
        type: 'Private Car',
        price: 8000,
        duration: '3.5 hours',
        comfort: 'High'
      },
      activities: [
        { id: 'a1', name: 'Temple of the Tooth Visit', price: 2000, duration: '2 hours', category: 'Cultural' },
        { id: 'a2', name: 'Kandy Lake Walk', price: 0, duration: '1 hour', category: 'Nature' }
      ],
      meals: [
        { id: 'm1', type: 'Lunch', name: 'Traditional Rice & Curry', price: 1500 }
      ]
    },
    day2: {
      date: 'Mar 16, 2025',
      hotel: {
        id: 'h1',
        name: 'Earl\'s Regency Hotel',
        location: 'Kandy',
        price: 15000,
        rating: 4.5,
        amenities: ['WiFi', 'Pool', 'Breakfast'],
        image: '#667eea'
      },
      transport: null,
      activities: [
        { id: 'a3', name: 'Royal Botanical Gardens', price: 1500, duration: '3 hours', category: 'Nature' },
        { id: 'a4', name: 'Cultural Dance Show', price: 3000, duration: '1.5 hours', category: 'Cultural' }
      ],
      meals: [
        { id: 'm2', type: 'Dinner', name: 'Hotel Restaurant', price: 2500 }
      ]
    },
    day3: {
      date: 'Mar 17, 2025',
      hotel: {
        id: 'h2',
        name: 'Thilanka Hotel',
        location: 'Kandy',
        price: 12000,
        rating: 4.2,
        amenities: ['WiFi', 'Restaurant'],
        image: '#764ba2'
      },
      transport: {
        id: 't2',
        type: 'Shared Van',
        price: 5000,
        duration: '4 hours',
        comfort: 'Medium'
      },
      activities: [
        { id: 'a5', name: 'Tea Plantation Tour', price: 4000, duration: '4 hours', category: 'Nature' }
      ],
      meals: []
    }
  });

  const alternativeHotels = [
    {
      id: 'h3',
      name: 'Cinnamon Citadel',
      location: 'Kandy',
      price: 18000,
      rating: 4.7,
      amenities: ['WiFi', 'Pool', 'Spa', 'Breakfast', 'Gym'],
      image: '#34C759',
      priceDiff: 3000
    },
    {
      id: 'h4',
      name: 'OZO Kandy',
      location: 'Kandy',
      price: 13000,
      rating: 4.3,
      amenities: ['WiFi', 'Breakfast', 'Restaurant'],
      image: '#1E90FF',
      priceDiff: -2000
    },
    {
      id: 'h5',
      name: 'Swiss Residence',
      location: 'Kandy',
      price: 10000,
      rating: 4.0,
      amenities: ['WiFi', 'Restaurant'],
      image: '#FF9500',
      priceDiff: -5000
    }
  ];

  const transportOptions = [
    { id: 't1', type: 'Private Car', price: 8000, duration: '3.5 hours', comfort: 'High' },
    { id: 't2', type: 'Shared Van', price: 5000, duration: '4 hours', comfort: 'Medium' },
    { id: 't3', type: 'Public Bus', price: 1500, duration: '5 hours', comfort: 'Basic' },
    { id: 't4', type: 'Train', price: 2000, duration: '4.5 hours', comfort: 'Medium' }
  ];

  const availableActivities = [
    { id: 'a6', name: 'Spice Garden Tour', price: 2500, duration: '2 hours', category: 'Cultural', available: true, image: '#34C759' },
    { id: 'a7', name: 'Gem Museum Visit', price: 1000, duration: '1 hour', category: 'Cultural', available: true, image: '#667eea' },
    { id: 'a8', name: 'Elephant Orphanage', price: 5000, duration: '3 hours', category: 'Nature', available: true, image: '#1E90FF' },
    { id: 'a9', name: 'Cooking Class', price: 4500, duration: '3 hours', category: 'Food', available: true, image: '#FF9500' },
    { id: 'a10', name: 'Batik Workshop', price: 3000, duration: '2 hours', category: 'Cultural', available: false, image: '#764ba2' },
    { id: 'a11', name: 'White Water Rafting', price: 6000, duration: '4 hours', category: 'Adventure', available: true, image: '#FF3B30' }
  ];

  const addOns = {
    meals: [
      { id: 'meal1', name: 'Breakfast Package (per day)', price: 1500, type: 'Breakfast' },
      { id: 'meal2', name: 'Lunch Package (per day)', price: 2000, type: 'Lunch' },
      { id: 'meal3', name: 'Dinner Package (per day)', price: 2500, type: 'Dinner' },
      { id: 'meal4', name: 'Vegetarian Meal Option', price: 500, type: 'Special' }
    ],
    services: [
      { id: 'srv1', name: 'Professional Tour Guide (full day)', price: 5000, icon: 'user' },
      { id: 'srv2', name: 'Photography Package', price: 8000, icon: 'camera' },
      { id: 'srv3', name: 'Airport Pickup', price: 4000, icon: 'plane' },
      { id: 'srv4', name: 'Airport Drop-off', price: 4000, icon: 'plane' },
      { id: 'srv5', name: 'Travel Insurance', price: 3000, icon: 'shield' }
    ],
    roomUpgrades: [
      { id: 'room1', name: 'Deluxe Room Upgrade', price: 3000, icon: 'star' },
      { id: 'room2', name: 'Sea View Room', price: 4000, icon: 'eye' },
      { id: 'room3', name: 'Extra Bed', price: 2000, icon: 'bed' },
      { id: 'room4', name: 'Early Check-in', price: 1500, icon: 'clock' },
      { id: 'room5', name: 'Late Checkout', price: 1500, icon: 'clock' }
    ]
  };

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Cultural', 'Adventure', 'Nature', 'Food', 'Shopping'];

  const budgetPercentage = (currentTotal / budget) * 100;
  const budgetStatus = budgetPercentage < 90 ? 'green' : budgetPercentage <= 100 ? 'yellow' : 'red';

  useEffect(() => {
    calculateTotal();
  }, [itinerary, selectedAddOns]);

  const calculateTotal = () => {
    let total = 0;
    
    Object.values(itinerary).forEach(day => {
      if (day.hotel) total += day.hotel.price;
      if (day.transport) total += day.transport.price;
      if (day.activities) {
        day.activities.forEach(activity => total += activity.price);
      }
      if (day.meals) {
        day.meals.forEach(meal => total += meal.price);
      }
    });

    selectedAddOns.forEach(addon => total += addon.price);

    setCurrentTotal(total);

    if (total > budget) {
      setShowBudgetAlert(true);
    }
  };

  const addActivityToDay = (activity, day) => {
    const previousState = { ...itinerary };
    setUndoStack([...undoStack, previousState]);

    setItinerary({
      ...itinerary,
      [day]: {
        ...itinerary[day],
        activities: [...itinerary[day].activities, activity]
      }
    });
  };

  const removeActivity = (activityId, day) => {
    const previousState = { ...itinerary };
    setUndoStack([...undoStack, previousState]);

    setItinerary({
      ...itinerary,
      [day]: {
        ...itinerary[day],
        activities: itinerary[day].activities.filter(a => a.id !== activityId)
      }
    });
  };

  const changeHotel = (newHotel, day) => {
    const previousState = { ...itinerary };
    setUndoStack([...undoStack, previousState]);

    setItinerary({
      ...itinerary,
      [day]: {
        ...itinerary[day],
        hotel: newHotel
      }
    });
    setShowHotelModal(false);
  };

  const changeTransport = (newTransport, day) => {
    const previousState = { ...itinerary };
    setUndoStack([...undoStack, previousState]);

    setItinerary({
      ...itinerary,
      [day]: {
        ...itinerary[day],
        transport: newTransport
      }
    });
  };

  const addAddon = (addon) => {
    const previousState = [...selectedAddOns];
    setUndoStack([...undoStack, { itinerary, selectedAddOns: previousState }]);
    
    setSelectedAddOns([...selectedAddOns, addon]);
  };

  const removeAddon = (addonId) => {
    const previousState = [...selectedAddOns];
    setUndoStack([...undoStack, { itinerary, selectedAddOns: previousState }]);
    
    setSelectedAddOns(selectedAddOns.filter(a => a.id !== addonId));
  };

  const undoLastChange = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      if (lastState.itinerary) {
        setItinerary(lastState.itinerary);
        setSelectedAddOns(lastState.selectedAddOns);
      } else {
        setItinerary(lastState);
      }
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  const resetItinerary = () => {
    if (confirm('Are you sure you want to reset to the original itinerary? All changes will be lost.')) {
      setUndoStack([]);
      setSelectedAddOns([]);
      // Reset to original state
      window.location.reload();
    }
  };

  const toggleCompare = (hotelId) => {
    if (selectedForCompare.includes(hotelId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== hotelId));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, hotelId]);
    }
  };

  const filteredActivities = activeCategory === 'All' 
    ? availableActivities 
    : availableActivities.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .budget-bar-green { background: linear-gradient(90deg, #34C759 0%, #30D158 100%); }
        .budget-bar-yellow { background: linear-gradient(90deg, #FF9500 0%, #FFCC00 100%); }
        .budget-bar-red { background: linear-gradient(90deg, #FF3B30 0%, #FF6B6B 100%); }
        .pulse-animation { animation: pulse 2s infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .slide-in { animation: slideIn 0.3s ease-out; }
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Top Navigation */}
      <nav className="bg-slate-900 border border-white/10 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/my-trips')} className="p-2 hover:bg-slate-800/50 rounded-lg">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-200">Customize Your Trip</h1>
                <p className="text-sm text-slate-400">Kandy Cultural Tour • 3 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {undoStack.length > 0 && (
                <button 
                  onClick={undoLastChange}
                  className="px-4 py-2 text-sm font-medium text-lime-400 hover:bg-lime-50 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                  Undo
                </button>
              )}
              <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/50 rounded-lg">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar - Itinerary Summary */}
        <div className="w-80 bg-slate-900 border border-white/10 border-r border-white/10 h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
          <div className="p-6">
            <h2 className="text-lg font-bold text-slate-200 mb-4">Trip Summary</h2>
            
            {/* Budget Meter */}
            <div className="mb-6 p-4 bg-slate-950 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Budget Status</span>
                <span className={`text-sm font-bold ${budgetStatus === 'green' ? 'text-green-600' : budgetStatus === 'yellow' ? 'text-yellow-600' : 'text-red-400'}`}>
                  {budgetPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    budgetStatus === 'green' ? 'budget-bar-green' : 
                    budgetStatus === 'yellow' ? 'budget-bar-yellow' : 
                    'budget-bar-red pulse-animation'
                  }`}
                  style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">LKR {currentTotal.toLocaleString()}</span>
                <span className="text-slate-400">/ LKR {budget.toLocaleString()}</span>
              </div>
              {budgetStatus === 'red' && (
                <div className="mt-2 p-2 bg-red-500/10 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-300 font-medium">
                    Over budget by LKR {(currentTotal - budget).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Day-by-Day Timeline */}
            <div className="space-y-4">
              {Object.entries(itinerary).map(([dayKey, dayData], index) => {
                const dayNumber = index + 1;
                let dayTotal = 0;
                if (dayData.hotel) dayTotal += dayData.hotel.price;
                if (dayData.transport) dayTotal += dayData.transport.price;
                if (dayData.activities) dayData.activities.forEach(a => dayTotal += a.price);
                if (dayData.meals) dayData.meals.forEach(m => dayTotal += m.price);

                return (
                  <div 
                    key={dayKey}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDay === dayNumber ? 'border-lime-500 bg-lime-50' : 'border-white/10 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedDay(dayNumber)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-200">Day {dayNumber}</h3>
                        <p className="text-xs text-slate-400">{dayData.date}</p>
                      </div>
                      <span className="text-sm font-bold text-lime-400">
                        LKR {dayTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {dayData.hotel && (
                        <div className="flex items-start gap-2 text-xs">
                          <svg className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                          </svg>
                          <div className="flex-1">
                            <p className="text-slate-300 font-medium">{dayData.hotel.name}</p>
                            <p className="text-slate-500">LKR {dayData.hotel.price.toLocaleString()}</p>
                          </div>
                        </div>
                      )}

                      {dayData.transport && (
                        <div className="flex items-start gap-2 text-xs">
                          <svg className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                          </svg>
                          <div className="flex-1">
                            <p className="text-slate-300 font-medium">{dayData.transport.type}</p>
                            <p className="text-slate-500">LKR {dayData.transport.price.toLocaleString()}</p>
                          </div>
                        </div>
                      )}

                      {dayData.activities && dayData.activities.length > 0 && (
                        <div className="flex items-start gap-2 text-xs">
                          <svg className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                          </svg>
                          <div className="flex-1">
                            <p className="text-slate-300 font-medium">{dayData.activities.length} Activities</p>
                            <p className="text-slate-500">LKR {dayData.activities.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</p>
                          </div>
                        </div>
                      )}

                      {dayData.meals && dayData.meals.length > 0 && (
                        <div className="flex items-start gap-2 text-xs">
                          <svg className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                          <div className="flex-1">
                            <p className="text-slate-300 font-medium">{dayData.meals.length} Meals</p>
                            <p className="text-slate-500">LKR {dayData.meals.reduce((sum, m) => sum + m.price, 0).toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add-ons Section */}
              {selectedAddOns.length > 0 && (
                <div className="border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-200 mb-3">Add-ons</h3>
                  <div className="space-y-2">
                    {selectedAddOns.map(addon => (
                      <div key={addon.id} className="flex items-center justify-between text-xs">
                        <span className="text-slate-300">{addon.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">LKR {addon.price.toLocaleString()}</span>
                          <button 
                            onClick={() => removeAddon(addon.id)}
                            className="text-red-500 hover:text-red-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-slate-200">Total Cost</span>
                <span className="text-2xl font-bold text-lime-400">
                  LKR {currentTotal.toLocaleString()}
                </span>
              </div>
              <button 
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                  currentTotal <= budget 
                    ? 'bg-lime-500 text-slate-950 hover:bg-lime-400' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={currentTotal > budget}
              >
                {currentTotal <= budget ? 'Proceed to Booking' : 'Over Budget - Adjust Items'}
              </button>
            </div>
          </div>
        </div>

        {/* Center Area - Customization Workspace */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="p-6 max-w-5xl">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <button 
                onClick={() => setShowHotelModal(true)}
                className="px-4 py-3 bg-slate-900 border border-white/10 border-2 border-purple-200 rounded-lg hover:border-lime-400 transition-all text-sm font-medium text-slate-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add Hotel
              </button>
              <button 
                onClick={() => setShowActivityModal(true)}
                className="px-4 py-3 bg-slate-900 border border-white/10 border-2 border-purple-200 rounded-lg hover:border-lime-400 transition-all text-sm font-medium text-slate-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add Activity
              </button>
              <button className="px-4 py-3 bg-slate-900 border border-white/10 border-2 border-purple-200 rounded-lg hover:border-lime-400 transition-all text-sm font-medium text-slate-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add Transport
              </button>
              <button className="px-4 py-3 bg-slate-900 border border-white/10 border-2 border-purple-200 rounded-lg hover:border-lime-400 transition-all text-sm font-medium text-slate-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add Meals
              </button>
              <button className="px-4 py-3 bg-slate-900 border border-white/10 border-2 border-purple-200 rounded-lg hover:border-lime-400 transition-all text-sm font-medium text-slate-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add Guide
              </button>
            </div>

            {/* Current Day Selection */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-200">Day {selectedDay}</h2>
                  <p className="text-sm text-slate-400">{itinerary[`day${selectedDay}`]?.date}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                    disabled={selectedDay === 1}
                    className="p-2 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-950 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setSelectedDay(Math.min(3, selectedDay + 1))}
                    disabled={selectedDay === 3}
                    className="p-2 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-950 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Hotel Selection Panel */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-200">Accommodation</h3>
                <button 
                  onClick={() => setShowHotelModal(true)}
                  className="text-sm text-lime-400 hover:text-purple-700 font-medium"
                >
                  Change Hotel
                </button>
              </div>

              {/* Current Hotel */}
              {itinerary[`day${selectedDay}`]?.hotel && (
                <div className="border-2 border-lime-500 rounded-lg p-4 mb-4 bg-lime-50">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-24 h-24 rounded-lg flex-shrink-0"
                      style={{ background: itinerary[`day${selectedDay}`].hotel.image }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-200">{itinerary[`day${selectedDay}`].hotel.name}</h4>
                          <p className="text-sm text-slate-400">{itinerary[`day${selectedDay}`].hotel.location}</p>
                        </div>
                        <span className="px-3 py-1 bg-lime-500 text-slate-950 text-sm font-semibold rounded-full">
                          Current
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span className="text-sm text-slate-300">{itinerary[`day${selectedDay}`].hotel.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex gap-1">
                          {itinerary[`day${selectedDay}`].hotel.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-slate-900 border border-white/10 px-2 py-1 rounded-full text-slate-400">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-lime-400">
                          LKR {itinerary[`day${selectedDay}`].hotel.price.toLocaleString()}
                        </span>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-sm text-lime-400 hover:bg-lime-100 rounded-lg">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative Hotels */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300">Alternative Options</h4>
                {alternativeHotels.slice(0, 3).map(hotel => (
                  <div key={hotel.id} className="border border-white/10 rounded-lg p-4 hover:border-purple-300 transition-all">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-20 h-20 rounded-lg flex-shrink-0"
                        style={{ background: hotel.image }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-200">{hotel.name}</h4>
                            <p className="text-sm text-slate-400">{hotel.location}</p>
                          </div>
                          <input 
                            type="checkbox"
                            checked={selectedForCompare.includes(hotel.id)}
                            onChange={() => toggleCompare(hotel.id)}
                            className="w-5 h-5 text-lime-400 rounded"
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            <span className="text-sm text-slate-300">{hotel.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-200">
                              LKR {hotel.price.toLocaleString()}
                            </span>
                            <span className={`text-sm ${hotel.priceDiff > 0 ? 'text-red-400' : 'text-green-600'}`}>
                              {hotel.priceDiff > 0 ? '+' : ''}{hotel.priceDiff.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm text-lime-400 hover:bg-lime-50 rounded-lg">
                              Details
                            </button>
                            <button 
                              onClick={() => changeHotel(hotel, `day${selectedDay}`)}
                              className="px-4 py-1 text-sm bg-lime-500 text-slate-950 rounded-lg hover:bg-lime-400"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedForCompare.length > 0 && (
                <button className="w-full mt-3 py-2 bg-lime-50 text-lime-400 rounded-lg font-medium hover:bg-lime-100">
                  Compare Selected ({selectedForCompare.length})
                </button>
              )}
            </div>

            {/* Transport Options Panel */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Transportation</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {transportOptions.map(transport => (
                  <div 
                    key={transport.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      itinerary[`day${selectedDay}`]?.transport?.id === transport.id
                        ? 'border-lime-500 bg-lime-50'
                        : 'border-white/10 hover:border-purple-300'
                    }`}
                    onClick={() => changeTransport(transport, `day${selectedDay}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-200">{transport.type}</h4>
                      {itinerary[`day${selectedDay}`]?.transport?.id === transport.id && (
                        <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{transport.duration}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-lime-400">
                        LKR {transport.price.toLocaleString()}
                      </span>
                      <span className="text-xs px-2 py-1 bg-slate-800/50 rounded-full text-slate-400">
                        {transport.comfort}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities Marketplace */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-200">Available Activities</h3>
                <button 
                  onClick={() => setShowActivityModal(true)}
                  className="text-sm text-lime-400 hover:text-purple-700 font-medium"
                >
                  View All
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === category
                        ? 'bg-lime-500 text-slate-950'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Current Activities */}
              {itinerary[`day${selectedDay}`]?.activities?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Selected Activities</h4>
                  <div className="space-y-2">
                    {itinerary[`day${selectedDay}`].activities.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-lime-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          <div>
                            <p className="font-medium text-slate-200">{activity.name}</p>
                            <p className="text-xs text-slate-400">{activity.duration} • {activity.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-lime-400">
                            LKR {activity.price.toLocaleString()}
                          </span>
                          <button 
                            onClick={() => removeActivity(activity.id, `day${selectedDay}`)}
                            className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Activities Grid */}
              <div className="grid grid-cols-2 gap-3">
                {filteredActivities.slice(0, 4).map(activity => (
                  <div 
                    key={activity.id}
                    className={`border rounded-lg overflow-hidden ${
                      activity.available ? 'hover:shadow-md transition-shadow' : 'opacity-60'
                    }`}
                  >
                    <div className="h-24" style={{ background: activity.image }}></div>
                    <div className="p-3">
                      <h4 className="font-semibold text-slate-200 text-sm mb-1">{activity.name}</h4>
                      <p className="text-xs text-slate-400 mb-2">{activity.duration} • {activity.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-lime-400">
                          LKR {activity.price.toLocaleString()}
                        </span>
                        {activity.available ? (
                          <button 
                            onClick={() => addActivityToDay(activity, `day${selectedDay}`)}
                            className="px-3 py-1 bg-lime-500 text-slate-950 text-xs rounded-lg hover:bg-lime-400"
                          >
                            Add
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-Ons Section */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Enhance Your Trip</h3>

              {/* Meal Upgrades */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Meal Packages</h4>
                <div className="grid grid-cols-2 gap-3">
                  {addOns.meals.map(meal => {
                    const isSelected = selectedAddOns.some(a => a.id === meal.id);
                    return (
                      <div 
                        key={meal.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          isSelected ? 'border-lime-500 bg-lime-50' : 'border-white/10 hover:border-purple-300'
                        }`}
                        onClick={() => isSelected ? removeAddon(meal.id) : addAddon(meal)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-200">{meal.name}</p>
                            <p className="text-xs text-slate-400">{meal.type}</p>
                          </div>
                          {isSelected ? (
                            <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                          ) : (
                            <span className="text-sm font-semibold text-lime-400">
                              +{meal.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extra Services */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Extra Services</h4>
                <div className="space-y-2">
                  {addOns.services.map(service => {
                    const isSelected = selectedAddOns.some(a => a.id === service.id);
                    return (
                      <div 
                        key={service.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                          isSelected ? 'border-lime-500 bg-lime-50' : 'border-white/10 hover:border-purple-300'
                        }`}
                        onClick={() => isSelected ? removeAddon(service.id) : addAddon(service)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-slate-200">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-lime-400">
                            LKR {service.price.toLocaleString()}
                          </span>
                          {isSelected && (
                            <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Room Upgrades */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Room Upgrades</h4>
                <div className="grid grid-cols-2 gap-3">
                  {addOns.roomUpgrades.map(upgrade => {
                    const isSelected = selectedAddOns.some(a => a.id === upgrade.id);
                    return (
                      <div 
                        key={upgrade.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          isSelected ? 'border-lime-500 bg-lime-50' : 'border-white/10 hover:border-purple-300'
                        }`}
                        onClick={() => isSelected ? removeAddon(upgrade.id) : addAddon(upgrade)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-200">{upgrade.name}</span>
                          {isSelected && (
                            <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-lime-400">
                          +LKR {upgrade.price.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Map View */}
        {!mapCollapsed && (
          <div className="w-96 bg-slate-900 border border-white/10 border-l border-white/10 h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-200">Map View</h3>
                <button 
                  onClick={() => setMapCollapsed(true)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg"
                >
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl h-64 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-lime-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                  <p className="text-sm text-slate-400">Interactive Map</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-2 bg-lime-500 text-slate-950 rounded-lg font-medium hover:bg-lime-400">
                  Recalculate Route
                </button>
                <button className="w-full py-2 border border-white/20 text-slate-300 rounded-lg font-medium hover:bg-slate-950">
                  View Directions
                </button>
              </div>

              {/* Location List */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Day {selectedDay} Locations</h4>
                <div className="space-y-2">
                  {itinerary[`day${selectedDay}`]?.hotel && (
                    <div className="flex items-start gap-2 p-2 bg-slate-950 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        H
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-200">{itinerary[`day${selectedDay}`].hotel.name}</p>
                        <p className="text-xs text-slate-400">{itinerary[`day${selectedDay}`].hotel.location}</p>
                      </div>
                    </div>
                  )}
                  {itinerary[`day${selectedDay}`]?.activities?.map((activity, idx) => (
                    <div key={activity.id} className="flex items-start gap-2 p-2 bg-slate-950 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-200">{activity.name}</p>
                        <p className="text-xs text-slate-400">{activity.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed Map Toggle */}
        {mapCollapsed && (
          <button 
            onClick={() => setMapCollapsed(false)}
            className="fixed right-0 top-1/2 -translate-y-1/2 bg-lime-500 text-slate-950 p-3 rounded-l-lg shadow-lg hover:bg-lime-400 z-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-80 right-0 bg-slate-900 border border-white/10 border-t border-white/10 p-4 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex gap-3">
            <button 
              onClick={resetItinerary}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/50 rounded-lg"
            >
              Reset to Original
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/50 rounded-lg">
              Save Draft
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-400">Total Cost</p>
              <p className="text-lg font-bold text-lime-400">LKR {currentTotal.toLocaleString()}</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-slate-300 border border-white/20 rounded-lg hover:bg-slate-950">
              Cancel Changes
            </button>
            <button 
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${
                currentTotal <= budget 
                  ? 'bg-lime-500 text-slate-950 hover:bg-lime-400' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              disabled={currentTotal > budget}
            >
              {currentTotal <= budget ? 'Proceed to Booking' : 'Over Budget'}
            </button>
          </div>
        </div>
      </div>

      {/* Budget Alert Modal */}
      {showBudgetAlert && currentTotal > budget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-6 slide-in">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-200 text-center mb-2">Budget Exceeded!</h3>
            <p className="text-slate-400 text-center mb-4">
              Your current total is <span className="font-bold text-red-400">LKR {(currentTotal - budget).toLocaleString()}</span> over budget.
            </p>
            
            <div className="bg-slate-950 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">Suggested Actions:</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span>Remove the last added item</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span>Choose a more affordable hotel option</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span>Remove some add-ons or activities</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={undoLastChange}
                className="flex-1 px-4 py-2 bg-lime-500 text-slate-950 rounded-lg font-medium hover:bg-lime-400"
              >
                Remove Last Item
              </button>
              <button 
                onClick={() => setShowBudgetAlert(false)}
                className="flex-1 px-4 py-2 border border-white/20 text-slate-300 rounded-lg font-medium hover:bg-slate-950"
              >
                Keep Editing
              </button>
            </div>
            <button className="w-full mt-3 py-2 text-sm text-lime-400 hover:text-purple-700 font-medium">
              Increase Budget
            </button>
          </div>
        </div>
      )}

      {/* Hotel Modal */}
      {showHotelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border border-white/10 border-b border-white/10 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-200">Select Hotel</h3>
              <button 
                onClick={() => setShowHotelModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg"
              >
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {alternativeHotels.map(hotel => (
                <div key={hotel.id} className="border border-white/10 rounded-lg p-4 hover:border-purple-300 transition-all">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-32 h-32 rounded-lg flex-shrink-0"
                      style={{ background: hotel.image }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-200 mb-1">{hotel.name}</h4>
                      <p className="text-sm text-slate-400 mb-2">{hotel.location}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span className="text-sm text-slate-300">{hotel.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex gap-1">
                          {hotel.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-slate-800/50 px-2 py-1 rounded-full text-slate-400">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-slate-200">
                            LKR {hotel.price.toLocaleString()}
                          </span>
                          <span className={`text-sm ${hotel.priceDiff > 0 ? 'text-red-400' : 'text-green-600'}`}>
                            ({hotel.priceDiff > 0 ? '+' : ''}{hotel.priceDiff.toLocaleString()})
                          </span>
                        </div>
                        <button 
                          onClick={() => changeHotel(hotel, `day${selectedDay}`)}
                          className="px-6 py-2 bg-lime-500 text-slate-950 rounded-lg font-medium hover:bg-lime-400"
                        >
                          Select This Hotel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border border-white/10 border-b border-white/10 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-200">Add Activities</h3>
              <button 
                onClick={() => setShowActivityModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg"
              >
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            {/* Category Filters */}
            <div className="p-6 border-b border-white/10">
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === category
                        ? 'bg-lime-500 text-slate-950'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              {filteredActivities.map(activity => (
                <div 
                  key={activity.id}
                  className={`border rounded-lg overflow-hidden ${
                    activity.available ? 'hover:shadow-lg transition-shadow' : 'opacity-60'
                  }`}
                >
                  <div className="h-32" style={{ background: activity.image }}></div>
                  <div className="p-4">
                    <h4 className="font-semibold text-slate-200 mb-1">{activity.name}</h4>
                    <p className="text-sm text-slate-400 mb-3">{activity.duration} • {activity.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-lime-400">
                        LKR {activity.price.toLocaleString()}
                      </span>
                      {activity.available ? (
                        <button 
                          onClick={() => {
                            addActivityToDay(activity, `day${selectedDay}`);
                            setShowActivityModal(false);
                          }}
                          className="px-4 py-2 bg-lime-500 text-slate-950 text-sm rounded-lg hover:bg-lime-400 font-medium"
                        >
                          Add to Trip
                        </button>
                      ) : (
                        <span className="text-sm text-red-400 font-medium">Unavailable</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}