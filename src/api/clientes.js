import useApi from "./useApi";

export const useApiCliente = () => {
  const api = useApi();
  const apiWithoutInterceptor = useApi(false);

  return {
    listarClientes: () => api.get("/clientes/listar"),
    criaCliente: (cliente) => api.put("/clientes/criar", cliente),
    atualizaCliente: (id, cliente) =>
      api.patch(`/clientes/atualizar/${id}`, cliente),
    removeCliente: (id) => api.delete(`/clientes/remover/${id}`),
    validarCliente: (token, senhaCliente) =>
      apiWithoutInterceptor.post(`/clientes/validar/${token}`, {
        senhaCliente,
      }),
  };
};
