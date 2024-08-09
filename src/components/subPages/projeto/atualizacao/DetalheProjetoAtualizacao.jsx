/* eslint-disable react/prop-types */
import React from "react";
import Input from "../../../form/Input";

import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import FlexList from "../../../form/FlexList";
import InfoAnexoProjeto from "../InfoAnexoProjeto";
import InfoProjetoAtualizacao from "./InfoProjetoAtualizacao";

const DetalheProjetoAtualizacao = ({ atualizacao }) => {
  return (
    <>
      <h3>Origem do registro</h3>
      <FlexList rowDirection={true}>
        <FlexList labelValuePairs={true}>
          <label>Criado em</label>
          <Input value={moment(atualizacao.criadoEm).format("L")} disabled />
        </FlexList>
        <FlexList labelValuePairs={true}>
          <label>Criado Por</label>
          <Input value={atualizacao.criadoPor?.nome} disabled />
        </FlexList>
      </FlexList>
      <h3>Informações gerais</h3>
      <InfoProjetoAtualizacao atualizacao={atualizacao} />
      <h3>Dados do Email</h3>
      <FlexList>
        <FlexList rowDirection={true}>
          <FlexList labelValuePairs={true}>
            <label>Destino</label>
            <Input value={atualizacao.email?.emailDestino} disabled />
          </FlexList>
          <FlexList labelValuePairs={true}>
            <label>Processado Em</label>
            <Input
              value={
                atualizacao.email?.envioProcessadoEm
                  ? moment(atualizacao.email?.envioProcessadoEm).format("L")
                  : "Ainda não processado"
              }
              disabled
            />
          </FlexList>
        </FlexList>
        {atualizacao.email?.envioProcessadoEm && (
          <>
            <label>Resultado</label>
            <Input value={atualizacao.email?.resultado} disabled />
          </>
        )}
        {atualizacao.email?.envioProcessadoEm &&
          !atualizacao.email?.resultado && (
            <>
              <label>Erro</label>
              <Input value={atualizacao.email?.mensagemErro} disabled />
            </>
          )}
      </FlexList>
      <h3>Anexos</h3>
      <InfoAnexoProjeto anexos={atualizacao.anexos} />
    </>
  );
};

export default DetalheProjetoAtualizacao;
