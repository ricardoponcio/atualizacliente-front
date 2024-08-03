import { useApiProjetos } from "api";
import AtualizaProjeto from "components/AtualizaProjeto";
import CriaProjeto from "components/CriaProjeto";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Drawer from "components/form/Drawer";
import Popup from "components/form/Popup";
import Spacer from "components/Spacer";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const ProjetosPage = () => {
  const navigate = useNavigate();
  const { listarProjetos, removeProjeto: removerProjetoRequest } =
    useApiProjetos();
  const [projetos, setProjetos] = useState([]);
  const [projetoAtualizacao, setProjetoAtualizacao] = useState("");
  const [projetoRemover, setProjetoRemover] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => {
    atualizaDadosPagina();
  }, []);

  const abreDrawer = () => setIsDrawerOpen(true);
  const fechaDrawer = () => setIsDrawerOpen(false);

  const abrePopup = () => setIsPopupOpen(true);
  const fechaPopup = () => setIsPopupOpen(false);

  const atualizaDadosPagina = async () => {
    setIsLoading(true);
    setRequisicaoErro("");
    try {
      setProjetos((await listarProjetos()).data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao listar projetos"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const iniciaAtualizacaoProjeto = (projeto) => {
    setProjetoAtualizacao(projeto);
    abreDrawer();
  };

  const iniciaRemocaoProjeto = async (projeto) => {
    setProjetoRemover(projeto);
    abrePopup();
  };

  const removeProjeto = async () => {
    setIsLoading(true);
    try {
      await removerProjetoRequest(projetoRemover.id);
      atualizaDadosPagina();
    } catch (err) {
      //nothing
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ButtonGoBack />
      <h1>Projetos</h1>
      {!isLoading && !requisicaoErro && (
        <>
          <Button
            value={"Novo"}
            onClick={() => {
              setProjetoAtualizacao("");
              abreDrawer();
            }}
          />
          <Spacer height={16} />
          <DataTable
            headers={[
              "Nome",
              "Decrição",
              "Valor (R$)",
              "Data Limite",
              "Cliente",
            ]}
            columnsRenderNames={[
              "nome",
              "descricao",
              "valor",
              "dataLimite",
              "cliente",
            ]}
            data={projetos.map((projeto) => {
              return {
                ...projeto,
                dataLimite: moment(projeto.dataLimite).format("L"),
                cliente: projeto.cliente?.razaoSocial,
              };
            })}
            actionsPerRow={[
              {
                value: "Modificar",
                onClick: (event, row, idx) =>
                  iniciaAtualizacaoProjeto(projetos[idx]),
              },
              {
                value: "Remover",
                onClick: (event, row) => iniciaRemocaoProjeto(row),
              },
              {
                value: "Atualizações",
                onClick: (event, row) =>
                  navigate({
                    pathname: "/projetos/atualizacoes",
                    search: createSearchParams({
                      __projeto_identificacao: row.id,
                    }).toString(),
                  }),
              },
              {
                value: "Nova Atualização",
                onClick: (event, row) =>
                  navigate({
                    pathname: "/projetos/atualizacoes/nova",
                    search: createSearchParams({
                      __projeto_identificacao: row.id,
                    }).toString(),
                  }),
              },
            ]}
          />
        </>
      )}
      {isLoading && <span>Carregando...</span>}
      {!isLoading && requisicaoErro && <span>{requisicaoErro}</span>}

      <Drawer
        customTitle={
          projetoAtualizacao ? "Modificar Projeto" : "Criar Novo Projeto"
        }
        isVisible={isDrawerOpen}
        onClose={fechaDrawer}
      >
        {!projetoAtualizacao && (
          <CriaProjeto
            callbackProjetoCriado={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
          />
        )}
        {projetoAtualizacao && (
          <AtualizaProjeto
            callbackProjetoAtualizado={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
            projeto={projetoAtualizacao}
          />
        )}
      </Drawer>

      <Popup
        isVisible={isPopupOpen}
        customTitle="Tem certeza?"
        onClose={fechaPopup}
        options={[
          {
            value: "Sim",
            onClick: () => removeProjeto(projetoRemover),
          },
          {
            value: "Não",
            onClick: () => {},
          },
        ]}
      >
        <span>Tem certeza que deseja remover este projeto?</span>
      </Popup>
    </div>
  );
};

export default ProjetosPage;
