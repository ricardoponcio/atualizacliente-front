import React, { useState } from "react";
import { useApiProjetos } from "../api";

const ConsultaAtualizacao = () => {
  const { buscaAtualizacaoToken } = useApiProjetos();
  const [token, setToken] = useState("");
  const [senhaCliente, setSenhaCliente] = useState("");
  const [atualizacao, setAtualizacao] = useState("");
  const [requisicaoErro, setRequisicaoErro] = useState();

  const buscaAtualizacao = async (event) => {
    try {
      event.preventDefault();
      setAtualizacao((await buscaAtualizacaoToken(token, senhaCliente)).data);
      setRequisicaoErro(undefined);
    } catch (err) {
      setAtualizacao("");
      setRequisicaoErro(err.response?.data?.mensagem || err.message);
    }
  };

  return (
    <div>
      <h1>Busca por Token</h1>
      <form onSubmit={buscaAtualizacao}>
        <input
          type="text"
          placeholder="Token Pesquisa"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha do cliente"
          value={senhaCliente}
          onChange={(e) => setSenhaCliente(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {requisicaoErro && <span>{requisicaoErro}</span>}
      {atualizacao && JSON.stringify(atualizacao)}
    </div>
  );
};

export default ConsultaAtualizacao;
