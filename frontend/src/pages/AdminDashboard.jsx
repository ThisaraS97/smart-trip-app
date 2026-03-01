import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };
  const [showApprovalModal, setShowApprovalModal] = useState(null);
  const [showSuspendModal, setShowSuspendModal] = useState(null);

  // hardcoded for now, TODO: fetch from backend
  const stats = {
    totalVendors: 156,
    pendingApprovals: 12,
    activeVendors: 132,
    suspendedVendors: 12,
    totalUsers: 8934,
    activeUsers: 7245,
    totalBookings: 2847,
    totalRevenue: 28475000,
    platformCommission: 2847500,
    pendingPayouts: 4875000,
    activeLiveChats: 8,
    pendingTickets: 23
  };

  const pendingVendors = [
    {
      id: 'VA-2025-0234',
      businessName: 'Sunset Beach Resort',
      type: 'Hotel',
      location: 'Galle',
      appliedDate: '2025-02-10',
      email: 'contact@sunsetbeach.lk',
      phone: '+94 91 234 5678',
      documentsComplete: true
    },
    {
      id: 'VA-2025-0235',
      businessName: 'Hill Country Tours',
      type: 'Tour Guide',
      location: 'Nuwara Eliya',
      appliedDate: '2025-02-11',
      email: 'info@hillcountrytours.lk',
      phone: '+94 52 234 5678',
      documentsComplete: false
    },
    {
      id: 'VA-2025-0236',
      businessName: 'Safari Adventures',
      type: 'Activity Provider',
      location: 'Yala',
      appliedDate: '2025-02-12',
      email: 'bookings@safariadventures.lk',
      phone: '+94 47 234 5678',
      documentsComplete: true
    }
  ];

  const recentBookings = [
    {
      id: 'BK-2025-2847',
      customer: 'John Smith',
      vendor: "Earl's Regency",
      service: 'Deluxe Room',
      amount: 45000,
      status: 'confirmed',
      date: '2025-02-13',
      commission: 4500
    },
    {
      id: 'BK-2025-2846',
      customer: 'Sarah Williams',
      vendor: 'Cultural Tours Lanka',
      service: 'Temple Tour',
      amount: 8500,
      status: 'completed',
      date: '2025-02-13',
      commission: 850
    },
    {
      id: 'BK-2025-2845',
      customer: 'Mike Chen',
      vendor: 'Beach Villa Mirissa',
      service: 'Ocean View Room',
      amount: 32000,
      status: 'pending',
      date: '2025-02-13',
      commission: 3200
    }
  ];

  const flaggedContent = [
    {
      id: 'FLAG-001',
      type: 'Review',
      vendor: "Earl's Regency",
      reporter: 'User #4521',
      reason: 'Inappropriate language',
      date: '2025-02-12',
      status: 'pending'
    },
    {
      id: 'FLAG-002',
      type: 'Listing',
      vendor: 'Fake Tours Inc',
      reporter: 'System',
      reason: 'Suspected fraud',
      date: '2025-02-11',
      status: 'investigating'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'critical',
      message: 'Payment gateway experiencing delays',
      time: '15 minutes ago',
      resolved: false
    },
    {
      id: 2,
      type: 'warning',
      message: 'High server load detected',
      time: '1 hour ago',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      message: 'Scheduled maintenance in 48 hours',
      time: '3 hours ago',
      resolved: true
    }
  ];

  const revenueData = [
    { month: 'Aug', revenue: 2200000, commission: 220000 },
    { month: 'Sep', revenue: 2450000, commission: 245000 },
    { month: 'Oct', revenue: 2680000, commission: 268000 },
    { month: 'Nov', revenue: 2520000, commission: 252000 },
    { month: 'Dec', revenue: 3100000, commission: 310000 },
    { month: 'Jan', revenue: 2890000, commission: 289000 },
    { month: 'Feb', revenue: 2847500, commission: 284750 }
  ];

  const handleApproveVendor = (vendor) => {
    alert(`Vendor ${vendor.businessName} approved!`);
    setShowApprovalModal(null);
  };

  const handleRejectVendor = (vendor) => {
    // TODO: send rejection reason email
    alert(`Vendor ${vendor.businessName} rejected`);
    setShowApprovalModal(null);
  };

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      `}</style>

      {/* Top Navigation */}
      <nav className="bg-slate-900 border border-white/10 border-b border-white/10 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ST</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-200">SmartTRIP Admin</h1>
                <p className="text-xs text-slate-400">Platform Management</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-slate-800/50 rounded-lg">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {stats.pendingTickets > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <div className="w-8 h-8 bg-lime-500 text-slate-950 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AD</span>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm text-red-400 border border-red-300 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-slate-900 border border-white/10 border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'vendors', label: 'Vendor Management' },
              { id: 'users', label: 'User Management' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'revenue', label: 'Revenue & Payouts' },
              { id: 'content', label: 'Content Moderation' },
              { id: 'support', label: 'Support' },
              { id: 'settings', label: 'System Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-lime-500 text-lime-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
                {tab.id === 'vendors' && stats.pendingApprovals > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {stats.pendingApprovals}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Alerts */}
            {systemAlerts.filter(a => !a.resolved).length > 0 && (
              <div className="space-y-2">
                {systemAlerts.filter(a => !a.resolved).map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'critical' ? 'bg-red-500/10 border-red-500' :
                      alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500' :
                      'bg-lime-500/10 border-lime-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {alert.type === 'critical' && '🚨'}
                          {alert.type === 'warning' && '⚠️'}
                          {alert.type === 'info' && 'ℹ️'}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{alert.message}</p>
                          <p className="text-sm text-slate-400">{alert.time}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-slate-900 border border-white/10">
                        Resolve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  {stats.pendingApprovals > 0 && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      {stats.pendingApprovals} pending
                    </span>
                  )}
                </div>
                <h3 className="text-sm text-slate-400 mb-1">Total Vendors</h3>
                <p className="text-3xl font-bold text-white">{stats.totalVendors}</p>
                <p className="text-xs text-slate-500 mt-1">{stats.activeVendors} active</p>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-lime-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <h3 className="text-sm text-slate-400 mb-1">Total Users</h3>
                <p className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">{stats.activeUsers.toLocaleString()} active</p>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <h3 className="text-sm text-slate-400 mb-1">Total Bookings</h3>
                <p className="text-3xl font-bold text-white">{stats.totalBookings.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">This month</p>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-sm text-slate-400 mb-1">Platform Revenue</h3>
                <p className="text-3xl font-bold text-white">
                  LKR {(stats.totalRevenue / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-green-600 mt-1">+12.5% vs last month</p>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-white mb-6">Platform Revenue & Commission</h3>
              <div className="h-64">
                <div className="flex items-end justify-around h-full gap-2 pb-4">
                  {revenueData.map((data, index) => {
                    const revenueHeight = (data.revenue / maxRevenue) * 100;
                    const commissionHeight = (data.commission / maxRevenue) * 100;
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex gap-1 items-end">
                          <div className="flex-1 relative group">
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:opacity-80 cursor-pointer"
                              style={{ height: `${revenueHeight}%` }}
                            >
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Revenue: LKR {(data.revenue / 1000).toFixed(0)}K
                              </div>
                            </div>
                          </div>
                          <div
                            className="w-1/3 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
                            style={{ height: `${commissionHeight}%` }}
                            title={`Commission: LKR ${(data.commission / 1000).toFixed(0)}K`}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{data.month}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Total Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-lime-500 text-slate-950 rounded"></div>
                  <span>Platform Commission</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-white mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {recentBookings.slice(0, 5).map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-3 hover:bg-slate-950 rounded-lg">
                      <div>
                        <p className="font-semibold text-white">{booking.id}</p>
                        <p className="text-sm text-slate-400">{booking.customer} → {booking.vendor}</p>
                        <p className="text-xs text-slate-500">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">LKR {booking.amount.toLocaleString()}</p>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-300' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-300' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-white mb-4">Flagged Content</h3>
                <div className="space-y-3">
                  {flaggedContent.map(flag => (
                    <div key={flag.id} className="p-3 border border-red-200 bg-red-500/10 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-white">{flag.type}: {flag.vendor}</p>
                          <p className="text-sm text-slate-300">Reason: {flag.reason}</p>
                          <p className="text-xs text-slate-500 mt-1">Reported by {flag.reporter} on {flag.date}</p>
                        </div>
                        <button className="px-3 py-1 text-xs bg-lime-500 text-slate-950 rounded hover:bg-lime-400">
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vendor Management Tab */}
        {activeTab === 'vendors' && (
          <div className="space-y-8">
            {/* Pending Approvals */}
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">
                  Pending Vendor Approvals
                  <span className="ml-3 px-3 py-1 bg-red-100 text-red-300 text-sm font-semibold rounded-full">
                    {pendingVendors.length}
                  </span>
                </h3>
              </div>

              <div className="space-y-4">
                {pendingVendors.map(vendor => (
                  <div key={vendor.id} className="border border-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-white">{vendor.businessName}</h4>
                          <span className="px-2 py-1 bg-lime-100 text-purple-700 text-xs font-semibold rounded">
                            {vendor.type}
                          </span>
                          {!vendor.documentsComplete && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                              Incomplete Docs
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <p className="text-slate-300"><span className="font-medium">ID:</span> {vendor.id}</p>
                          <p className="text-slate-300"><span className="font-medium">Location:</span> {vendor.location}</p>
                          <p className="text-slate-300"><span className="font-medium">Email:</span> {vendor.email}</p>
                          <p className="text-slate-300"><span className="font-medium">Phone:</span> {vendor.phone}</p>
                          <p className="text-slate-300"><span className="font-medium">Applied:</span> {vendor.appliedDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => setShowApprovalModal(vendor)}
                          className="px-4 py-2 border border-white/20 text-slate-300 rounded-lg hover:bg-slate-950"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleApproveVendor(vendor)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectVendor(vendor)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Vendors Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <h4 className="text-sm text-slate-400 mb-2">Active Vendors</h4>
                <p className="text-3xl font-bold text-green-600">{stats.activeVendors}</p>
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <h4 className="text-sm text-slate-400 mb-2">Suspended</h4>
                <p className="text-3xl font-bold text-red-400">{stats.suspendedVendors}</p>
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
                <h4 className="text-sm text-slate-400 mb-2">Pending Payouts</h4>
                <p className="text-3xl font-bold text-orange-600">
                  LKR {(stats.pendingPayouts / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Live Chat Queue</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-300 font-semibold rounded-full">
                  {stats.activeLiveChats} active
                </span>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 border border-white/10 rounded-lg hover:bg-slate-950">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Customer #{4500 + i}</p>
                        <p className="text-sm text-slate-400">Waiting: {i * 2} minutes</p>
                      </div>
                      <button className="px-4 py-2 bg-lime-500 text-slate-950 rounded-lg hover:bg-lime-400">
                        Join Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Support Tickets</h3>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 font-semibold rounded-full">
                  {stats.pendingTickets} pending
                </span>
              </div>
              <div className="space-y-3">
                {['High Priority', 'Medium Priority', 'Low Priority'].map((priority, i) => (
                  <div key={i} className="p-4 border border-white/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Ticket #T-{2025000 + i}</p>
                        <p className="text-sm text-slate-400">{priority}</p>
                      </div>
                      <button className="px-4 py-2 border border-purple-300 text-lime-400 rounded-lg hover:bg-lime-50">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-white/10 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-white mb-6">Platform Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Platform Commission Rate</p>
                    <p className="text-sm text-slate-400">Current: 10%</p>
                  </div>
                  <button className="px-4 py-2 border border-purple-300 text-lime-400 rounded-lg hover:bg-lime-50">
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">New Vendor Auto-Approval</p>
                    <p className="text-sm text-slate-400">Require manual approval</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-lime-500 text-slate-950"></div>
                    <div className="absolute left-[2px] top-[2px] bg-slate-900 border border-white/10 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Maintenance Mode</p>
                    <p className="text-sm text-slate-400">Platform is currently online</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-600"></div>
                    <div className="absolute left-[2px] top-[2px] bg-slate-900 border border-white/10 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}