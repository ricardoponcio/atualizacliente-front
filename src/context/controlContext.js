/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import React, { createContext, useContext } from "react";
import { useApiCompany } from "../api";
import { useAuth } from "./authContext";

const ControlContext = createContext();

export const ControlProvider = ({ children }) => {
  const { setCompanyData } = useAuth();
  const { manage: manageRequest } = useApiCompany();

  const managedCompany = async (id) => {
    const { data } = await manageRequest(id);
    setCompanyData(data);
    Cookies.set("company", JSON.stringify(data));
  };

  return (
    <ControlContext.Provider value={{ managedCompany }}>
      {children}
    </ControlContext.Provider>
  );
};

export const useControlledApp = () => {
  return useContext(ControlContext);
};
