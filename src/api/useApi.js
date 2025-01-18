import axios from "axios";
import { useAuth } from "../context/authContext";

const createApi = () => {
  return axios.create({
    // baseURL: "https://api.clothai.poncio.dev",
    baseURL: "http://localhost:4049/api",
    timeout: 5000,
    withCredentials: true,
  });
};

const useApi = (withInterceptor = true) => {
  if (!withInterceptor) return createApi();

  const { logout } = useAuth();
  const apiWithInterceptors = createApi();
  apiWithInterceptors.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error.response?.status) {
        logout();
      } else {
        throw error;
      }
    }
  );
  return apiWithInterceptors;
};

export default useApi;
