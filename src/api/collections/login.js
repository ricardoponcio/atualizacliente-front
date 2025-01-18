import useApi from "../useApi";

export const useApiAuth = () => {
  const api = useApi(false);

  return {
    login: ({ email, password }) => 
      api.post("/auth/login", { email, password }),
    logout: () => api.post("/auth/logout"),
    register: ({ name, email, password, confirmPassword }) =>
      api.post("/auth/register", { name, email, password, confirmPassword })
  };
};
