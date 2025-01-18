/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import "./Form.scss";

const Form = ({
  children,
  autoWidth = false,
  submitText = "Submeter",
  onSubmit = () => {},
}) => {
  return (
    <form
      className={`my-custom-form ${autoWidth ? "auto-width" : ""}`}
      onSubmit={onSubmit}
    >
      {children}
      <Button value={submitText} type="submit" />
    </form>
  );
};

export default Form;
