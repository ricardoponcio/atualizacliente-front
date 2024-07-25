import api from "./api";

export const listarClientes = () => {
  return api.get("/clientes/listar");
};

export const criaCliente = (cliente) => {
  return api.put("/clientes/criar", cliente);
};

export const atualizaCliente = (id, cliente) => {
  return api.patch(`/clientes/atualizar/${id}`, cliente);
};

export const removeCliente = (id) => {
  return api.delete(`/clientes/remover/${id}`);
};
