import React from "react";
import PropTypes from "prop-types";

const GuestDetailsPopup = ({ guest, onClose }) => {
  if (!guest) return null; // Prevent rendering if no guest is passed

  const onPrint = () => {
    window.print(); // Example action: printing guest details
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-4">Guest Details</h2>
        
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-center font-semibold text-gray-700">Field</th>
              <th className="py-2 px-4 text-center font-semibold text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-700">Name</td>
              <td className="py-2 px-4">{guest.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-700">Mobile Number</td>
              <td className="py-2 px-4">{guest.phone}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-700">Address</td>
              <td className="py-2 px-4">{guest.address}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-700">Purpose of Visit</td>
              <td className="py-2 px-4">{guest.purposeOfVisit}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-700">Stay Dates</td>
              <td className="py-2 px-4">{guest.stayFrom} to {guest.stayTo}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-700">Email</td>
              <td className="py-2 px-4">{guest.email}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 text-gray-700">ID Proof Number</td>
              <td className="py-2 px-4">{guest.idProofNumber}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onPrint}
            className="bg-blue-500 ml-3 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type-checking
GuestDetailsPopup.propTypes = {
  guest: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GuestDetailsPopup;
