import useApi from "../useApi";

export const useApiClothResource = () => {
  const api = useApi();

  return {
    list: () => api.get("/cloth-resource/list"),
    create: (clothResourceCreateData) =>
      api.put("/cloth-resource/create", clothResourceCreateData),
    update: (id, clothResourceUpdateData) =>
      api.patch(`/cloth-resource/update/${id}`, clothResourceUpdateData),
    delete: (id) => api.delete(`/cloth-resource/delete/${id}`),
  };
};
