/* eslint-disable react/prop-types */
import { useAuth } from "context/authContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBarMenu.scss";
import Button from "./form/Button";

const SideBarMenu = ({ children, menus }) => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

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
        {!collapsed && (
          <div className="sidebar-container">
            <ul className="sidebar-menus-list">
              {menus.map(({ titulo, url }, idx) => (
                <li className="sidebar-menus-item" key={`menu_${idx}`}>
                  <Link to={url}>{titulo}</Link>
                </li>
              ))}
            </ul>
            <Button onClick={logout} value={"Logout"} />
          </div>
        )}
      </div>
      <div className="main">{children}</div>
    </>
  );
};

export default SideBarMenu;
