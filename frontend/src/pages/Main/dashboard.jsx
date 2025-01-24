import React from 'react';
import Sidebar from '@/components/sidebar';

function Mainadmindashboard() {
  return (
    <div className="flex h-screen mx-0 bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 -ml-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Add New
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Cards */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="mt-2 text-2xl font-bold text-indigo-600">1,245</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="mt-2 text-2xl font-bold text-green-600">$34,120</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Active Projects</h2>
            <p className="mt-2 text-2xl font-bold text-orange-600">12</p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Recent Activities</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 font-medium text-gray-600">Date</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Activity</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-4">2025-01-23</td>
                  <td className="px-6 py-4">User signed up</td>
                  <td className="px-6 py-4 text-green-600">Completed</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4">2025-01-22</td>
                  <td className="px-6 py-4">Payment processed</td>
                  <td className="px-6 py-4 text-green-600">Completed</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4">2025-01-21</td>
                  <td className="px-6 py-4">New project added</td>
                  <td className="px-6 py-4 text-yellow-600">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainadmindashboard;
