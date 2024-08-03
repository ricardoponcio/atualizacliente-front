import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { useAuth } from "./context/authContext";

import moment from "moment-timezone";
import ClientesPage from "./pages/private/Clientes/ClientesPage";
import ConfiguracaoEmailPage from "./pages/private/ConfiguracaoEmail/ConfiguracaoEmailPage";
import HomePage from "./pages/private/Home/HomePage";
import NovaAtualizacaoPage from "./pages/private/Projeto/NovaAtualizacaoPage";
import ProjetoAtualizacaoDetalhePage from "./pages/private/Projeto/ProjetoAtualizacaoDetalhePage";
import ProjetoAtualizacoesPage from "./pages/private/Projeto/ProjetoAtualizacoesPage";
import ProjetosPage from "./pages/private/Projeto/ProjetosPage";
import ProtectedRoute from "./pages/private/ProtectedRoute";
import ConsultaAtualizacao from "./pages/public/ConsultaAtualizacao/ConsultaAtualizacaoPage";
import LoginPage from "./pages/public/Login/LoginPage";
import ValidaCliente from "./pages/public/ValidaCliente/ValidaClientePage";

const App = () => {
  const location = useLocation();
  const { user: usuario } = useAuth();
  moment.locale("pt-br");
  moment.tz("America/Sao_Paulo");

  useEffect(() => {
    localStorage.setItem('current_page', `${location.pathname}${location.search}`);
  }, [location]);

  return (
    <Routes>
      <Route element={<ProtectedRoute usuario={usuario} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos" element={<ProjetosPage />} />
        <Route
          path="/projetos/atualizacoes"
          element={<ProjetoAtualizacoesPage />}
        />
        <Route
          path="/projetos/atualizacoes/nova"
          element={<NovaAtualizacaoPage />}
        />
        <Route
          path="/projetos/atualizacao/detalhe"
          element={<ProjetoAtualizacaoDetalhePage />}
        />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/configuracaoEmail" element={<ConfiguracaoEmailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/atualizacao" element={<ConsultaAtualizacao />} />
      <Route path="/validar" element={<ValidaCliente />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
