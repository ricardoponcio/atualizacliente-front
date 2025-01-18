import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { useAuth } from "./context/authContext";

import moment from "moment-timezone";
import ManageCompanyPage from "./pages/private/Company/ManageCompanyPage";
import CompanyManageArea from "./pages/private/CompanyManageArea";
import HomePage from "./pages/private/Home/HomePage";
import ProtectedRoute from "./pages/private/ProtectedRoute";
import StoragePage from "./pages/private/Storage/StoragePage";
import LoginPage from "./pages/public/Login/LoginPage";

const App = () => {
  const location = useLocation();
  const { user, company } = useAuth();

  moment.locale("pt-br");
  moment.tz("America/Sao_Paulo");

  useEffect(() => {
    localStorage.setItem(
      "current_page",
      `${location.pathname}${location.search}`
    );
    console.log(location);
  }, [location]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/company/manage" element={<ManageCompanyPage />} />
          <Route element={<CompanyManageArea company={company} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/company" element={<HomePage />} />
            <Route path="/cloth-resource" element={<HomePage />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route path="/token" element={<HomePage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
