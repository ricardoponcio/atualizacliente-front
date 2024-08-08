/* eslint-disable react/prop-types */
import React from "react";

import FlexList from "components/form/FlexList";
import HtmlBox from "components/form/HtmlBox";
import Input from "components/form/Input";
import "react-datepicker/dist/react-datepicker.css";
import { translateStatus, translateSubStatus } from "utils/projetoUtils";

const InfoProjeto = ({ projeto }) => {
  return (
    <FlexList>
      <FlexList labelValuePairs={true}>
        <label>Nome</label>
        <Input value={projeto.nome} disabled />
      </FlexList>
      <FlexList rowDirection={true}>
        <FlexList labelValuePairs={true}>
          <label>Status</label>
          <Input value={translateStatus(projeto.status)} disabled />
        </FlexList>
        <FlexList labelValuePairs={true}>
          <label>Substatus</label>
          <Input value={translateSubStatus(projeto.subStatus)} disabled />
        </FlexList>
      </FlexList>
      <FlexList labelValuePairs={true}>
        <label>Descrição</label>
        <HtmlBox content={projeto.descricao} />
      </FlexList>
    </FlexList>
  );
};

export default InfoProjeto;
