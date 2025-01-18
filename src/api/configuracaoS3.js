import useApi from "./useApi";

export const useApiConfiguracaoS3 = () => {
  const api = useApi();

  return {
    listarConfiguracoes: () => api.get("/configuracao-s3/listar"),
    criaConfiguracao: (configuracao) =>
      api.put("/configuracao-s3/criar", configuracao),
    atualizaConfiguracao: (id, configuracao) =>
      api.patch(`/configuracao-s3/atualizar/${id}`, configuracao),
    removeConfiguracao: (id) => api.delete(`/configuracao-s3/remover/${id}`),
  };
};
