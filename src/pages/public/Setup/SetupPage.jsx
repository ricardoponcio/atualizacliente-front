/* eslint-disable react/prop-types */
import { useApiUsuario } from "api";
import Button from "components/form/Button";
import Input from "components/form/Input";
import Loader from "components/form/Loader";
import React, { useState } from "react";
import "./SetupPage.scss";

const SetupPage = ({ cadastroConcluido = () => {} }) => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");
  const { cadastraUsuario } = useApiUsuario();

  const handleCadastro = async () => {
    setIsLoading(true);
    setRequisicaoErro("");
    try {
      await cadastraUsuario({ email, nome, senha });
      cadastroConcluido();
    } catch (err) {
      setRequisicaoErro("Erro ao concluir setup, tente novamente mais tarde");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="setup-wrapper">
      <div className="setup-container">
        <h1>Cadastro de Usuário</h1>
        <Input type="text" placeholder="Nome" value={nome} onChange={setNome} />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={setSenha}
        />
        {isLoading && <Loader />}
        {requisicaoErro && <span>{requisicaoErro}</span>}
        <Button onClick={handleCadastro} value={"Cadastrar"} />
      </div>
    </div>
  );
};

export default SetupPage;
