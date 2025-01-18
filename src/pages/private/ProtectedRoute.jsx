/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  user,
  redirectToWhenNoUser = "/login",
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectToWhenNoUser} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
