/* eslint-disable react/prop-types */
import React from "react";
import DatePicker from "react-datepicker";
import "./InputDate.scss";

const InputDate = ({
  value = "",
  placeholder = "",
  onChange = () => {},
  disabled,
}) => {
  return (
    <DatePicker
      className="my-custom-input-date"
      selected={value}
      onSelect={onChange}
      placeholder={placeholder}
      disabled={disabled}
      dateFormat={'dd/MM/yyyy'}
    />
  );
};

export default InputDate;
