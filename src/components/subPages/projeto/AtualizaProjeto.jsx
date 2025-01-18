/* eslint-disable react/prop-types */
import { useApiProjetos } from "api";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import FlexList from "../../form/FlexList";
import Form from "../../form/Form";
import Input from "../../form/Input";
import InputDate from "../../form/InputDate";

const AtualizaProjeto = ({ projeto, callbackProjetoAtualizado = () => {} }) => {
  const { atualizaProjeto } = useApiProjetos();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [dataLimite, setDataLimite] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => resetaFormulario(), []);
  useEffect(() => resetaFormulario(), [projeto]);

  const resetaFormulario = () => {
    limparFormulario();
    setNome(projeto.nome || "");
    setDescricao(projeto.descricao || "");
    setValor(projeto.valor || "");
    setDataLimite(projeto.dataLimite || "");
  };

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setValor(0);
    setDataLimite("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setRequisicaoErro("");
    try {
      const projetoCriado = await atualizaProjeto(projeto.id, {
        nome,
        descricao,
        valor,
        dataLimite: moment(dataLimite).format(),
      });
      callbackProjetoAtualizado(projetoCriado.data);
      limparFormulario();
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao atualizar projeto"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Atualizar" onSubmit={onSubmitForm}>
        <FlexList labelValuePairs={true}>
          <span>Nome</span>
          <Input
            type="text"
            placeholder="Meu Projeto"
            value={nome}
            onChange={setNome}
          />
          <span>Descrição</span>
          <Input
            type="text"
            placeholder="Insira uma pequena descrição..."
            value={descricao}
            onChange={setDescricao}
          />
          <span>Valor (R$)</span>
          <Input
            type="number"
            placeholder="R$ 1.000,00"
            value={valor}
            onChange={setValor}
          />
          <span>Data Limite</span>
          <InputDate value={dataLimite} onChange={setDataLimite} />
        </FlexList>
      </Form>
      {carregando && <span>Carregando...</span>}
      {requisicaoErro && <span>{requisicaoErro}</span>}
    </>
  );
};

export default AtualizaProjeto;
