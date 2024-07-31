/* eslint-disable react/prop-types */
import React from "react";
import "./Loader.scss";

const Loader = ({ center = false }) => {
  return center ? (
    <div className="center-custom-loader">
      <div className="my-custom-loader"></div>
    </div>
  ) : (
    <div className="my-custom-loader"></div>
  );
};

export default Loader;
