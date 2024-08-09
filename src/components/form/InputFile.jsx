/* eslint-disable react/prop-types */
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import "./InputFile.scss";

const InputFile = ({
  value = "Inserir",
  multiple = false,
  onSelectFile = () => {},
  disabled = false,
}) => {
  const inputFileId = uuidv4();

  const handleChangeInput = async (event) => {
    onSelectFile(event.target.files?.[0]);
    event.target.value = "";
  };
  const openInput = () => {
    document.getElementById(inputFileId).click();
  };

  return (
    <>
      <div className="hidden-wrapper">
        <input
          id={inputFileId}
          type="file"
          onChange={handleChangeInput}
          multiple={multiple}
          disabled={disabled}
        />
      </div>
      <Button value={value} onClick={openInput} disabled={disabled} />
    </>
  );
};

export default InputFile;
