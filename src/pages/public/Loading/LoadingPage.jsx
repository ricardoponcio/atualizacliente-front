/* eslint-disable react/prop-types */
import Loader from "components/form/Loader";
import React from "react";
import "./LoadingPage.scss";

const LoadingPage = () => {
  return (
    <div className="loading-page-wrapper">
      <Loader />
    </div>
  );
};

export default LoadingPage;
