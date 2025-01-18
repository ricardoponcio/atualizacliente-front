/* eslint-disable react/prop-types */
import React, { useState } from "react";

import Button from "components/form/Button";
import FlexList from "components/form/FlexList";
import Loader from "components/form/Loader";
import { filesize } from "filesize";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import "./AnexoProjetoArquivo.scss";

const AnexoProjetoArquivo = ({ anexo, onBaixarAnexo = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBaixarAnexo = async (anexo) => {
    setIsLoading(true);
    try {
      await onBaixarAnexo(anexo);
    } catch (err) {
      // nothing
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="anexo-item">
      <FlexList rowDirection={true}>
        <span className="arquivo-item-nome">{anexo.arquivoNome}</span>
        <span className="arquivo-item-tamanho">
          {filesize(anexo.tamanho, { standard: "jedec" })}
        </span>
      </FlexList>
      <span className="arquivo-item-origem">
        Adicionado Por <b>{anexo.criadoPor.nome}</b> em{" "}
        <b>{moment(anexo.criadoEm).format("LLL")}</b>
      </span>
      <FlexList rowDirection={true}>
        <div>
          <Button
            value={"Baixar Anexo"}
            onClick={() => handleBaixarAnexo(anexo)}
            disabled={isLoading}
          />
        </div>
        {isLoading && <Loader minified />}
      </FlexList>
    </div>
  );
};

export default AnexoProjetoArquivo;
