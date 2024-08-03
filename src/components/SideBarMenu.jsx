/* eslint-disable react/prop-types */
import { useAuth } from "context/authContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBarMenu.scss";
import Button from "./form/Button";

const SideBarMenu = ({ children, menus }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const currentPath = window.location.pathname;

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div
          className="hamburguer button-collapse"
          onClick={() => setCollapsed((collapsed) => !collapsed)}
        >
          <span className="hamburguer-item"></span>
          <span className="hamburguer-item"></span>
          <span className="hamburguer-item"></span>
        </div>
        <div className="sidebar-container">
          <div className="greeting">
            <span>Olá</span>
            <span>{user.nome}</span>
          </div>
          <ul className="sidebar-menus-list">
            {menus.map(({ titulo, url }, idx) => (
              <Button
                activeState={url === currentPath}
                className="sidebar-menus-item"
                key={`menu_${idx}`}
                onClick={() => navigate(url)}
                value={titulo}
              />
            ))}
          </ul>
          <Button onClick={logout} value={"Logout"} />
        </div>
      </div>
      <div className="main">{children}</div>
    </>
  );
};

export default SideBarMenu;
