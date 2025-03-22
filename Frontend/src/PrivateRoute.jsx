import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const username = location.state?.username; // Check if the username is passed in state

  return username ? children : <Navigate to="/" />;
};

export default PrivateRoute;
