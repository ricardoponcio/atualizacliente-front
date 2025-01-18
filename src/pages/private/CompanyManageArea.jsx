/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const CompanyManageArea = ({
  company,
  redirectToWhenNoCompany = "/company/manage",
  children,
}) => {
  if (!company) {
    return <Navigate to={redirectToWhenNoCompany} replace />;
  }

  return children ? children : <Layout />;
};
export default CompanyManageArea;
