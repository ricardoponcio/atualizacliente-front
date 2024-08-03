/* eslint-disable react/prop-types */
import React from "react";
import "./Checkbox.scss";

const CheckBox = ({
  value = false,
  label = "",
  onChange = () => {},
  onChangeField,
  disabled,
}) => {
  const onChangeInput = (event) => {
    onChange(event.target?.checked);
  };

  return (
    <label className="my-custom-checkbox-wrapper">
      {label}
      <input
        type="checkbox"
        className="my-custom-checkbox"
        checked={value}
        onChange={onChangeField || onChangeInput}
        disabled={disabled}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
