import api from "./api";

export const listarClientes = () => {
  return api.get("/clientes/listar");
};
