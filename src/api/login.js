import api from "./api";

export const login = (usuario, senha) => {
  return api.post("/auth/login", {
    email: usuario,
    senha,
  });
};

export const logout = () => {
  return api.post("/auth/logout");
};
