/* eslint-disable react/prop-types */
import React from "react";
import Input from "../../../form/Input";

import "react-datepicker/dist/react-datepicker.css";
import FlexList from "../../../form/FlexList";
import HtmlBox from "../../../form/HtmlBox";

const InfoProjetoAtualizacao = ({ atualizacao }) => {
  return (
    <FlexList labelValuePairs={true}>
      <label>Título</label>
      <Input value={atualizacao.titulo} disabled />
      <label>Status</label>
      <Input value={atualizacao.status} disabled />
      <label>Substatus</label>
      <Input value={atualizacao.subStatus} disabled />
      <label>Descrição</label>
      <HtmlBox content={atualizacao.descricao} />
    </FlexList>
  );
};

export default InfoProjetoAtualizacao;
