/* eslint-disable react/prop-types */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useApiProjetos } from "../api";

const AtualizaProjeto = ({ projeto, callbackProjetoAtualizado = () => {} }) => {
  const { atualizaProjeto } = useApiProjetos();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [dataLimite, setDataLimite] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    limparFormulario();
    setNome(projeto.nome || '');
    setDescricao(projeto.descricao || '');
    setValor(projeto.valor || '');
    setDataLimite(projeto.dataLimite || '');
  }, []);

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setValor(0);
    setDataLimite("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    try {
      const projetoCriado = await atualizaProjeto(projeto.id, {
        nome,
        descricao,
        valor,
        dataLimite: moment(dataLimite).utc().format(),
      });
      callbackProjetoAtualizado(projetoCriado.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
    limparFormulario();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor (R$)"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <input
        type="date"
        placeholder="Data Limite"
        value={dataLimite}
        onChange={(e) => setDataLimite(e.target.value)}
      />
      <button type="submit">Atualizar</button>
      {carregando && <span>Carregando...</span>}
    </form>
  );
};

export default AtualizaProjeto;
