import React, { useState } from 'react';

export default function RevenueAnalytics() {
  const [dateRange, setDateRange] = useState('thisMonth');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [revenueView, setRevenueView] = useState('monthly'); // monthly by default
  const [topServicesBy, setTopServicesBy] = useState('revenue'); // revenue or bookings
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [compareIndustry, setCompareIndustry] = useState(false);

  const metrics = {
    totalRevenue: 2847500,
    previousRevenue: 2456300,
    totalBookings: 234,
    previousBookings: 198,
    avgBookingValue: 12170,
    conversionRate: 18.5,
    pendingPayout: 487600,
    paidAmount: 2359900
  };

  // computes % change between periods
  const calculateChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  const revenueData = [
    { period: 'Sep', revenue: 380000, previous: 345000 },
    { period: 'Oct', revenue: 425000, previous: 390000 },
    { period: 'Nov', revenue: 395000, previous: 410000 },
    { period: 'Dec', revenue: 510000, previous: 468000 },
    { period: 'Jan', revenue: 452000, previous: 425000 },
    { period: 'Feb', revenue: 485600, previous: 418300 }
  ];

  const categoryData = [
    { category: 'Hotels/Accommodation', bookings: 145, revenue: 1850000, color: '#667eea', percentage: 62 },
    { category: 'Activities', bookings: 67, revenue: 587000, color: '#34C759', percentage: 20 },
    { category: 'Transport', bookings: 18, revenue: 324000, color: '#FF9500', percentage: 11 },
    { category: 'Tour Guides', bookings: 4, revenue: 86500, color: '#764ba2', percentage: 7 }
  ];

  const bookingsTimeline = [
    { period: 'Week 1', confirmed: 38, completed: 42, cancelled: 5 },
    { period: 'Week 2', confirmed: 45, completed: 38, cancelled: 3 },
    { period: 'Week 3', confirmed: 52, completed: 45, cancelled: 7 },
    { period: 'Week 4', confirmed: 48, completed: 51, cancelled: 4 }
  ];

  const topServices = [
    { name: 'Deluxe Room with Garden View', revenue: 425000, bookings: 28 },
    { name: 'Suite with Ocean View', revenue: 385000, bookings: 15 },
    { name: 'Cultural Dance Show', revenue: 247000, bookings: 98 },
    { name: 'Tea Plantation Tour', revenue: 198000, bookings: 56 },
    { name: 'Private Car with Driver', revenue: 176000, bookings: 22 },
    { name: 'Standard Room', revenue: 165000, bookings: 16 },
    { name: 'City Tour Package', revenue: 142000, bookings: 47 },
    { name: 'Wildlife Safari', revenue: 128000, bookings: 32 },
    { name: 'Cooking Class Experience', revenue: 98000, bookings: 39 },
    { name: 'Temple Tour', revenue: 85000, bookings: 34 }
  ];

  const revenueReport = [
    { id: 'BK-2025-0847', date: '2025-02-11', service: 'Deluxe Room', customer: 'John Smith', amount: 45000, commission: 4500, payout: 40500, status: 'Confirmed', payment: 'Pending' },
    { id: 'BK-2025-0846', date: '2025-02-10', service: 'Cultural Show', customer: 'Sarah Williams', amount: 10000, commission: 1000, payout: 9000, status: 'Completed', payment: 'Paid' },
    { id: 'BK-2025-0845', date: '2025-02-10', service: 'Suite', customer: 'Mike Chen', amount: 75000, commission: 7500, payout: 67500, status: 'Confirmed', payment: 'Paid' },
    { id: 'BK-2025-0844', date: '2025-02-09', service: 'Private Car', customer: 'Emma Davis', amount: 8000, commission: 800, payout: 7200, status: 'Completed', payment: 'Paid' },
    { id: 'BK-2025-0843', date: '2025-02-08', service: 'Tea Tour', customer: 'David Kumar', amount: 14000, commission: 1400, payout: 12600, status: 'Completed', payment: 'Paid' }
  ];

  const servicePerformance = [
    { name: 'Deluxe Room', category: 'Hotel', bookings: 28, revenue: 425000, rating: 4.8, occupancy: 87, peakDates: 'Dec 20-30' },
    { name: 'Suite with Ocean View', category: 'Hotel', bookings: 15, revenue: 385000, rating: 5.0, occupancy: 93, peakDates: 'Dec 24-Jan 5' },
    { name: 'Cultural Dance Show', category: 'Activity', bookings: 98, revenue: 247000, rating: 4.9, occupancy: 76, peakDates: 'Jan 15-25' },
    { name: 'Tea Plantation Tour', category: 'Activity', bookings: 56, revenue: 198000, rating: 4.6, occupancy: 68, peakDates: 'Dec 10-20' }
  ];

  const customerInsights = {
    newCustomers: 187,
    returningCustomers: 47,
    retentionRate: 20.1,
    avgFrequency: 1.3
  };

  const locationData = [
    { location: 'Colombo', customers: 89, percentage: 38 },
    { location: 'Kandy', customers: 56, percentage: 24 },
    { location: 'Galle', customers: 43, percentage: 18 },
    { location: 'Other', customers: 46, percentage: 20 }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const maxBookings = Math.max(...bookingsTimeline.flatMap(w => [w.confirmed, w.completed, w.cancelled]));
  const maxTopService = Math.max(...topServices.map(s => topServicesBy === 'revenue' ? s.revenue : s.bookings));

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
              <h1 className="text-2xl font-bold text-white">Revenue & Analytics</h1>
              <p className="text-slate-400 mt-1">Financial reporting and business intelligence</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Download PDF
              </button>
              <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Export Excel
              </button>
              <button className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Email Report
              </button>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-4 py-2 bg-lime-500 text-slate-950 rounded-lg hover:bg-lime-400 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Schedule Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Range Selector */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {['today', 'thisWeek', 'thisMonth', 'lastMonth', 'thisYear'].map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    dateRange === range ? 'bg-lime-500 text-slate-950' : 'bg-slate-800/50 text-slate-300 hover:bg-gray-200'
                  }`}
                >
                  {range === 'today' && 'Today'}
                  {range === 'thisWeek' && 'This Week'}
                  {range === 'thisMonth' && 'This Month'}
                  {range === 'lastMonth' && 'Last Month'}
                  {range === 'thisYear' && 'This Year'}
                </button>
              ))}
              <button
                onClick={() => setDateRange('custom')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  dateRange === 'custom' ? 'bg-lime-500 text-slate-950' : 'bg-slate-800/50 text-slate-300 hover:bg-gray-200'
                }`}
              >
                Custom Range
              </button>
            </div>
            
            {dateRange === 'custom' && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={customDateFrom}
                  onChange={(e) => setCustomDateFrom(e.target.value)}
                  className="px-4 py-2 border border-white/20 rounded-lg"
                />
                <span className="text-slate-400">to</span>
                <input
                  type="date"
                  value={customDateTo}
                  onChange={(e) => setCustomDateTo(e.target.value)}
                  className="px-4 py-2 border border-white/20 rounded-lg"
                />
                <button className="px-6 py-2 bg-lime-500 text-slate-950 rounded-lg hover:bg-lime-400">
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-400">Total Revenue</h3>
              {(() => {
                const change = calculateChange(metrics.totalRevenue, metrics.previousRevenue);
                return (
                  <span className={`text-xs font-semibold ${change.isPositive ? 'text-green-600' : 'text-red-400'}`}>
                    {change.isPositive ? '↑' : '↓'} {change.value}%
                  </span>
                );
              })()}
            </div>
            <p className="text-4xl font-bold text-white mb-1">
              LKR {(metrics.totalRevenue / 1000000).toFixed(2)}M
            </p>
            <p className="text-sm text-slate-500">vs. previous period</p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-400">Total Bookings</h3>
              {(() => {
                const change = calculateChange(metrics.totalBookings, metrics.previousBookings);
                return (
                  <span className={`text-xs font-semibold ${change.isPositive ? 'text-green-600' : 'text-red-400'}`}>
                    {change.isPositive ? '↑' : '↓'} {change.value}%
                  </span>
                );
              })()}
            </div>
            <p className="text-4xl font-bold text-white mb-1">{metrics.totalBookings}</p>
            <p className="text-sm text-slate-500">confirmed bookings</p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Average Booking Value</h3>
            <p className="text-4xl font-bold text-white mb-1">
              LKR {(metrics.avgBookingValue / 1000).toFixed(1)}K
            </p>
            <p className="text-sm text-slate-500">per booking</p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Conversion Rate</h3>
            <p className="text-4xl font-bold text-white mb-1">{metrics.conversionRate}%</p>
            <p className="text-sm text-slate-500">views to bookings</p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Pending Payout</h3>
            <p className="text-4xl font-bold text-orange-600 mb-1">
              LKR {(metrics.pendingPayout / 1000).toFixed(0)}K
            </p>
            <p className="text-sm text-slate-500">awaiting payment</p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Paid Amount</h3>
            <p className="text-4xl font-bold text-green-600 mb-1">
              LKR {(metrics.paidAmount / 1000000).toFixed(2)}M
            </p>
            <p className="text-sm text-slate-500">received</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Revenue Trend</h3>
              <div className="flex gap-2">
                {['daily', 'weekly', 'monthly'].map(view => (
                  <button
                    key={view}
                    onClick={() => setRevenueView(view)}
                    className={`px-3 py-1 text-sm rounded ${
                      revenueView === view ? 'bg-lime-500 text-slate-950' : 'bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64">
              <div className="flex items-end justify-around h-full gap-2 pb-4">
                {revenueData.map((data, index) => {
                  const height = (data.revenue / maxRevenue) * 100;
                  const prevHeight = (data.previous / maxRevenue) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center relative">
                      <div className="w-full flex gap-1 items-end">
                        <div className="flex-1 relative group">
                          <div
                            className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg hover:opacity-80 cursor-pointer"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              LKR {(data.revenue / 1000).toFixed(0)}K
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-2 bg-gray-300 rounded-t-lg"
                          style={{ height: `${prevHeight}%` }}
                          title="Previous period"
                        ></div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">{data.period}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="mt-4 text-sm text-lime-400 hover:text-purple-700 font-medium">
              Download Chart (PNG)
            </button>
          </div>

          {/* Bookings by Category */}
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-white mb-6">Bookings by Category</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {categoryData.map((cat, index) => {
                    const prevPercentages = categoryData.slice(0, index).reduce((sum, c) => sum + c.percentage, 0);
                    const offset = (prevPercentages / 100) * 283;
                    const dashArray = (cat.percentage / 100) * 283;
                    
                    return (
                      <circle
                        key={cat.category}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="10"
                        strokeDasharray={`${dashArray} 283`}
                        strokeDashoffset={-offset}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="space-y-3">
                {categoryData.map(cat => (
                  <div key={cat.category} className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }}></div>
                      <span className="text-sm text-slate-300">{cat.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{cat.percentage}%</p>
                      <p className="text-xs text-slate-500">{cat.bookings} bookings</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Timeline & Top Services */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Bookings Timeline */}
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Bookings Timeline</h3>
              <button className="text-sm text-lime-400 hover:text-purple-700 font-medium">
                Download Chart (PNG)
              </button>
            </div>
            <div className="h-64">
              <div className="flex items-end justify-around h-full gap-4 pb-4">
                {bookingsTimeline.map((week, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex gap-1">
                      <div
                        className="flex-1 bg-green-500 rounded-t-lg relative group"
                        style={{ height: `${(week.confirmed / maxBookings) * 100}%` }}
                      >
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {week.confirmed} confirmed
                        </div>
                      </div>
                      <div
                        className="flex-1 bg-blue-500 rounded-t-lg relative group"
                        style={{ height: `${(week.completed / maxBookings) * 100}%` }}
                      >
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {week.completed} completed
                        </div>
                      </div>
                      <div
                        className="flex-1 bg-red-500 rounded-t-lg relative group"
                        style={{ height: `${(week.cancelled / maxBookings) * 100}%` }}
                      >
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {week.cancelled} cancelled
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{week.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Cancelled</span>
              </div>
            </div>
          </div>

          {/* Top Performing Services */}
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Top Services</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTopServicesBy('revenue')}
                  className={`px-3 py-1 text-sm rounded ${
                    topServicesBy === 'revenue' ? 'bg-lime-500 text-slate-950' : 'bg-slate-800/50 text-slate-300'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setTopServicesBy('bookings')}
                  className={`px-3 py-1 text-sm rounded ${
                    topServicesBy === 'bookings' ? 'bg-lime-500 text-slate-950' : 'bg-slate-800/50 text-slate-300'
                  }`}
                >
                  Bookings
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {topServices.slice(0, 5).map((service, index) => {
                const value = topServicesBy === 'revenue' ? service.revenue : service.bookings;
                const width = (value / maxTopService) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300 truncate">{service.name}</span>
                      <span className="text-sm font-semibold text-white">
                        {topServicesBy === 'revenue' 
                          ? `LKR ${(value / 1000).toFixed(0)}K` 
                          : `${value} bookings`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-lime-500 text-slate-950 h-2 rounded-full transition-all"
                        style={{ width: `${width}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 text-sm text-lime-400 hover:text-purple-700 font-medium">
              View Full Ranking →
            </button>
          </div>
        </div>

        {/* Customer Insights & Compare Industry */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Customer Insights */}
          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-white mb-6">Customer Insights</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-lime-500/10 rounded-lg">
                <p className="text-3xl font-bold text-lime-300">{customerInsights.newCustomers}</p>
                <p className="text-sm text-slate-400 mt-1">New Customers</p>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{customerInsights.returningCustomers}</p>
                <p className="text-sm text-slate-400 mt-1">Returning</p>
              </div>
              <div className="text-center p-4 bg-lime-50 rounded-lg">
                <p className="text-3xl font-bold text-lime-400">{customerInsights.retentionRate}%</p>
                <p className="text-sm text-slate-400 mt-1">Retention Rate</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">{customerInsights.avgFrequency}x</p>
                <p className="text-sm text-slate-400 mt-1">Avg. Frequency</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Customer Segmentation by Location</h4>
              <div className="space-y-3">
                {locationData.map((loc, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300">{loc.location}</span>
                      <span className="text-sm font-semibold text-white">
                        {loc.customers} ({loc.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${loc.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry Comparison */}
          <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Industry Comparison</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={compareIndustry}
                  onChange={(e) => setCompareIndustry(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-lime-500 text-slate-950 peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                <div className="absolute left-[2px] top-[2px] bg-slate-900 border border-white/10 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>
            {compareIndustry && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Your Revenue</p>
                  <p className="text-2xl font-bold text-lime-400">LKR 2.8M</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Industry Avg</p>
                  <p className="text-2xl font-bold text-slate-400">LKR 2.1M</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold text-green-600">+33% above average</p>
                  <p className="text-xs text-slate-500 mt-1">You're performing better than 78% of vendors</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Revenue Report Table */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Detailed Revenue Report</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                Export CSV
              </button>
              <button className="px-4 py-2 text-sm border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                Export PDF
              </button>
              <button className="px-4 py-2 text-sm border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
                Print Report
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Booking ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Commission</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Net Payout</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {revenueReport.map(booking => (
                  <tr key={booking.id} className="hover:bg-slate-950">
                    <td className="px-4 py-3 text-sm font-medium text-white">{booking.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">{booking.date}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{booking.service}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{booking.customer}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-white">
                      LKR {booking.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      LKR {booking.commission.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">
                      LKR {booking.payout.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-300' : 'bg-green-100 text-green-300'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.payment === 'Paid' ? 'bg-green-100 text-green-300' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {booking.payment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Performance Table */}
        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Service Performance</h3>
            <button className="px-4 py-2 text-sm border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950">
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Service Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Bookings</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Revenue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Occupancy</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Peak Dates</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {servicePerformance.map((service, idx) => (
                  <tr key={idx} className="hover:bg-slate-950">
                    <td className="px-4 py-3 text-sm font-medium text-white">{service.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-lime-100 text-purple-700 text-xs font-semibold rounded">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{service.bookings}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-white">
                      LKR {(service.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      ★ {service.rating}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-white">{service.occupancy}%</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">{service.peakDates}</td>
                    <td className="px-4 py-3">
                      <button className="text-lime-400 hover:text-purple-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Schedule Reports Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Schedule Automated Reports</h2>
            <p className="text-slate-400 mb-6">Set up recurring report delivery</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Frequency</label>
                <select className="w-full px-4 py-2 border border-white/20 rounded-lg">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Report Type</label>
                <select className="w-full px-4 py-2 border border-white/20 rounded-lg">
                  <option>Full Analytics Report</option>
                  <option>Revenue Summary</option>
                  <option>Bookings Report</option>
                  <option>Performance Summary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email Recipients</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-white/20 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-3 border border-white/20 text-slate-300 rounded-lg font-semibold hover:bg-slate-950"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Report schedule saved!');
                  setShowScheduleModal(false);
                }}
                className="flex-1 px-4 py-3 bg-lime-500 text-slate-950 rounded-lg font-semibold hover:bg-lime-400"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}