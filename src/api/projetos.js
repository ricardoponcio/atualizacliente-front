import useApi from "./useApi";

export const useApiProjetos = () => {
  const api = useApi();

  return {
    listarProjetos: () => api.get("/projetos/listar"),
    criaProjeto: (projeto) => api.put("/projetos/criar", projeto),
    atualizaProjeto: (id, projeto) =>
      api.patch(`/projetos/atualizar/${id}`, projeto),
    removeProjeto: (id) => api.delete(`/projetos/remover/${id}`),
  };
};