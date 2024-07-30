import React, { useState } from "react";
import { useApiCliente } from "api";

const ValidaCliente = () => {
  const { validarCliente } = useApiCliente();
  const [token, setToken] = useState("");
  const [senhaCliente, setSenhaCliente] = useState("");
  const [requisicaoErro, setRequisicaoErro] = useState();

  const validar = async (event) => {
    try {
      event.preventDefault();
      await validarCliente(token, senhaCliente);
      setRequisicaoErro(undefined);
    } catch (err) {
      setRequisicaoErro(err.response?.data?.mensagem || err.message);
    }
  };

  return (
    <div>
      <h1>Validar Cliente</h1>
      <form onSubmit={validar}>
        <input
          type="text"
          placeholder="Token Validação"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nova Senha do cliente"
          value={senhaCliente}
          onChange={(e) => setSenhaCliente(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {requisicaoErro && <span>{requisicaoErro}</span>}
    </div>
  );
};

export default ValidaCliente;
