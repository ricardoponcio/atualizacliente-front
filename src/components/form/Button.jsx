/* eslint-disable react/prop-types */
import React from "react";
import "./Button.scss";

const Button = ({ type = "button", value, onClick = () => {} }) => {
  return (
    <button type={type} className="my-custom-button" onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
