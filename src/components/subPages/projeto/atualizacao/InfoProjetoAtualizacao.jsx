/* eslint-disable react/prop-types */
import React from "react";
import Input from "../../../form/Input";

import "react-datepicker/dist/react-datepicker.css";
import { translateStatus, translateSubStatus } from "utils/projetoUtils";
import FlexList from "../../../form/FlexList";
import HtmlBox from "../../../form/HtmlBox";

const InfoProjetoAtualizacao = ({ atualizacao }) => {
  return (
    <FlexList>
      <FlexList labelValuePairs={true}>
        <label>Título</label>
        <Input value={atualizacao.titulo} disabled />
      </FlexList>
      <FlexList rowDirection={true}>
        <FlexList labelValuePairs={true}>
          <label>Status</label>
          <Input value={translateStatus(atualizacao.status)} disabled />
        </FlexList>
        <FlexList labelValuePairs={true}>
          <label>Substatus</label>
          <Input value={translateSubStatus(atualizacao.subStatus)} disabled />
        </FlexList>
      </FlexList>
      <FlexList labelValuePairs={true}>
        <label>Descrição</label>
        <HtmlBox content={atualizacao.descricao} />
      </FlexList>
    </FlexList>
  );
};

export default InfoProjetoAtualizacao;
