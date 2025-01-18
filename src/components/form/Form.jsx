/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import "./Form.scss";

const Form = ({
  children,
  autoWidth = false,
  submitText = "Submit",
  onSubmit = () => {},
  loading = false,
}) => {
  return (
    <form
      className={`my-custom-form ${autoWidth ? "auto-width" : ""}`}
      onSubmit={onSubmit}
    >
      {children}
      <Button value={submitText} type="submit" disabled={loading} />
    </form>
  );
};

export default Form;
