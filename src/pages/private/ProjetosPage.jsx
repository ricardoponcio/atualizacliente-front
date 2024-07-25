import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarProjetos } from "../../api";

const ProjetosPage = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);

  const goHome = () => navigate("/");

  useEffect(() => {
    (async () => {
      setProjetos((await listarProjetos()).data);
    })();
  }, []);

  return (
    <div>
      <button onClick={goHome}>Home</button>
      <h1>Projetos</h1>
      {projetos?.map((projeto, idx) => (
        <div key={`projeto-${idx}`}>
          <p>{projeto.nome}</p>
          <span>{projeto.descricao}</span>
        </div>
      ))}
    </div>
  );
};

export default ProjetosPage;
