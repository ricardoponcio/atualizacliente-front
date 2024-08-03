/* eslint-disable react/prop-types */
import React from "react";
import "./Box.scss";

const Box = ({ children, fixedWidth }) => {
  return (
    <div style={{ width: fixedWidth || "auto" }} className="my-custom-box">
      {children}
    </div>
  );
};

export default Box;
