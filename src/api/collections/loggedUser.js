import useApi from "../useApi";

export const useApiLoggedUser = () => {
  const api = useApi();

  return {
    me: () => api.get("/auth/me"),
  };
};
