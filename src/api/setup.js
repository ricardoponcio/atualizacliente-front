import useApi from "./useApi";

export const useApiSetup = () => {
  const api = useApi();

  return {
    setupNecessario: () => api.get("/setup/check-needed"),
  };
};
