import axios from "axios";
import { useAuth } from "../context/authContext";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  withCredentials: true,
});

const useApi = (withInterceptor = true) => {
  if (!withInterceptor) return api;
  
  const { logout } = useAuth();
  const apiWithInterceptors = api;
  apiWithInterceptors.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        logout();
      } else {
        throw error;
      }
    }
  );
  return apiWithInterceptors;
};

export default useApi;
