/* eslint-disable react/prop-types */
import React from "react";
import Input from "./form/Input";

import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import FlexList from "./form/FlexList";
import InfoProjetoAtualizacao from "./InfoProjetoAtualizacao";

const DetalheProjetoAtualizacao = ({ atualizacao }) => {
  return (
    <>
      <h3>Origem do registro</h3>
      <FlexList labelValuePairs={true}>
        <label>Criado em</label>
        <Input value={moment(atualizacao.criadoEm).format("L")} disabled />
        <label>Criado Por</label>
        <Input value={atualizacao.criadoPor?.nome} disabled />
      </FlexList>
      <h3>Informações gerais</h3>
      <InfoProjetoAtualizacao atualizacao={atualizacao} />
      <h3>Dados do Email</h3>
      <FlexList labelValuePairs={true}>
        <label>Destino</label>
        <Input value={atualizacao.email?.emailDestino} disabled />
        <label>Processado Em</label>
        <Input
          value={
            atualizacao.envioProcessadoEm
              ? moment(atualizacao.envioProcessadoEm).format("L")
              : ""
          }
          disabled
        />
        <label>Resultado</label>
        <Input value={atualizacao.resultado} disabled />
        {!atualizacao.resultado && (
          <>
            <label>Erro</label>
            <Input value={atualizacao.mensagemErro} disabled />
          </>
        )}
      </FlexList>
    </>
  );
};

export default DetalheProjetoAtualizacao;
