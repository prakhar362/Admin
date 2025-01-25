import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { URL } from "@/url"; // Your API URL

const Form = () => {
  const [name, setName] = useState(""); // Hotel name
  const [address, setAddress] = useState(""); // Hotel address
  const [logo, setLogo] = useState(null); // Hotel logo (image)
  const [website, setWebsite] = useState(""); // Hotel website URL
  const [userData, setUserData] = useState(null); // State to store user data

  // Fetch user info from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("userCredentials");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData); // Store user data in state
    }
  }, [setUserData]);

  // Upload image to backend
  const uploadImage = async () => {
    if (!logo) return null;
    const formData = new FormData();
    formData.append("file", logo);
    formData.append("img", Date.now() + logo.name); // Unique image name

    try {
      const res = await axios.post(`${URL}/api/upload`, formData);
      return res.data; // Image upload response
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload logo first
    const uploadedLogo = await uploadImage();
    if (!uploadedLogo) {
      alert("Failed to upload logo.");
      return;
    }
    console.log("Filepath: ",uploadedLogo.filePath);

    const hotelData = {
      name,
      address,
      logo: uploadedLogo.filePath, // Use uploaded logo URL or file path
      website,
    };

    try {
      const res = await fetch(`${URL}/api/main/addHotel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          "Authorization": `Bearer ${userData.token}`, // Include the authentication token
        },
        body: JSON.stringify(hotelData),
      });

      if (!res.ok) {
        const error = await res.json(); // Parse error response
        throw new Error(error.message || "Failed to create hotel post.");
      }

      const data = await res.json(); // Parse success response
      alert("Hotel posted successfully!");
      console.log("Saved hotel post:", data);

      // Reset form
      setName("");
      setAddress("");
      setLogo(null);
      setWebsite("");
    } catch (err) {
      console.error("Failed to create hotel:", err.message);
      alert(`Failed to create hotel: ${err.message}`);
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
          <h1 className="text-2xl font-bold text-gray-700">Create a Hotel Post</h1>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the hotel name"
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
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the hotel address"
              required
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Hotel Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={(e) => setLogo(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
              required
            />
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
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the hotel website URL"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Create Hotel Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
