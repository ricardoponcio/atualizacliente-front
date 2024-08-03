import { useApiProjetos } from "api";
import FlexList from "components/form/FlexList";
import Form from "components/form/Form";
import Input from "components/form/Input";
import Loader from "components/form/Loader";
import InfoProjetoAtualizacao from "components/InfoProjetoAtualizacao";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ConsultaAtualizacao.scss";

const ConsultaAtualizacao = () => {
  const [searchParams] = useSearchParams();
  const { buscaAtualizacaoToken } = useApiProjetos();
  const [token, setToken] = useState("");
  const [senhaCliente, setSenhaCliente] = useState("");
  const [atualizacao, setAtualizacao] = useState("");
  const [requisicaoErro, setRequisicaoErro] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setToken(searchParams.get("__token_visualizacao_atualizacao"));
  }, []);

  const buscaAtualizacao = async (event) => {
    setIsLoading(true);
    setRequisicaoErro("");
    try {
      event.preventDefault();
      setAtualizacao((await buscaAtualizacaoToken(token, senhaCliente)).data);
      setRequisicaoErro(undefined);
    } catch (err) {
      setAtualizacao("");
      setRequisicaoErro(
        err.response?.data?.mensagem ||
          "Erro ao consultar atualização, tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="consulta-atualizacao-wrapper">
      <div className="consulta-atualizacao-content">
        <h1>Busca por Token</h1>
        <Form submitText="Consultar" onSubmit={buscaAtualizacao}>
          <FlexList labelValuePairs={true}>
            <label>Token</label>
            <Input value={token} disabled />
          </FlexList>
          <Input
            type="password"
            placeholder="Senha do cliente"
            value={senhaCliente}
            onChange={setSenhaCliente}
          />
          {isLoading && <Loader center={true} />}
          {requisicaoErro && <span>{requisicaoErro}</span>}
        </Form>
      </div>
      {atualizacao && (
        <div className="consulta-atualizacao-result">
          <InfoProjetoAtualizacao atualizacao={atualizacao} />
        </div>
      )}
    </div>
  );
};

export default ConsultaAtualizacao;
