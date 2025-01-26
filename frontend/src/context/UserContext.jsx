import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
        const token = localStorage.getItem("token");

        if (userCredentials && token) {
          setUser(userCredentials);
          //console.log("User context data acquired:", userCredentials);
          //console.log("the token: ",userCredentials.token)
        } else {
          console.log("No user data or token found in localStorage");
        }
      } catch (err) {
        console.error("Error parsing localStorage data:", err);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
