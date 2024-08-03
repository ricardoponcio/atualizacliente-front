import { useApiProjetos } from "api";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Spacer from "components/Spacer";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const ProjetoAtualizacoesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { listaAtualizacoes } = useApiProjetos();
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
    try {
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
      <h1>Atualizações</h1>
      <h5>Projeto ID {projetoId}</h5>
      {!isLoading && !requisicaoErro && (
        <>
          <Button
            value={"Emitir Nova"}
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

export default ProjetoAtualizacoesPage;
