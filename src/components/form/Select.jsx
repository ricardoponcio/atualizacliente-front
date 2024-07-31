/* eslint-disable react/prop-types */
import React from "react";
import "./Select.scss";

const Select = ({
  value = "",
  placeholder = "",
  onChange = () => {},
  onChangeField,
  selectOptionValueFactory,
  selectOptionLabelFactory,
  options = [],
  firstOptionNull = true,
}) => {
  const onChangeInput = (event) => {
    onChange(event.target?.value);
  };

  const objectToStr = (data) => {
    if (data && data instanceof Object) return JSON.stringify(data);
    return data;
  };

  const getValue = (option, index) => {
    return selectOptionValueFactory
      ? selectOptionValueFactory(option, index)
      : index;
  };

  const getLabel = (option, index) => {
    return selectOptionLabelFactory
      ? selectOptionLabelFactory(option, index)
      : objectToStr(option);
  };

  return (
    <select
      className="my-custom-select"
      value={value}
      onChange={onChangeField || onChangeInput}
      placeholder={placeholder}
    >
      {firstOptionNull && (
        <option key={`option_-1_${new Date().getTime()}`}></option>
      )}
      {options?.map((option, idx) => (
        <option
          key={`option_${idx}_${new Date().getTime()}`}
          value={getValue(option, idx)}
        >
          {getLabel(option, idx)}
        </option>
      ))}
    </select>
  );
};

export default Select;
