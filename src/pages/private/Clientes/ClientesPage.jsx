import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiCliente } from "api";
import AtualizaCliente from "components/AtualizaCliente";
import CriaCliente from "components/CriaCliente";

const ClientesPage = () => {
  const navigate = useNavigate();
  const { listarClientes, removeCliente } = useApiCliente();
  const [clientes, setClientes] = useState([]);
  const [clienteAtualizacao, setClienteAtualizacao] = useState("");

  const goHome = () => navigate("/");

  useEffect(() => {
    atualizaDadosPagina();
  }, []);

  const atualizaDadosPagina = async () => {
    setClientes((await listarClientes()).data);
  };

  const iniciaAtualizacaoCliente = (projeto) => {
    setClienteAtualizacao(projeto);
  };

  const iniciaRemocaoCliente = async (projeto) => {
    await removeCliente(projeto.id);
    atualizaDadosPagina();
  };

  return (
    <div>
      <button onClick={goHome}>Home</button>
      <h1>Clientes</h1>
      {clientes?.map((cliente, idx) => (
        <div key={`cliente-${idx}`}>
          <p>{cliente.razaoSocial}</p>
          <span>{cliente.nomeFantasia}</span>
          <button
            type="button"
            onClick={() => iniciaAtualizacaoCliente(cliente)}
          >
            Modificar
          </button>
          <button type="button" onClick={() => iniciaRemocaoCliente(cliente)}>
            Deletar
          </button>
        </div>
      ))}
      <CriaCliente callbackClienteCriado={atualizaDadosPagina} />
      {clienteAtualizacao && (
        <AtualizaCliente
          callbackClienteAtualizado={atualizaDadosPagina}
          cliente={clienteAtualizacao}
        />
      )}
    </div>
  );
};

export default ClientesPage;
