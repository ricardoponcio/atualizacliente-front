/* eslint-disable react/prop-types */
import React from "react";
import "./FlexList.scss";

const FlexList = ({ children, customTitle, labelValuePairs = false }) => {
  return (
    <div
      className={`my-custom-flex-list ${
        labelValuePairs ? "label-value-pairs" : ""
      }`}
    >
      {customTitle && <h1>{customTitle}</h1>}
      {children}
    </div>
  );
};

export default FlexList;
