/* eslint-disable react/prop-types */
import React from "react";
import "./FlexList.scss";

const FlexList = ({ children, customTitle, labelValuePairs = false, rowDirection = false }) => {
  return (
    <div
      className={`my-custom-flex-list ${
        labelValuePairs ? "label-value-pairs" : ""
      } ${rowDirection ? "my-custom-flex-list-row" : ""}`}
    >
      {customTitle && <h1>{customTitle}</h1>}
      {children}
    </div>
  );
};

export default FlexList;
