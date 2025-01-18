import useApi from "./useApi";

export const useApiUsuario = () => {
  const api = useApi();

  return {
    cadastraUsuario: (usuario) => api.put("/usuario/cadastro", usuario),
  };
};
