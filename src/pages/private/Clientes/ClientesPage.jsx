import { useApiCliente } from "api";
import AtualizaCliente from "components/AtualizaCliente";
import CriaCliente from "components/CriaCliente";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Drawer from "components/form/Drawer";
import Popup from "components/form/Popup";
import Spacer from "components/Spacer";
import React, { useEffect, useState } from "react";

const ClientesPage = () => {
  const { listarClientes, removeCliente: removerClienteRequest } =
    useApiCliente();
  const [clientes, setClientes] = useState([]);
  const [clienteAtualizacao, setClienteAtualizacao] = useState("");
  const [clienteRemover, setClienteRemover] = useState("");
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
      setClientes((await listarClientes()).data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao listar clientes"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const iniciaAtualizacaoCliente = (cliente) => {
    setClienteAtualizacao(cliente);
    abreDrawer();
  };

  const iniciaRemocaoCliente = async (cliente) => {
    setClienteRemover(cliente);
    abrePopup();
  };

  const removeCliente = async () => {
    setIsLoading(true);
    try {
      await removerClienteRequest(clienteRemover.id);
      atualizaDadosPagina();
    } catch (err) {
      //nothing
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ButtonGoBack />
      <h1>Clientes</h1>
      {!isLoading && !requisicaoErro && (
        <>
          <Button
            value={"Novo"}
            onClick={() => {
              setClienteAtualizacao("");
              abreDrawer();
            }}
          />
          <Spacer height={16} />
          <DataTable
            headers={["Razão Social", "Nome Fantasia", "CNPJ", "E-mail"]}
            columnsRenderNames={[
              "razaoSocial",
              "nomeFantasia",
              "cnpj",
              "email",
            ]}
            data={clientes}
            actionsPerRow={[
              {
                value: "Modificar",
                onClick: (event, row) => iniciaAtualizacaoCliente(row),
              },
              {
                value: "Remover",
                onClick: (event, row) => iniciaRemocaoCliente(row),
              },
            ]}
          />
        </>
      )}
      {isLoading && <span>Carregando...</span>}
      {!isLoading && requisicaoErro && <span>{requisicaoErro}</span>}

      <Drawer
        customTitle={
          clienteAtualizacao ? "Modificar Cliente" : "Criar Novo Cliente"
        }
        isVisible={isDrawerOpen}
        onClose={fechaDrawer}
      >
        {!clienteAtualizacao && (
          <CriaCliente
            callbackClienteCriado={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
          />
        )}
        {clienteAtualizacao && (
          <AtualizaCliente
            callbackClienteAtualizado={() => {
              fechaDrawer();
              atualizaDadosPagina();
            }}
            cliente={clienteAtualizacao}
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
            onClick: () => removeCliente(clienteRemover),
          },
          {
            value: "Não",
            onClick: () => {},
          },
        ]}
      >
        <span>Tem certeza que deseja remover este cliente?</span>
      </Popup>
    </div>
  );
};

export default ClientesPage;
