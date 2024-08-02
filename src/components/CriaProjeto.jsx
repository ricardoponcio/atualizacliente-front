/* eslint-disable react/prop-types */
import { useApiCliente, useApiProjetos } from "api";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Form from "./form/Form";
import Input from "./form/Input";
import Select from "./form/Select";

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
        dataLimite: moment(dataLimite).utc().format(),
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
        <Select
          value={cliente}
          onChange={setCliente}
          options={clientes}
          selectOptionLabelFactory={(cliente) => cliente.razaoSocial}
          selectOptionValueFactory={(_, idx) => idx}
        />
      </Form>
      {carregando && <span>Carregando...</span>}
      {requisicaoErro && <span>{requisicaoErro}</span>}
    </>
  );
};

export default CriaProjeto;
