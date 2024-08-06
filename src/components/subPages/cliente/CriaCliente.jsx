/* eslint-disable react/prop-types */
import { useApiCliente } from "api";
import React, { useEffect, useState } from "react";
import Form from "../../form/Form";
import Input from "../../form/Input";

const CriaCliente = ({ callbackClienteCriado = () => {} }) => {
  const { criaCliente } = useApiCliente();
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => {
    limparFormulario();
  }, []);

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
      const clienteCriado = await criaCliente({
        razaoSocial,
        nomeFantasia,
        cnpj,
        email,
      });
      callbackClienteCriado(clienteCriado.data);
      limparFormulario();
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao cadastrar cliente"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Criar" onSubmit={onSubmitForm}>
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

export default CriaCliente;
