/* eslint-disable react/prop-types */
import SideBarMenu from "components/SideBarMenu";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ usuario, redirecionamento = "/login", children }) => {
  if (!usuario) {
    return <Navigate to={redirecionamento} replace />;
  }

  return children ? (
    children
  ) : (
    <SideBarMenu
      menus={[
        { titulo: "Início", url: "/" },
        { titulo: "Projetos", url: "/projetos" },
        { titulo: "Clientes", url: "/clientes" },
        { titulo: "Config. Email", url: "/configuracaoEmail" },
      ]}
    >
      <Outlet />
    </SideBarMenu>
  );
};
export default ProtectedRoute;
