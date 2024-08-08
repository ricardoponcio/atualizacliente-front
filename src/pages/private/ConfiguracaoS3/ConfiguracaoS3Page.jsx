import { useApiConfiguracaoS3 } from "api";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Drawer from "components/form/Drawer";
import Popup from "components/form/Popup";
import Spacer from "components/form/Spacer";
import AtualizaConfiguracaoS3 from "components/subPages/configuracaoS3/AtualizarConfiguracaoS3";
import CriaConfiguracaoS3 from "components/subPages/configuracaoS3/CriaConfiguracaoS3";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";

const ConfiguracaoS3Page = () => {
  const {
    listarConfiguracoes,
    removeConfiguracao: removerConfiguracaoRequest,
  } = useApiConfiguracaoS3();
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
      setConfiguracoes((await listarConfiguracoes()).data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem ||
          "Erro ao listar configurações de armazenamento"
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
      <h1>Configurações de Armazenamento</h1>
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
              "Endpoint do Serviço",
              "Região",
              "Nome do Bucket",
              "Prefixo Base",
              "Criado Em",
              "Último Uso Sucesso",
            ]}
            columnsRenderNames={[
              "s3ServiceEndpoint",
              "s3Region",
              "s3BucketName",
              "prefixoBase",
              "criadoEm",
              "ultimoUsoSucesso",
            ]}
            data={configuracoes?.map((configuracao) => {
              return {
                ...configuracao,
                ultimoUsoSucesso: configuracao.ultimoUsoSucesso
                  ? moment(configuracao.ultimoUsoSucesso).format("L")
                  : "N/A",
                criadoEm: configuracao.criadoEm
                  ? moment(configuracao.criadoEm).format("L")
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
      {isLoading && <span>Carregando...</span>}
      {!isLoading && requisicaoErro && <span>{requisicaoErro}</span>}

      <Drawer
        customTitle={
          configuracaoAtualizacao
            ? "Modificar configuração de Armazenamento"
            : "Nova configuração de Armazenamento"
        }
        isVisible={isDrawerOpen}
        onClose={fechaDrawer}
      >
        {!configuracaoAtualizacao && (
          <CriaConfiguracaoS3
            callbackConfiguracaoCriada={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
          />
        )}
        {configuracaoAtualizacao && (
          <AtualizaConfiguracaoS3
            callbackConfiguracaoAtualizada={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
            configuracaoS3={configuracaoAtualizacao}
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
        <span>
          Tem certeza que deseja remover esta configuração de armazenamento?
        </span>
      </Popup>
    </div>
  );
};

export default ConfiguracaoS3Page;
