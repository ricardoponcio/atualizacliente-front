import { useApiProjetos } from "api";
import Box from "components/form/Box";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import FlexList from "components/form/FlexList";
import DetalheProjetoAtualizacao from "components/subPages/projeto/atualizacao/DetalheProjetoAtualizacao";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProjetoAtualizacaoDetalhePage = () => {
  const [searchParams] = useSearchParams();
  const { detalhaAtualizacao } = useApiProjetos();
  const [atualizacao, setAtualizacao] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requisicaoErro, setRequisicaoErro] = useState("");
  const projetoAtualizacaoId = searchParams.get(
    "__projeto_atualizacao_identificacao"
  );

  useEffect(() => {
    atualizaDadosPagina();
  }, []);

  const openUrlConsulta = () => {
    const path = `/atualizacao?__token_visualizacao_atualizacao=${atualizacao.tokenView}`;
    window.open(
      `${window.location.origin}${path}`,
      "_blank",
      "noopener,noreferrer,resizable"
    );
  };

  const atualizaDadosPagina = async () => {
    setIsLoading(true);
    setRequisicaoErro("");
    try {
      setAtualizacao((await detalhaAtualizacao(projetoAtualizacaoId)).data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao detalhar a atualização"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FlexList rowDirection={true}>
        <Box fixedWidth={80}>
          <ButtonGoBack />
        </Box>
        {!isLoading && !requisicaoErro && atualizacao && (
          <Box fixedWidth={200}>
            <Button value={"URL Consulta"} onClick={openUrlConsulta} />
          </Box>
        )}
      </FlexList>
      <h1>Atualização</h1>
      <h5>ID {projetoAtualizacaoId}</h5>
      {!isLoading && !requisicaoErro && (
        <DetalheProjetoAtualizacao atualizacao={atualizacao} />
      )}
      {isLoading && <span>Carregando...</span>}
      {!isLoading && requisicaoErro && <span>{requisicaoErro}</span>}
    </div>
  );
};

export default ProjetoAtualizacaoDetalhePage;
