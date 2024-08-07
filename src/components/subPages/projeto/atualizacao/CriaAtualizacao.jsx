/* eslint-disable react/prop-types */
import { useApiProjetos } from "api";
import HtmlEditor from "components/form/HtmlEditor";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Box from "../../../form/Box";
import Form from "../../../form/Form";
import Select from "../../../form/Select";

const CriaAtualizacao = ({
  projeto,
  callbackAtualizacaoEmitida = () => {},
}) => {
  const { emitirAtualizacao } = useApiProjetos();
  const [descricao, setDescricao] = useState();
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
    setSubStatus(projeto.subStatus || "");
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
        <Box fixedWidth={200}>
          <Select
            value={status}
            onChange={setStatus}
            options={["Aberto", "Concluído"]}
            selectOptionLabelFactory={(opcao) => opcao}
            selectOptionValueFactory={(opcao) => opcao}
          />
        </Box>
        <Box fixedWidth={200}>
          <Select
            value={subStatus}
            onChange={setSubStatus}
            options={getSubStatusFromStatus(status)}
            selectOptionLabelFactory={(opcao) => opcao}
            selectOptionValueFactory={(opcao) => opcao}
          />
        </Box>
        <HtmlEditor valor={descricao} onChange={setDescricao} />
        {carregando && <span>Carregando...</span>}
        {requisicaoErro && <span>{requisicaoErro}</span>}
      </Form>
    </>
  );
};

export default CriaAtualizacao;