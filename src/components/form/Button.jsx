/* eslint-disable react/prop-types */
import React from "react";
import "./Button.scss";

const Button = ({ value, onClick = () => {} }) => {
  return (
    <button className="my-custom-button" onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
