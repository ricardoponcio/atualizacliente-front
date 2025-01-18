/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiAuth } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [company, setCompany] = useState();
  const refEnableOldPageNavigate = useRef(false);
  const { login: loginRequest, logout: logoutRequest } = useApiAuth();

  useEffect(() => {
    const loggedUser = Cookies.get("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));

    const managedCompany = Cookies.get("company");
    if (managedCompany) setCompany(JSON.parse(managedCompany));

    const olderPage = localStorage.getItem("current_page");
    if (olderPage && refEnableOldPageNavigate.current) navigate(olderPage);
  }, []);

  const login = async (email, password) => {
    const { data } = await loginRequest({ email, password });
    setUser(data);
    Cookies.set("user", JSON.stringify(data));
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      // We don't care about 401 errors in logout
    }
    setUser(undefined);
    Cookies.remove("user");
  };

  const setCompanyData = (company) => setCompany(company);

  return (
    <AuthContext.Provider value={{ user, company, login, logout, setCompanyData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
