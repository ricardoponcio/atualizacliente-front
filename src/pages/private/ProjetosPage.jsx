import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiProjetos } from "../../api";
import AtualizaProjeto from "../../components/AtualizaProjeto";
import CriaProjeto from "../../components/CriaProjeto";

const ProjetosPage = () => {
  const navigate = useNavigate();
  const { listarProjetos, removeProjeto } = useApiProjetos();
  const [projetos, setProjetos] = useState([]);
  const [projetoAtualizacao, setProjetoAtualizacao] = useState("");

  const goHome = () => navigate("/");

  useEffect(() => {
    atualizaDadosPagina();
  }, []);

  const atualizaDadosPagina = async () => {
    setProjetos((await listarProjetos()).data);
  };

  const iniciaAtualizacaoProjeto = (projeto) => {
    setProjetoAtualizacao(projeto);
  };

  const iniciaRemocaoProjeto = async (projeto) => {
    await removeProjeto(projeto.id);
    atualizaDadosPagina();
  };

  return (
    <div>
      <button onClick={goHome}>Home</button>
      <h1>Projetos</h1>
      {projetos?.map((projeto, idx) => (
        <div key={`projeto-${idx}`}>
          <p>{projeto.nome}</p>
          <span>{projeto.descricao}</span>
          <button
            type="button"
            onClick={() => iniciaAtualizacaoProjeto(projeto)}
          >
            Modificar
          </button>
          <button type="button" onClick={() => iniciaRemocaoProjeto(projeto)}>
            Deletar
          </button>
        </div>
      ))}
      <CriaProjeto callbackProjetoCriado={atualizaDadosPagina} />
      {projetoAtualizacao && (
        <AtualizaProjeto
          callbackProjetoAtualizado={atualizaDadosPagina}
          projeto={projetoAtualizacao}
        />
      )}
    </div>
  );
};

export default ProjetosPage;
