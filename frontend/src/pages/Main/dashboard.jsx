import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import { URL } from '@/url';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function Mainadmindashboard() {
  const [hotels, setHotels] = useState([]); // Ensure hotels is always initialized to an empty array
  const [userData, setUserData] = useState(null); // State to store user data

  // Fetch user info from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("userCredentials");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData); // Store user data in state
    }
  }, []); // Empty dependency to only run once on component mount

  // Fetch hotels data from backend
  useEffect(() => {
    const fetchHotels = async () => {
      if (!userData || !userData.data || !userData.data.token) {
        console.error('No token found in userData');
        return;
      }

      try {
        const response = await fetch(`${URL}/api/main/displayHotel`, {
          method: 'GET', // Use GET request to fetch the data
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.data.token}`, // Use the token from context
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        setHotels(data.data || []); // Ensure we are setting the correct data structure
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    // Call fetchHotels if userData and token are available
    if (userData?.data?.token) {
      fetchHotels();
    } else {
      console.error('No token found or invalid user data');
    }
  }, [userData?.data?.token]); // Dependency on token to re-fetch data when it changes

  return (
    <div className="flex h-screen mx-0 bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 -ml-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="px-4 font-extrabold text-pretty text-2xl">Dashboard</h1>
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

        {/* Hotels Table */}
<div className="mt-8 bg-white rounded-lg shadow overflow-x-auto">
  <div className="p-4 border-b">
    <h2 className="text-lg font-bold text-gray-900">Registered Hotels</h2>
  </div>

  <Table className="min-w-full">
    {/* Table Header */}
    <TableHeader className="bg-gray-100 text-gray-900 font-extrabold ml-5">
      <TableRow>
        <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">Hotel Name</TableHead>
        <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">Address</TableHead>
        <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">Logo</TableHead>
        <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">QR</TableHead>
      </TableRow>
    </TableHeader>

    {/* Table Body */}
    <TableBody>
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <TableRow key={hotel.id} className="border-b">
            <TableCell className="py-3 px-2 text-black font-medium">{hotel.name}</TableCell>
            <TableCell className="py-3 px-2 text-black font-medium">{hotel.address}</TableCell>
            <TableCell className="py-3 px-2">
              <img
                src={hotel.logo.startsWith("https") ? hotel.logo : `${URL}${hotel.logo}`}
                alt={`${hotel.name} logo`}
                className="w-12 h-12 object-cover rounded-full mx-auto"
              />
            </TableCell>
            <TableCell className="py-3 px-4 text-center">
  {/* Display QR Code as Image */}
  {hotel.qrCode ? (
    <img
      src={hotel.qrCode}  // Directly using the Base64 string as the src
      alt="QR Code"
      className="w-16 h-16 object-cover rounded-lg mx-auto"
    />
  ) : (
    <span className="text-gray-600">No QR Code</span>
  )}
</TableCell>

          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan="4" className="px-6 py-4 text-center text-gray-600">
            No hotels found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>

      </div>
    </div>
  );
}

export default Mainadmindashboard;
