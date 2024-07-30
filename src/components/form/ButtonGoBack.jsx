/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Button.scss";

const ButtonGoBack = ({ value = "Voltar", path = "/" }) => {
  const navigate = useNavigate();

  return <Button value={value} onClick={() => navigate(path)} />;
};

export default ButtonGoBack;
