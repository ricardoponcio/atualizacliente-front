/* eslint-disable react/prop-types */
import { useApiProjetos } from "api";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Form from "./form/Form";
import Input from "./form/Input";

const AtualizaProjeto = ({ projeto, callbackProjetoAtualizado = () => {} }) => {
  const { atualizaProjeto } = useApiProjetos();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [dataLimite, setDataLimite] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    limparFormulario();
    setNome(projeto.nome || "");
    setDescricao(projeto.descricao || "");
    setValor(projeto.valor || "");
    setDataLimite(projeto.dataLimite || "");
  }, []);

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setValor(0);
    setDataLimite("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    try {
      const projetoCriado = await atualizaProjeto(projeto.id, {
        nome,
        descricao,
        valor,
        dataLimite: moment(dataLimite).utc().format(),
      });
      callbackProjetoAtualizado(projetoCriado.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
    limparFormulario();
  };

  return (
    <Form submitText="Atualizar" onSubmit={onSubmitForm}>
      <Input type="text" placeholder="Nome" value={nome} onChange={setNome} />
      <Input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={setDescricao}
      />
      <Input
        type="number"
        placeholder="Valor (R$)"
        value={valor}
        onChange={setValor}
      />
      <Input
        type="date"
        placeholder="Data Limite"
        value={dataLimite}
        onChange={setDataLimite}
      />
      {carregando && <span>Carregando...</span>}
    </Form>
  );
};

export default AtualizaProjeto;
