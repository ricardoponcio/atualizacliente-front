import api from "./api";

export const listarProjetos = () => {
  return api.get("/projetos/listar");
};

export const criaProjeto = (projeto) => {
  return api.put("/projetos/criar", projeto);
};

export const atualizaProjeto = (id, projeto) => {
  return api.patch(`/projetos/atualizar/${id}`, projeto);
};

export const removeProjeto = (id) => {
  return api.delete(`/projetos/remover/${id}`);
};
