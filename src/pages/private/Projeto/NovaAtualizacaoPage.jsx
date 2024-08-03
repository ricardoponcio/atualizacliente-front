import { useApiProjetos } from "api";
import CriaAtualizacao from "components/CriaAtualizacao";
import ButtonGoBack from "components/form/ButtonGoBack";
import Loader from "components/form/Loader";
import Spacer from "components/Spacer";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const NovaAtualizacaoPage = () => {
  const [searchParams] = useSearchParams();
  const { detalharProjeto } = useApiProjetos();
  const [projeto, setProjeto] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requisicaoErro, setRequisicaoErro] = useState("");
  const projetoId = searchParams.get("__projeto_identificacao");

  useEffect(() => {
    atualizaDadosPagina();
  }, []);

  const atualizaDadosPagina = async () => {
    setIsLoading(true);
    setRequisicaoErro("");
    try {
      setProjeto((await detalharProjeto(projetoId)).data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao detalhar projeto"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ButtonGoBack />
      <h1>Emitir Nova Atualização</h1>
      <h5>Projeto ID {projetoId}</h5>
      <Spacer height={16} />
      {isLoading && <Loader />}
      {!isLoading && requisicaoErro && <span>{requisicaoErro}</span>}
      {!isLoading && (
        <CriaAtualizacao
          projeto={projeto}
          callbackAtualizacaoEmitida={history.goBack}
        />
      )}
    </div>
  );
};

export default NovaAtualizacaoPage;
