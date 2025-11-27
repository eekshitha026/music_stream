import React from 'react';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  UserGroupIcon, 
  MusicalNoteIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon
} from '@heroicons/react/24/outline';
import { analyticsData, adminStats } from '../../utils/dummyData';

const Analytics = () => {
  const { monthlyStreams, topGenres, deviceUsage } = analyticsData;

  const kpiCards = [
    {
      title: 'Total Streams',
      value: `${(adminStats.totalStreams / 1000000000).toFixed(1)}B`,
      change: '+12.5%',
      icon: MusicalNoteIcon,
      color: 'text-blue-500'
    },
    {
      title: 'Active Users',
      value: adminStats.activeUsers.toLocaleString(),
      change: '+8.3%',
      icon: UserGroupIcon,
      color: 'text-green-500'
    },
    {
      title: 'Revenue',
      value: `$${(adminStats.revenue / 1000000).toFixed(1)}M`,
      change: '+15.7%',
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-500'
    },
    {
      title: 'Premium Rate',
      value: `${((adminStats.premiumUsers / adminStats.totalUsers) * 100).toFixed(1)}%`,
      change: '+3.2%',
      icon: ChartBarIcon,
      color: 'text-yellow-500'
    }
  ];

  const getDeviceIcon = (device) => {
    switch (device.toLowerCase()) {
      case 'mobile': return DevicePhoneMobileIcon;
      case 'desktop': return ComputerDesktopIcon;
      case 'tablet': return DeviceTabletIcon;
      default: return DevicePhoneMobileIcon;
    }
  };

  return (
    <div className="min-h-screen bg-dark-gray text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi) => (
          <div key={kpi.title} className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${kpi.color.replace('text-', 'bg-').replace('-500', '-900')}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <div className="text-green-400 text-sm flex items-center">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                {kpi.change}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{kpi.title}</h3>
            <p className="text-2xl font-bold">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Streams Chart */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-6">Monthly Streams</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyStreams.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-spotify-green rounded-t w-full"
                  style={{ 
                    height: `${(data.streams / Math.max(...monthlyStreams.map(d => d.streams))) * 200}px` 
                  }}
                />
                <span className="text-xs text-gray-400 mt-2">{data.month}</span>
                <span className="text-xs text-gray-500">{(data.streams / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Genres */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-6">Top Genres</h3>
          <div className="space-y-4">
            {topGenres.map((genre, index) => (
              <div key={genre.genre} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 w-6 text-center">{index + 1}</span>
                  <span className="text-white">{genre.genre}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-spotify-green h-2 rounded-full" 
                      style={{ width: `${genre.percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm w-12 text-right">{genre.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Device Usage */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-6">Device Usage</h3>
          <div className="space-y-6">
            {deviceUsage.map((device) => {
              const Icon = getDeviceIcon(device.device);
              return (
                <div key={device.device} className="flex items-center space-x-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{device.device}</span>
                      <span className="text-gray-400 text-sm">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Metrics */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-6">Recent Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Songs Added Today</span>
              <span className="text-white font-semibold">247</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">New Registrations</span>
              <span className="text-white font-semibold">1,235</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Premium Upgrades</span>
              <span className="text-white font-semibold">89</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Total Playlists</span>
              <span className="text-white font-semibold">12,457</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Active Artists</span>
              <span className="text-white font-semibold">5,678</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;