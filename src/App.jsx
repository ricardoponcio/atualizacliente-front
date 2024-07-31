import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAuth } from "./context/authContext";

import moment from "moment";
import ClientesPage from "./pages/private/Clientes/ClientesPage";
import HomePage from "./pages/private/Home/HomePage";
import ProjetosPage from "./pages/private/Projeto/ProjetosPage";
import ProtectedRoute from "./pages/private/ProtectedRoute";
import ConsultaAtualizacao from "./pages/public/ConsultaAtualizacao/ConsultaAtualizacaoPage";
import LoginPage from "./pages/public/Login/LoginPage";
import ValidaCliente from "./pages/public/ValidaCliente/ValidaClientePage";

const App = () => {
  const { user: usuario } = useAuth();
  moment.locale("pt-br");

  return (
    <Routes>
      <Route element={<ProtectedRoute usuario={usuario} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos" element={<ProjetosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/atualizacao" element={<ConsultaAtualizacao />} />
      <Route path="/validar" element={<ValidaCliente />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
