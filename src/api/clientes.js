import useApi from "./useApi";

export const useApiCliente = () => {
  const api = useApi();

  return {
    listarClientes: () => api.get("/clientes/listar"),
    criaCliente: (cliente) => api.put("/clientes/criar", cliente),
    atualizaCliente: (id, cliente) =>
      api.patch(`/clientes/atualizar/${id}`, cliente),
    removeCliente: (id) => api.delete(`/clientes/remover/${id}`),
  };
};