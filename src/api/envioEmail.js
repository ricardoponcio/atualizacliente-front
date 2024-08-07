import useApi from "./useApi";

export const useApiEnvioEmail = () => {
  const api = useApi();

  return {
    ultimosEmails: () => api.get("/envio-email/ultimos"),
  };
};
