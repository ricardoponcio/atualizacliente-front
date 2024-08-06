import { useApiProjetos } from "api";
import DetalheProjetoAtualizacao from "components/subPages/projeto/atualizacao/DetalheProjetoAtualizacao";
import ButtonGoBack from "components/form/ButtonGoBack";
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
      <ButtonGoBack />
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
