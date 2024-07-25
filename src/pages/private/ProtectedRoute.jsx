/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ usuario, redirecionamento = "/login", children }) => {
  if (!usuario) {
    return <Navigate to={redirecionamento} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
