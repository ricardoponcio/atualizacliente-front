/* eslint-disable react/prop-types */
import { useAuth } from "context/authContext";
import { useControlledApp } from "context/controlContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBarMenu.scss";
import Button from "./form/Button";

const SideBarMenu = ({ children, menus }) => {
  const navigate = useNavigate();
  const { unmanageCompany } = useControlledApp();
  const { user, company, logout } = useAuth();
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
            <span>Hello</span>
            <span>{user.name}</span>
          </div>
          <div className="control">
            <span>Managing {company.name}</span>
            <Button value={"Change"} onClick={() => unmanageCompany()} />
          </div>
          <hr />
          <ul className="sidebar-menus-list">
            {menus.map(({ title, url }, idx) => (
              <Button
                activeState={url === currentPath}
                className="sidebar-menus-item"
                key={`menu_${idx}`}
                onClick={() => navigate(url)}
                value={title}
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
