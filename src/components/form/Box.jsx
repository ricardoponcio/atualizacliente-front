/* eslint-disable react/prop-types */
import React from "react";
import "./Box.scss";

const Box = ({ children, fixedWidth, flexRow = false }) => {
  return (
    <div style={{ width: fixedWidth || "auto" }} className={`my-custom-box ${flexRow ? 'my-custom-box-flex-row' : ''}`}>
      {children}
    </div>
  );
};

export default Box;
