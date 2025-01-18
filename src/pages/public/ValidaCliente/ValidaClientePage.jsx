import { useApiCliente } from "api";
import Form from "components/form/Form";
import Input from "components/form/Input";
import Loader from "components/form/Loader";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ValidaCliente.scss";

const ValidaCliente = () => {
  const [searchParams] = useSearchParams();
  const { validarCliente } = useApiCliente();
  const [token, setToken] = useState("");
  const [senhaCliente, setSenhaCliente] = useState("");
  const [requisicaoErro, setRequisicaoErro] = useState();
  const [requisicaoSucesso, setRequisicaoSucesso] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setToken(searchParams.get("__token_validacao_cliente"));
  }, []);

  const validar = async (event) => {
    setIsLoading(true);
    setRequisicaoErro("");
    setRequisicaoSucesso("");
    try {
      event.preventDefault();
      await validarCliente(token, senhaCliente);
      setRequisicaoErro(undefined);
      setRequisicaoSucesso("Cliente validado com sucesso!");
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem ||
          "Erro ao realizar a validação, tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="validar-cliente-wrapper">
      <div className="validar-cliente-content">
        <h1>Validar Cliente</h1>
        <Form submitText="Validar" onSubmit={validar}>
          <span>
            Insira uma senha que será usada para visualizar as atualizações
            futuras
          </span>
          <Input
            type="password"
            placeholder="Nova Senha do cliente"
            value={senhaCliente}
            onChange={setSenhaCliente}
          />
          {isLoading && <Loader center={true} />}
          {requisicaoErro && <span>{requisicaoErro}</span>}
          {requisicaoSucesso && <span>{requisicaoSucesso}</span>}
        </Form>
      </div>
    </div>
  );
};

export default ValidaCliente;
