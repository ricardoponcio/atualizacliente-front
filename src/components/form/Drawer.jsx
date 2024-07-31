/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import "./Drawer.scss";

const Drawer = ({
  children,
  customTitle = "",
  isVisible = false,
  onClose = () => {},
}) => {
  return (
    isVisible && (
      <div className="drawer-wrapper">
        <div className="drawer-overlay" onClick={onClose}></div>
        <div className="drawer-container right">
          <div className="drawer-container-go-back">
            <Button value={"Fechar"} onClick={onClose} />
          </div>
          <div className="drawer-container-content">
            {customTitle && <h1>{customTitle}</h1>}
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Drawer;