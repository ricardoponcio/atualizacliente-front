/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import React, { createContext, useContext } from "react";
import { useApiCompany } from "../api";
import { useAuth } from "./authContext";

const ControlContext = createContext();

export const ControlProvider = ({ children }) => {
  const { setCompanyData } = useAuth();
  const { manage: manageRequest } = useApiCompany();

  const managedCompany = async (company) => {
    await manageRequest(company.id);
    setCompanyData(company);
    Cookies.set("company", JSON.stringify(company));
  };

  const unmanageCompany = () => {
    setCompanyData(null);
    Cookies.remove("company");
  };

  return (
    <ControlContext.Provider value={{ managedCompany, unmanageCompany }}>
      {children}
    </ControlContext.Provider>
  );
};

export const useControlledApp = () => {
  return useContext(ControlContext);
};
