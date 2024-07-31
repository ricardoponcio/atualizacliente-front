import { useApiProjetos } from "api";
import AtualizaProjeto from "components/AtualizaProjeto";
import CriaProjeto from "components/CriaProjeto";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Drawer from "components/form/Drawer";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ProjetosPage = () => {
  const { listarProjetos, removeProjeto } = useApiProjetos();
  const [projetos, setProjetos] = useState([]);
  const [projetoAtualizacao, setProjetoAtualizacao] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    atualizaDadosPagina();
  }, []);

  const fechaDrawer = () => setIsDrawerOpen(false);
  const abreDrawer = () => setIsDrawerOpen(true);

  const atualizaDadosPagina = async () => {
    setProjetos((await listarProjetos()).data);
  };

  const iniciaAtualizacaoProjeto = (projeto) => {
    setProjetoAtualizacao(projeto);
    setIsDrawerOpen(true);
  };

  const iniciaRemocaoProjeto = async (projeto) => {
    console.log(projeto);
    await removeProjeto(projeto.id);
    atualizaDadosPagina();
  };

  return (
    <div>
      <ButtonGoBack />
      <h1>Projetos</h1>
      <Button value={"Novo"} onClick={abreDrawer} />
      <DataTable
        headers={["Nome", "Decrição", "Valor (R$)", "Data Limite", "Cliente"]}
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
            onClick: (event, row) => iniciaAtualizacaoProjeto(row),
          },
          {
            value: "Remover",
            onClick: (event, row) => iniciaRemocaoProjeto(row),
          },
        ]}
      />

      <Drawer isVisible={isDrawerOpen} onClose={fechaDrawer}>
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
    </div>
  );
};

export default ProjetosPage;
