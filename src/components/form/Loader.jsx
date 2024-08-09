/* eslint-disable react/prop-types */
import React from "react";
import "./Loader.scss";

const Loader = ({ center = true, minified = false }) => {
  return (
    <div
      className={`loader-wrapper ${center ? "center" : ""} ${
        minified ? "minified" : ""
      }`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
