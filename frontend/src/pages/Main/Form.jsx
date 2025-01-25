import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { URL } from "@/url";

function Form() {
  const [formData, setFormData] = useState({
    hotelName: "",
    address: "",
    logo: null, // For file upload
    website: "", // For website URL
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("hotelName", formData.hotelName);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("logo", formData.logo); // The file
    formDataToSend.append("website", formData.website);

    try {
      const response = await fetch(`${URL}/api/main/addHotel`, {
        method: "POST",
        body: formDataToSend,
        headers: {
            "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message || "Hotel addition failed");
        alert("Failed to add hotel. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("Hotel added successfully:", data);
      alert("Hotel added successfully!");

      // Optionally, you can reset the form after submission
      setFormData({
        hotelName: "",
        address: "",
        logo: null,
        website: "",
      });
    } catch (err) {
      console.error("Error during form submission:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen mx-0 bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 -ml-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Add a New Hotel</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg shadow-md space-y-6"
        >
          {/* Hotel Name */}
          <div>
            <label
              htmlFor="hotelName"
              className="block text-sm font-medium text-gray-700"
            >
              Hotel Name
            </label>
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the hotel name"
              required
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the hotel address"
              rows={3}
              required
            ></textarea>
          </div>

          {/* Website URL */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the hotel website URL"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
