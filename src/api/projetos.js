import api from "./api";

export const listarProjetos = () => {
  return api.get("/projetos/listar");
};
