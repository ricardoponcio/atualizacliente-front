import useApi from "../useApi";

export const useApiToken = () => {
  const api = useApi();

  return {
    list: () => api.get("/token/list"),
    create: (tokenCreateData) => api.put("/token/create", tokenCreateData),
    update: (id, tokenUpdateData) =>
      api.patch(`/token/update/${id}`, tokenUpdateData),
    delete: (id) => api.delete(`/token/delete/${id}`),
  };
};
