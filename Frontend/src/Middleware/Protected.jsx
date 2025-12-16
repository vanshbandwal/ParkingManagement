// Protected.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/dashboard",
          { withCredentials: true }
        );


        if (res.data.success) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (auth === false) return <Navigate to="/login" replace />;

  if (auth === null)
    return (
      <div className="text-white text-center mt-10">Checking authentication...</div>
    );

  return <>{children}</>;
};

export default Protected;
