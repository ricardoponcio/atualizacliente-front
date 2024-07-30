/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useApiCliente } from "api";

const AtualizaCliente = ({ cliente, callbackClienteAtualizado = () => {} }) => {
  const { atualizaCliente } = useApiCliente();
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    limparFormulario();
    setRazaoSocial(cliente.razaoSocial || "");
    setNomeFantasia(cliente.nomeFantasia || "");
    setCnpj(cliente.cnpj || "");
    setEmail(cliente.email || "");
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
    try {
      const clienteAtualizaco = await atualizaCliente(cliente.id, {
        razaoSocial,
        nomeFantasia,
        cnpj,
        email,
      });
      callbackClienteAtualizado(clienteAtualizaco.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
    limparFormulario();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        placeholder="Razão Social"
        value={razaoSocial}
        onChange={(e) => setRazaoSocial(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome Fantasia"
        value={nomeFantasia}
        onChange={(e) => setNomeFantasia(e.target.value)}
      />
      <input
        type="text"
        placeholder="CNPJ"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Criar</button>
      {carregando && <span>Carregando...</span>}
    </form>
  );
};

export default AtualizaCliente;
