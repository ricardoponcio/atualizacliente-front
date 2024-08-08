/* eslint-disable react/prop-types */
import React from "react";
import "./Loader.scss";

const Loader = ({ center = true }) => {
  return (
    <div className={`loader-wrapper ${center ? "center" : ""}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
