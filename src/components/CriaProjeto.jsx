/* eslint-disable react/prop-types */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { criaProjeto, listarClientes } from "../api";

const CriaProjeto = ({ callbackProjetoCriado = () => {} }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [dataLimite, setDataLimite] = useState("");
  const [cliente, setCliente] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    limparFormulario();
    (async () => {
      setClientes((await listarClientes()).data);
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
    try {
      const projetoCriado = await criaProjeto({
        nome,
        descricao,
        valor,
        dataLimite: moment(dataLimite).utc().format(),
        clienteId: clientes[cliente].id,
      });
      callbackProjetoCriado(projetoCriado.data);
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
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor (R$)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <input
        type="date"
        placeholder="Data Limite"
        value={dataLimite}
        onChange={(e) => setDataLimite(e.target.value)}
      />
      <select
        name="clientes"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      >
        <option key={`cliente-null`}></option>
        {clientes.map((cliente, idx) => (
          <option key={`cliente-${idx}`} value={idx}>
            {cliente.razaoSocial}
          </option>
        ))}
      </select>
      <button type="submit">Criar</button>
      {carregando && <span>Carregando...</span>}
    </form>
  );
};

export default CriaProjeto;
