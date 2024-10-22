/* eslint-disable react/prop-types */
import React from "react";
import "./Input.scss";

const Input = ({
  type = "text",
  value = "",
  placeholder = "",
  onChange = () => {},
  onChangeField,
  disabled,
}) => {
  const onChangeInput = (event) => {
    onChange(event.target?.value);
  };

  return (
    <input
      type={type}
      className="my-custom-input"
      value={value}
      onChange={onChangeField || onChangeInput}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
