import useApi from "../useApi";

export const useApiStorage = () => {
  const api = useApi();

  return {
    get: () => api.get("/storage/get"),
    create: (storageCreateData) =>
      api.put("/storage/create", storageCreateData),
    update: (id, storageUpdateData) =>
      api.patch(`/storage/update/${id}`, storageUpdateData),
    delete: (id) => api.delete(`/storage/delete/${id}`),
  };
};
