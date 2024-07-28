/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApiAuth } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { login: loginRequest, logout: logoutRequest } = useApiAuth();

  useEffect(() => {
    const loggedUser = Cookies.get("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const login = async (usuario, senha) => {
    const { data: usuarioLogado } = await loginRequest(usuario, senha);
    setUser(usuarioLogado);
    Cookies.set("user", JSON.stringify(usuarioLogado));
  };

  const logout = async () => {
    await logoutRequest();
    setUser(undefined);
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
