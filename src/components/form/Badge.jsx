/* eslint-disable react/prop-types */
import React from "react";
import "./Badge.scss";

const Badge = ({ value = "Inserir", color, clickable, onClick = () => {} }) => {
  return (
    <div>
      <div
        className={`my-custom-badge ${clickable ? "clickable" : ""}`}
        style={{ borderColor: color }}
        onClick={(event) => (clickable ? onClick(event) : (() => {})())}
      >
        <span style={{ color }}>{value}</span>
      </div>
    </div>
  );
};

export default Badge;
