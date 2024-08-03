/* eslint-disable react/prop-types */
import { useApiCliente, useApiProjetos } from "api";
import moment from 'moment-timezone';
import React, { useEffect, useState } from "react";
import Form from "./form/Form";
import Input from "./form/Input";
import Select from "./form/Select";

import "react-datepicker/dist/react-datepicker.css";
import FlexList from "./form/FlexList";
import InputDate from "./form/InputDate";

const CriaProjeto = ({ callbackProjetoCriado = () => {} }) => {
  const { criaProjeto } = useApiProjetos();
  const { listarClientes } = useApiCliente();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [dataLimite, setDataLimite] = useState("");
  const [cliente, setCliente] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => {
    limparFormulario();
    (async () => {
      try {
        setClientes((await listarClientes()).data);
      } catch (err) {
        setRequisicaoErro(
          err.response?.data?.mensagem || "Erro ao listar clientes"
        );
      }
    })();
  }, []);

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setValor(0);
    setDataLimite("");
    setCliente("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setRequisicaoErro("");
    try {
      const projetoCriado = await criaProjeto({
        nome,
        descricao,
        valor,
        dataLimite: moment(dataLimite, "DD/MM/YYYY").format(),
        clienteId: clientes[cliente].id,
      });
      limparFormulario();
      callbackProjetoCriado(projetoCriado.data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao criar projeto"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Criar" onSubmit={onSubmitForm}>
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
          <span>Cliente</span>
          <Select
            value={cliente}
            onChange={setCliente}
            options={clientes}
            selectOptionLabelFactory={(cliente) => cliente.razaoSocial}
            selectOptionValueFactory={(_, idx) => idx}
          />
        </FlexList>
      </Form>
      {carregando && <span>Carregando...</span>}
      {requisicaoErro && <span>{requisicaoErro}</span>}
    </>
  );
};

export default CriaProjeto;
