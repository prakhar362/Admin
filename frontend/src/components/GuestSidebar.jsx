import React, { useContext }from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../context/UserContext"; 
import { useNavigate } from 'react-router-dom';
import { URL } from '@/url';

function GuestSidebar() {
  const { setUser } = useContext(UserContext); // Access setUser
  const navigate = useNavigate();
  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${URL}/api/guest/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null); // Clear user state
        localStorage.removeItem("userCredentials"); // Clear local storage
        navigate("/"); // Redirect to landing page
        console.log("Logout successful");
      } else {
        console.error("Failed to logout:", await response.text());
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  
  return (
    <div className="flex">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
          <img src="https://cdn-icons-png.flaticon.com/512/1668/1668966.png" alt=""  className="max-h-9 min-w-10 "/>
          <h3 className="px-4 font-extrabold text-pretty text-2xl">Hotel Finder</h3>
          </div>

          <div className="px-4 mt-8">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                placeholder="Search here"
              />
            </div>
          </div>

          <div className="px-4 mt-6">
            <hr className="border-gray-200" />
          </div>

          <div className="flex flex-col flex-1 px-3 mt-6">
            <div className="space-y-4">
              <nav className="flex-1 space-y-2">
                <NavLink
                  to="/guest-admin/dashboard"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group ${
                      isActive ? 'text-white bg-indigo-600' : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                    }`
                  }
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </nav>


              <hr className="border-gray-200" />

              <nav className="flex-1 space-y-2">
                <NavLink
                  
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group ${
                      isActive ? 'text-white bg-indigo-600' : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                    }`
                  }
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </NavLink>

                <NavLink
  to="#"
  onClick={handleLogout}
  className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 rounded-lg hover:text-white hover:bg-red-600 group"
>
  <svg
    className="flex-shrink-0 w-5 h-5 mr-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7"
    />
  </svg>
  Logout
</NavLink>

              </nav>
            </div>

            <div className="pb-4 mt-20 flex items-center">
              <img
                className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
                alt="Admin Avatar"
              />
              Guest Admin
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GuestSidebar;
