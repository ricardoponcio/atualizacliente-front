import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/authContext";

import ConsultaAtualizacao from "./pages/ConsultaAtualizacao";
import ClientesPage from "./pages/private/ClientesPage";
import HomePage from "./pages/private/HomePage";
import ProjetosPage from "./pages/private/ProjetosPage";
import ProtectedRoute from "./pages/private/ProtectedRoute";
import LoginPage from "./pages/public/LoginPage";
import ValidaCliente from "./pages/ValidaCliente";

const App = () => {
  const { user: usuario } = useAuth();

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
