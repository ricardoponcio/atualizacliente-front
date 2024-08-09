import useApi from "./useApi";

export const useApiProjetos = () => {
  const api = useApi();
  const apiWithoutInterceptor = useApi(false);

  const jsonAndFile = (body, files) => {
    const formData = new FormData();
    const bodyBlob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    formData.append("body", bodyBlob, "body.json");
    for (const file of files) {
      formData.append(
        "anexo",
        new Blob([file], {
          type: file.type || "application/octet-stream",
        }),
        file.name
      );
    }
    return formData;
  };

  return {
    listarProjetos: () => api.get("/projetos/listar"),
    detalharProjeto: (id) => api.get(`/projetos/${id}/detalhe`),
    criaProjeto: (projeto) => api.put("/projetos/criar", projeto),
    atualizaProjeto: (id, projeto) =>
      api.patch(`/projetos/atualizar/${id}`, projeto),
    removeProjeto: (id) => api.delete(`/projetos/remover/${id}`),
    listaAtualizacoes: (id) => api.get(`/projetos/listar/${id}/atualizacoes`),
    detalhaAtualizacao: (id) => api.get(`/projetos/atualizacao/${id}/detalhe`),
    buscaAtualizacaoToken: (token, senhaCliente) =>
      apiWithoutInterceptor.post(
        `/projetos/listar/${token}/atualizacoes/token`,
        {
          senhaCliente,
        }
      ),
    emitirAtualizacao: (projetoId, atualizacao) =>
      api.put(`/projetos/${projetoId}/atualizacoes/criar`, atualizacao),
    emitirAtualizacaoComAnexos: (projetoId, atualizacao, anexos) =>
      api.put(
        `/projetos/${projetoId}/atualizacoes/criar/com-anexos`,
        jsonAndFile(atualizacao, anexos)
      ),
    baixarAnexo: (projetoId, atualizacaoId, nomeArquivo) =>
      api.get(
        `/projetos/${projetoId}/atualizacao/${atualizacaoId}/baixar/${nomeArquivo}`
      ),
    baixarAnexoToken: (projetoId, atualizacaoId, nomeArquivo, token) =>
      apiWithoutInterceptor.get(
        `/projetos/${projetoId}/atualizacao/${atualizacaoId}/baixar/${nomeArquivo}/token/${token}`
      ),
  };
};
