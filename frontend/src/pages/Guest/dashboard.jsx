import React, { useEffect, useState } from 'react';
import GuestSidebar from '@/components/GuestSidebar';
import { URL } from '@/url';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function Guestadmindashboard() {
  const [guests, setGuests] = useState([]); // State to store guest data
  const [userData, setUserData] = useState(null); // State to store user data
  
    // Fetch user info from localStorage
    useEffect(() => {
      const userDataString = localStorage.getItem("userCredentials");
      //console.log(userDataString);
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData); // Store user data in state
      }
    }, []); // Empty dependency to only run once on component mount
  
    // Fetch hotels data from backend
    useEffect(() => {
      const fetchGuests = async () => {
        if (!userData || !userData.data || !userData.data.token) {
          console.error('No token found in userData');
          return;
        }
      try {
        // Extract hotelId from userData
        const hotelId = userData.user.hotelId; // Access hotelId from the user data
        console.log("HotelId: ",hotelId);
      
        const response = await fetch(`${URL}/api/guest/displayGuestDetails`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`, // Use token from context
          },
          body: JSON.stringify({ hotelId }), // Send hotelId in the body
        });
        console.log("Response Status:"); // Add this to check the status
        if (!response.ok) {
          throw new Error('Failed to fetch guest details');
        }
      
        const data = await response.json();
        console.log('Guest details:', data);
      } catch (error) {
        console.error('Error fetching guest details:', error);
      }
      
    };

    if (userData?.data?.token) {
      fetchGuests();
    }
  }, [userData?.data?.token]); // Dependency on token to re-fetch data when it changes

  const handleEdit = (guestId) => {
    console.log(`Edit guest with ID: ${guestId}`);
    // Add your edit logic here
  };

  const handleView = (guest) => {
    console.log('View guest details:', guest);
    window.print(); // Example action: printing guest details
  };

  return (
    <div className="flex h-screen mx-0 bg-gray-100">
      <GuestSidebar />
      <div className="flex-1 p-6 -ml-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="px-4 font-extrabold text-pretty text-2xl">Guest Admin Panel</h1>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow overflow-x-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-gray-900">Guest Details</h2>
          </div>

          <Table className="min-w-full">
            <TableHeader className="bg-gray-100 text-gray-900 font-extrabold">
              <TableRow>
                <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">Guest Name</TableHead>
                <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">Email</TableHead>
                <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">Phone</TableHead>
                <TableHead className="py-3 px-6 text-center text-gray-900 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {guests.length > 0 ? (
                guests.map((guest) => (
                  <TableRow key={guest._id} className="border-b">
                    <TableCell className="py-3 px-2 text-black font-medium">{guest.name}</TableCell>
                    <TableCell className="py-3 px-2 text-black font-medium">{guest.email}</TableCell>
                    <TableCell className="py-3 px-2 text-black font-medium">{guest.phone}</TableCell>
                    <TableCell className="py-3 px-2 text-center">
                      <button
                        className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        onClick={() => handleEdit(guest._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
                        onClick={() => handleView(guest)}
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="px-6 py-4 text-center text-gray-600">
                    No guests found.
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

export default Guestadmindashboard;
