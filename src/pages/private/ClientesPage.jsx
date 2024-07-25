import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarClientes } from "../../api";

const ClientesPage = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  const goHome = () => navigate("/");

  useEffect(() => {
    (async () => {
      setClientes((await listarClientes()).data);
    })();
  }, []);

  return (
    <div>
      <button onClick={goHome}>Home</button>
      <h1>Clientes</h1>
      {clientes?.map((cliente, idx) => (
        <div key={`cliente-${idx}`}>
          <p>{cliente.razaoSocial}</p>
          <span>{cliente.nomeFantasia}</span>
        </div>
      ))}
    </div>
  );
};

export default ClientesPage;
