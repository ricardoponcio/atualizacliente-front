/* eslint-disable react/prop-types */
import { useApiCliente } from "api";
import React, { useEffect, useState } from "react";
import Form from "../../form/Form";
import Input from "../../form/Input";

const AtualizaCliente = ({ cliente, callbackClienteAtualizado = () => {} }) => {
  const { atualizaCliente } = useApiCliente();
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => resetaFormulario(), []);
  useEffect(() => resetaFormulario(), [cliente]);

  const resetaFormulario = () => {
    limparFormulario();
    setRazaoSocial(cliente.razaoSocial || "");
    setNomeFantasia(cliente.nomeFantasia || "");
    setCnpj(cliente.cnpj || "");
    setEmail(cliente.email || "");
  };

  const limparFormulario = () => {
    setRazaoSocial("");
    setNomeFantasia("");
    setCnpj("");
    setEmail("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setRequisicaoErro("");
    try {
      const clienteAtualizaco = await atualizaCliente(cliente.id, {
        razaoSocial,
        nomeFantasia,
        cnpj,
        email,
      });
      callbackClienteAtualizado(clienteAtualizaco.data);
      limparFormulario();
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao atualizar cliente"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Atualizar" onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="Razão Social"
          value={razaoSocial}
          onChange={setRazaoSocial}
        />
        <Input
          type="text"
          placeholder="Nome Fantasia"
          value={nomeFantasia}
          onChange={setNomeFantasia}
        />
        <Input type="text" placeholder="CNPJ" value={cnpj} onChange={setCnpj} />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
      </Form>
      {carregando && <span>Carregando...</span>}
      {requisicaoErro && <span>{requisicaoErro}</span>}
    </>
  );
};

export default AtualizaCliente;
