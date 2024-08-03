/* eslint-disable react/prop-types */
import React from "react";
import "./Button.scss";

const Button = ({
  type = "button",
  value,
  onClick = () => {},
  activeState,
  disabled
}) => {
  return (
    <button
      type={type}
      className={`my-custom-button ${activeState ? "active-state" : ""}`}
      onClick={onClick} disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
