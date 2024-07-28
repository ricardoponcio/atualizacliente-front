import useApi from "./useApi";

export const useApiAuth = () => {
  const api = useApi(false);

  return {
    login: (usuario, senha) =>
      api.post("/auth/login", { email: usuario, senha }),
    logout: () => api.post("/auth/logout"),
  };
};
