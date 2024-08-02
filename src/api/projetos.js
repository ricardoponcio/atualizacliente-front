import useApi from "./useApi";

export const useApiProjetos = () => {
  const api = useApi();
  const apiWithoutInterceptor = useApi(false);

  return {
    listarProjetos: () => api.get("/projetos/listar"),
    detalharProjeto: (id) => api.get(`/projetos/${id}/detalhe`),
    criaProjeto: (projeto) => api.put("/projetos/criar", projeto),
    atualizaProjeto: (id, projeto) =>
      api.patch(`/projetos/atualizar/${id}`, projeto),
    removeProjeto: (id) => api.delete(`/projetos/remover/${id}`),
    listaAtualizacoes: (id) => api.get(`/projetos/listar/${id}/atualizacoes`),
    buscaAtualizacaoToken: (token, senhaCliente) =>
      apiWithoutInterceptor.post(
        `/projetos/listar/${token}/atualizacoes/token`,
        {
          senhaCliente,
        }
      ),
    emitirAtualizacao: (projetoId, atualizacao) =>
      api.put(`/projetos/${projetoId}/atualizacoes/criar`, atualizacao),
  };
};
