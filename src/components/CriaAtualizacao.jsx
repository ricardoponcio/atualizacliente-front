/* eslint-disable react/prop-types */
import { useApiProjetos } from "api";
import React, { useEffect, useState } from "react";
import Form from "./form/Form";
import Input from "./form/Input";
import Select from "./form/Select";

const CriaAtualizacao = ({
  projeto,
  callbackAtualizacaoEmitida = () => {},
}) => {
  const { emitirAtualizacao } = useApiProjetos();
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [subStatus, setSubStatus] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => {
    limparFormulario();
  }, []);

  const limparFormulario = () => {
    setDescricao("");
    setStatus(projeto.status || "");
    setStatus(projeto.subStatus || "");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    try {
      const atualizacaoEmitida = await emitirAtualizacao(projeto.id, {
        descricao,
        status,
        subStatus,
      });
      limparFormulario();
      callbackAtualizacaoEmitida(atualizacaoEmitida.data);
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem || "Erro ao emitir atualização"
      );
    } finally {
      setCarregando(false);
    }
  };

  const getSubStatusFromStatus = (status) => {
    if (status == "Aberto") {
      return ["Na Fila", "Bloqueado", "Em Andamento", "Em Revisão"];
    } else if (status == "Concluído") {
      return ["Aguardando Pagamento", "Finalizado"];
    }
  };

  return (
    <>
      <Form autoWidth={true} submitText="Emitir" onSubmit={onSubmitForm}>
        <Select
          value={status}
          onChange={setStatus}
          options={["Aberto", "Concluído"]}
          selectOptionLabelFactory={(opcao) => opcao}
          selectOptionValueFactory={(opcao) => opcao}
        />
        <Select
          value={subStatus}
          onChange={setSubStatus}
          options={getSubStatusFromStatus(status)}
          selectOptionLabelFactory={(opcao) => opcao}
          selectOptionValueFactory={(opcao) => opcao}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={setDescricao}
        />
        {carregando && <span>Carregando...</span>}
        {requisicaoErro && <span>{requisicaoErro}</span>}
      </Form>
    </>
  );
};

export default CriaAtualizacao;
