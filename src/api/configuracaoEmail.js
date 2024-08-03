import useApi from "./useApi";

export const useApiConfiguracaoEmail = () => {
  const api = useApi();

  return {
    listarConfiguracoes: () => api.get("/configuracao-email/listar"),
    criaConfiguracao: (configuracao) =>
      api.put("/configuracao-email/criar", configuracao),
    atualizaConfiguracao: (id, configuracao) =>
      api.patch(`/configuracao-email/atualizar/${id}`, configuracao),
    removeConfiguracao: (id) => api.delete(`/configuracao-email/remover/${id}`),
  };
};
