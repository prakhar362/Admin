import React, { useEffect, useState } from 'react';
import GuestSidebar from '@/components/GuestSidebar';
import { GrView } from "react-icons/gr";
import { URL } from '@/url';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditGuestPopup from '@/components/EditGuestPopup'; // Import the EditGuestPopup component
import GuestDetailsPopup from '@/components/GuestDetailsPopup'; // Assuming you have a GuestDetailsPopup component

function Guestadmindashboard() {
  const [guests, setGuests] = useState([]); 
  const [user, setUser] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null); 
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); 
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false); // Separate state for view popup

  useEffect(() => {
    const getUser = async () => {
      try {
        const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
        console.log("Data from local: ", userCredentials);
        if (userCredentials) {
          setUser(userCredentials);
        } else {
          console.log("No user data or token found in localStorage");
        }
      } catch (err) {
        console.error("Error parsing localStorage data:", err);
      }
    };
    getUser();
  }, []);
  
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const hotelId = user?.user?.hotelId;
        if (!hotelId) return;
        
        const response = await fetch(`${URL}/api/guest/displayGuestDetails`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, 
          },
          body: JSON.stringify({ hotelId }), 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch guest details');
        }
      
        const data = await response.json();
        setGuests(data.data);
      } catch (error) {
        console.error('Error fetching guest details:', error);
      }
    };
      
    if (user) fetchGuests();
  }, [user]);

  const handleEdit = (guestId) => {
    console.log(`Edit guest with ID: ${guestId}`);
    setSelectedGuest(guestId);
    setIsEditPopupOpen(true); // Open the edit popup
    setIsViewPopupOpen(false); // Close the view popup if open
  };

  const handleView = (guest) => {
    console.log('View guest details:', guest);
    setSelectedGuest(guest); 
    setIsViewPopupOpen(true); // Open the view popup
    setIsEditPopupOpen(false); // Close the edit popup if open
  };

  const fetchGuests = async () => {
    try {
      const hotelId = user.user.hotelId;
      
      const response = await fetch(`${URL}/api/guest/displayGuestDetails`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, 
        },
        body: JSON.stringify({ hotelId }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch guest details');
      }
  
      const data = await response.json();
      setGuests(data.data);
    } catch (error) {
      console.error('Error fetching guest details:', error);
    }
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setSelectedGuest(null);
    fetchGuests(); // Refetch guests when popup closes
  };

  const handleClosePopupView = () => {
    setIsViewPopupOpen(false);
    setSelectedGuest(null);
    
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
                        className="px-4 py-2 text-sm text-white "
                      >
                        <GrView className='font-black text-black h-5 w-6' onClick={() => handleView(guest)} />
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

      {/* Render the View Guest Details Popup */}
      {isViewPopupOpen && (
        <GuestDetailsPopup guest={selectedGuest} onClose={handleClosePopupView} />
      )}

      {/* Render the Edit Guest Popup */}
      {isEditPopupOpen && (
        <EditGuestPopup guestId={selectedGuest} token={user.token} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default Guestadmindashboard;
