import useApi from "../useApi";

export const useApiCompany = () => {
  const api = useApi();

  return {
    list: () => api.get("/company/list"),
    create: (companyCreateData) =>
      api.put("/company/create", companyCreateData),
    update: (id, companyUpdateData) =>
      api.patch(`/company/update/${id}`, companyUpdateData),
    delete: (id) => api.delete(`/company/delete/${id}`),
    manage: (id) => api.post(`/company/start-manage/${id}`),
    unmanage: () => api.post("/company/abandon-manage"),
  };
};
