import { useApiProjetos } from "api";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Spacer from "components/form/Spacer";
import InfoProjeto from "components/subPages/projeto/InfoProjeto";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { translateStatus, translateSubStatus } from "utils/projetoUtils";

const ProjetoDetalhePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { listaAtualizacoes, detalharProjeto } = useApiProjetos();
  const [projeto, setProjeto] = useState("");
  const [atualizacoes, setAtualizacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requisicaoErro, setRequisicaoErro] = useState("");
  const projetoId = searchParams.get("__projeto_identificacao");

  useEffect(() => {
    atualizaDadosPagina();
  }, []);

  const atualizaDadosPagina = async () => {
    setIsLoading(true);
    setRequisicaoErro("");
    setProjeto("");
    setAtualizacoes([]);
    try {
      setProjeto((await detalharProjeto(projetoId)).data);
      setAtualizacoes((await listaAtualizacoes(projetoId)).data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao listar atualizações"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ButtonGoBack />
      <h1>Projeto Detalhes</h1>
      <h5>Projeto ID {projetoId}</h5>
      {!isLoading && !requisicaoErro && (
        <>
          <Button
            value={"Emitir Nova Atualização"}
            onClick={() =>
              navigate({
                pathname: "/projetos/atualizacoes/nova",
                search: createSearchParams({
                  __projeto_identificacao: projetoId,
                }).toString(),
              })
            }
          />
          <Spacer height={16} />
          {projeto && <InfoProjeto projeto={projeto} />}
          <Spacer height={16} />
          <h3>Atualizações</h3>
          <DataTable
            headers={[
              "Data Atualização",
              "Status",
              "Sub Status",
              "Email Aviso",
            ]}
            columnsRenderNames={["criadoEm", "status", "subStatus", "email"]}
            data={atualizacoes?.map((atualizacao) => {
              return {
                ...atualizacao,
                status: translateStatus(atualizacao.status),
                subStatus: translateSubStatus(atualizacao.subStatus),
                criadoEm: moment(atualizacao.criadoEm).format("L"),
                email: atualizacao.email?.emailDestino,
              };
            })}
            actionsPerRow={[
              {
                value: "Detalhar",
                onClick: (event, row) =>
                  navigate({
                    pathname: "/projetos/atualizacao/detalhe",
                    search: createSearchParams({
                      __projeto_atualizacao_identificacao: row.id,
                    }).toString(),
                  }),
              },
            ]}
          />
        </>
      )}
      {isLoading && <span>Carregando...</span>}
      {!isLoading && requisicaoErro && <span>{requisicaoErro}</span>}
    </div>
  );
};

export default ProjetoDetalhePage;
