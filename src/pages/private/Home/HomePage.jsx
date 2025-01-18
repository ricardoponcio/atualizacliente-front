// src/pages/HomePage.jsx

import { useApiEnvioEmail, useApiProjetos } from "api";
import DataTable from "components/form/DataTable";
import Loader from "components/form/Loader";
import { useAuth } from "context/authContext";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { translateStatus, translateSubStatus } from "utils/projetoUtils";
import "./HomePage.scss";
import Spacer from "components/form/Spacer";
import Button from "components/form/Button";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { estatisticasProjetos: estatisticasProjetosRequest } =
    useApiProjetos();
  const { statusEmails: statusEmailsRequest } = useApiEnvioEmail();
  const [estatisticasProjetos, setEstatisticasProjetos] = useState("");
  const [statusEmails, setStatusEmails] = useState("");
  const [requisicaoErro, setRequisicaoErro] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [boxesData, setBoxesData] = useState([]);

  useEffect(() => {
    atualizaPagina();
  }, []);

  const atualizaPagina = async () => {
    setIsLoading(true);
    setRequisicaoErro("");
    setEstatisticasProjetos("");
    setStatusEmails("");
    try {
      const estatisticasProjetos = (await estatisticasProjetosRequest()).data;
      setEstatisticasProjetos(estatisticasProjetos);
      const statusEmails = (await statusEmailsRequest()).data;
      setStatusEmails(statusEmails);

      setBoxesData([
        {
          value: statusEmails.funcionando ? "Emails OK" : "Emails Erro",
          title: "Último uso com Sucesso",
          subTitle: moment(statusEmails.ultimaUtilizacaoSucesso).format("LLL"),
          onClick: () => navigate("/configuracaoEmail"),
        },
        {
          value: estatisticasProjetos.projetosAbertos,
          title: "Projetos",
          subTitle: "Em Aberto",
        },
        {
          value: estatisticasProjetos.projetosAguardandoPagamento,
          title: "Projetos",
          subTitle: "Aguardando Pagamento",
        },
      ]);
    } catch (err) {
      setRequisicaoErro("Erro ao buscar dados iniciais");
    } finally {
      setIsLoading(false);
    }
  };

  const buildBoxes = (dados) => {
    return dados?.map((dado) => (
      <>
        <div
          className={`box ${dado.onClick ? "clickable" : ""}`}
          onClick={dado.onClick}
        >
          {isLoading && <Loader />}
          {!isLoading && statusEmails && (
            <>
              <div className="box-value">{dado.value}</div>
              <div className="box-title">{dado.title}</div>
              <div className="box-subTitle">{dado.subTitle}</div>
            </>
          )}
          {!isLoading && !statusEmails && (
            <div className="box-error">Erro ao carregar dados</div>
          )}
        </div>
      </>
    ));
  };

  return (
    <>
      <h1>Seja bem-vindo!</h1>
      <div className="boxes">{buildBoxes(boxesData)}</div>
      <h1>Projetos a vencer</h1>
      <Button value={'Listar todos os projetos'} onClick={() => navigate('/projetos')} />
      <Spacer height={16} />
      <DataTable
        headers={["Nome", "Data Limite", "Cliente", "Status/Sub Status"]}
        columnsRenderNames={[
          "nome",
          "dataLimite",
          "cliente",
          "status_sub_status",
        ]}
        data={estatisticasProjetos?.proximosProjetosVencer?.map((projeto) => {
          return {
            ...projeto,
            dataLimite: moment(projeto.dataLimite).format("L"),
            cliente: projeto.cliente?.razaoSocial,
            status_sub_status:
              translateStatus(projeto.status) +
              " / " +
              translateSubStatus(projeto.subStatus),
          };
        })}
      />
    </>
  );
};

export default HomePage;
