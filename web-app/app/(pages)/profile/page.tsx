'use client'

import React, { useState } from 'react'
import { ChevronLeft, LogOut, Settings, Lock, ShoppingBag, Bell, Trash2 } from 'lucide-react'

export default function ProfilePage() {
  // Mock customer data - in production this would come from API/database
  const [activeTab, setActiveTab] = useState('profile')
  
  const customerData = {
    customer_id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@globalmart.com',
    registered_date: '2024-01-15',
    lifetime_value: 5420.75,
    tier: {
      tier_name: 'Gold',
      discount_percentage: 10,
    },
    phone: '+20 100 123 4567',
    country: 'Egypt',
    city: 'Cairo',
    postal_code: 'EG-11111',
    tax_id: 'EG-123456789',
    bio: 'Premium Customer',
  }

  const orderStats = {
    total_orders: 12,
    pending_orders: 2,
    completed_orders: 10,
    total_spent: 5420.75,
  }

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: 'profile' },
    { id: 'security', label: 'Security', icon: 'security' },
    { id: 'orders', label: 'My Orders', icon: 'orders' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  ]

  const renderIcon = (iconType: string) => {
    const iconClass = 'w-5 h-5'
    switch (iconType) {
      case 'security':
        return <Lock className={iconClass} />
      case 'orders':
        return <ShoppingBag className={iconClass} />
      case 'settings':
        return <Settings className={iconClass} />
      case 'notifications':
        return <Bell className={iconClass} />
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      {/* Header */}
      <div className='bg-white border-b border-slate-200 px-6 py-4'>
        <div className='flex items-center gap-3'>
          <ChevronLeft className='w-6 h-6 text-slate-600 cursor-pointer' />
          <h1 className='text-2xl font-bold text-slate-900'>Account Settings</h1>
        </div>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <aside className='w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-80px)]'>
          <nav className='p-6 space-y-2'>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.id !== 'profile' && renderIcon(item.icon)}
                <span>{item.label}</span>
              </button>
            ))}
            
            <div className='pt-4 mt-4 border-t border-slate-200'>
              <button className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors'>
                <Trash2 className='w-5 h-5' />
                <span>Delete Account</span>
              </button>
              <button className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors'>
                <LogOut className='w-5 h-5' />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-8'>
          {activeTab === 'profile' && (
            <div className='max-w-4xl'>
              {/* Profile Header */}
              <div className='mb-8'>
                <h2 className='text-3xl font-bold text-slate-900 mb-2'>My Profile</h2>
              </div>

              {/* User Info Card */}
              <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8'>
                <div className='flex items-start gap-6 pb-8 border-b border-slate-200'>
                  <div className='w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold'>
                    {customerData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-slate-900'>{customerData.name}</h3>
                    <p className='text-slate-600'>{customerData.bio}</p>
                    <div className='mt-3 flex items-center gap-2'>
                      <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'>
                        {customerData.tier.tier_name} Member
                      </span>
                      <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium'>
                        {customerData.tier.discount_percentage}% Discount
                      </span>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className='mt-8'>
                  <h4 className='text-lg font-bold text-slate-900 mb-6'>Personal Information</h4>
                  <div className='grid grid-cols-2 gap-8'>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Full Name</label>
                      <p className='text-slate-900 font-medium'>{customerData.name}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Customer ID</label>
                      <p className='text-slate-900 font-medium'>#{customerData.customer_id.toString().padStart(5, '0')}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Email Address</label>
                      <p className='text-slate-900 font-medium'>{customerData.email}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Phone</label>
                      <p className='text-slate-900 font-medium'>{customerData.phone}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Member Since</label>
                      <p className='text-slate-900 font-medium'>{new Date(customerData.registered_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Lifetime Value</label>
                      <p className='text-slate-900 font-medium'>${customerData.lifetime_value.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className='mt-8 pt-8 border-t border-slate-200'>
                  <h4 className='text-lg font-bold text-slate-900 mb-6'>Address</h4>
                  <div className='grid grid-cols-2 gap-8'>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Country</label>
                      <p className='text-slate-900 font-medium'>{customerData.country}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>City/State</label>
                      <p className='text-slate-900 font-medium'>{customerData.city}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>Postal Code</label>
                      <p className='text-slate-900 font-medium'>{customerData.postal_code}</p>
                    </div>
                    <div>
                      <label className='block text-sm text-slate-600 mb-1'>TAX ID</label>
                      <p className='text-slate-900 font-medium'>{customerData.tax_id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Statistics */}
              <div className='grid grid-cols-4 gap-4'>
                <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'>
                  <p className='text-slate-600 text-sm mb-2'>Total Orders</p>
                  <p className='text-3xl font-bold text-slate-900'>{orderStats.total_orders}</p>
                </div>
                <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'>
                  <p className='text-slate-600 text-sm mb-2'>Pending</p>
                  <p className='text-3xl font-bold text-yellow-600'>{orderStats.pending_orders}</p>
                </div>
                <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'>
                  <p className='text-slate-600 text-sm mb-2'>Completed</p>
                  <p className='text-3xl font-bold text-green-600'>{orderStats.completed_orders}</p>
                </div>
                <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'>
                  <p className='text-slate-600 text-sm mb-2'>Total Spent</p>
                  <p className='text-2xl font-bold text-slate-900'>${orderStats.total_spent.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'profile' && (
            <div className='text-center py-16'>
              <p className='text-slate-600 text-lg'>This section is coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}