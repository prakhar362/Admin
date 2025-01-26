import React, { useState, useEffect } from 'react';
import { URL } from '@/url';

function EditGuestPopup({ guestId, onClose, token }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Fetch guest data when the popup is opened
  useEffect(() => {
    const fetchGuestDetails = async () => {
      try {
        const response = await fetch(`${URL}/api/guest/${guestId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch guest details');
        }

        const data = await response.json();
        setFormData(data.guest); // Set the fetched guest data to the form state
      } catch (error) {
        console.error('Error fetching guest details:', error);
      }
    };

    fetchGuestDetails();
  }, [guestId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/guest/edit/${guestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update guest');
      }

      const result = await response.json();
      console.log('Guest updated:', result);
      onClose(); // Close the popup after successful update
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Guest Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGuestPopup;
