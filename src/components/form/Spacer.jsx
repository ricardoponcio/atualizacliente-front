/* eslint-disable react/prop-types */
import React from "react";

const Spacer = ({ height = 0, width = 0 }) => {
  return <div style={{ width: `${width}px`, height: `${height}px` }}></div>;
};

export default Spacer;
