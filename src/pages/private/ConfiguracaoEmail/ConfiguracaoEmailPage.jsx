import { useApiConfiguracaoEmail, useApiEnvioEmail } from "api";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Drawer from "components/form/Drawer";
import Popup from "components/form/Popup";
import Spacer from "components/form/Spacer";
import AtualizaConfiguracaoEmail from "components/subPages/configuracaoEmail/AtualizarConfiguracaoEmail";
import CriaConfiguracaoEmail from "components/subPages/configuracaoEmail/CriaConfiguracaoEmail";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { translateResultado } from "utils/emailUtils";

const ConfiguracaoEmailPage = () => {
  const {
    listarConfiguracoes,
    removeConfiguracao: removerConfiguracaoRequest,
  } = useApiConfiguracaoEmail();
  const { ultimosEmails: ultimosEmailsRequest } = useApiEnvioEmail();
  const [ultimosEmails, setUltimosEmails] = useState([]);
  const [configuracoes, setConfiguracoes] = useState([]);
  const [configuracaoAtualizacao, setConfiguracaoAtualizacao] = useState("");
  const [configuracaoRemover, setConfiguracaoRemover] = useState("");
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
      setUltimosEmails((await ultimosEmailsRequest()).data);
      setConfiguracoes((await listarConfiguracoes()).data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao listar configurações de email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const iniciaAtualizacaoConfiguracao = (configuracao) => {
    setConfiguracaoAtualizacao(configuracao);
    abreDrawer();
  };

  const iniciaRemocaoConfiguracao = async (configuracao) => {
    setConfiguracaoRemover(configuracao);
    abrePopup();
  };

  const removeConfiguracao = async () => {
    setIsLoading(true);
    try {
      await removerConfiguracaoRequest(configuracaoRemover.id);
      atualizaDadosPagina();
    } catch (err) {
      //nothing
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ButtonGoBack />
      <h1>Configurações de E-mail</h1>
      {!isLoading && !requisicaoErro && configuracoes && (
        <>
          <Button
            value={"Novo"}
            disabled={configuracoes.length >= 1}
            onClick={() => {
              setConfiguracaoAtualizacao("");
              abreDrawer();
            }}
          />
          <Spacer height={16} />
          <DataTable
            headers={[
              "Endereço SMTP",
              "Porta SMTP",
              "Usa SSL",
              "Autenticação",
              "Último uso sucesso",
            ]}
            columnsRenderNames={[
              "smtpHost",
              "smtpPort",
              "smtpSsl",
              "smtpAuth",
              "ultimoUsoSucesso",
            ]}
            data={configuracoes?.map((configuracao) => {
              return {
                ...configuracao,
                smtpSsl: configuracao.smtpSsl ? "Sim" : "Não",
                smtpAuth: configuracao.smtpAuth ? "Sim" : "Não",
                ultimoUsoSucesso: configuracao.ultimoUsoSucesso
                  ? moment(configuracao.ultimoUsoSucesso).format("L")
                  : "N/A",
              };
            })}
            actionsPerRow={[
              {
                value: "Modificar",
                onClick: (event, row, idx) =>
                  iniciaAtualizacaoConfiguracao(configuracoes[idx]),
              },
              {
                value: "Remover",
                onClick: (event, row) => iniciaRemocaoConfiguracao(row),
              },
            ]}
          />
        </>
      )}
      {!isLoading && !requisicaoErro && configuracoes && (
        <>
          <Spacer height={16} />
          <hr />
          <h2>Últimos envios de email</h2>
          <DataTable
            headers={[
              "Processado Em",
              "Resultado",
              "Erro",
              "Endereço SMTP",
              "Porta SMTP",
              "Usa SSL",
              "Usa TLS",
              "Usa Autenticação",
              "Tipo do Envio",
            ]}
            columnsRenderNames={[
              "envioProcessadoEm",
              "resultado",
              "mensagemErro",
              "smtpHost",
              "smtpPort",
              "smtpSsl",
              "smtpTls",
              "smtpAuth",
              "tipo",
            ]}
            data={ultimosEmails?.map((ultimoEmail) => {
              return {
                ...ultimoEmail,
                resultado: translateResultado(ultimoEmail.resultado),
                smtpSsl: ultimoEmail.smtpSsl ? "Sim" : "Não",
                smtpTls: ultimoEmail.smtpTls ? "Sim" : "Não",
                smtpAuth: ultimoEmail.smtpAuth ? "Sim" : "Não",
                envioSolicitadoEm: ultimoEmail.envioSolicitadoEm
                  ? moment(ultimoEmail.envioSolicitadoEm).format("LLL")
                  : "N/A",
                envioProcessadoEm: ultimoEmail.envioProcessadoEm
                  ? moment(ultimoEmail.envioProcessadoEm).format("LLL")
                  : "N/A",
              };
            })}
          />
        </>
      )}
      {isLoading && <span>Carregando...</span>}
      {!isLoading && requisicaoErro && <span>{requisicaoErro}</span>}

      <Drawer
        customTitle={
          configuracaoAtualizacao
            ? "Modificar Configuração"
            : "Nova Configuração de E-mail"
        }
        isVisible={isDrawerOpen}
        onClose={fechaDrawer}
      >
        {!configuracaoAtualizacao && (
          <CriaConfiguracaoEmail
            callbackConfiguracaoCriada={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
          />
        )}
        {configuracaoAtualizacao && (
          <AtualizaConfiguracaoEmail
            callbackConfiguracaoAtualizada={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
            configuracaoEmail={configuracaoAtualizacao}
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
            onClick: () => removeConfiguracao(configuracaoRemover),
          },
          {
            value: "Não",
            onClick: () => {},
          },
        ]}
      >
        <span>Tem certeza que deseja remover esta configuração de e-mail?</span>
      </Popup>
    </div>
  );
};

export default ConfiguracaoEmailPage;
