/* eslint-disable react/prop-types */
import { useApiProjetos } from "api";
import Badge from "components/form/Badge";
import FlexList from "components/form/FlexList";
import HtmlEditor from "components/form/HtmlEditor";
import InputFile from "components/form/InputFile";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { translateStatus, translateSubStatus } from "utils/projetoUtils";
import Box from "../../../form/Box";
import Form from "../../../form/Form";
import Select from "../../../form/Select";
import "./CriaAtualizacao.scss";

const CriaAtualizacao = ({
  projeto,
  callbackAtualizacaoEmitida = () => {},
}) => {
  const { emitirAtualizacaoComAnexos } = useApiProjetos();
  const [descricao, setDescricao] = useState();
  const [status, setStatus] = useState("");
  const [subStatus, setSubStatus] = useState("");
  const [anexo, setAnexo] = useState("");
  const [anexos, setAnexos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => {
    limparFormulario();
  }, []);

  const limparFormulario = () => {
    setDescricao("");
    setStatus(translateStatus(projeto.status) || "");
    setSubStatus(translateSubStatus(projeto.subStatus) || "");
    setAnexo("");
    setAnexos([]);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    try {
      const atualizacaoEmitida = await emitirAtualizacaoComAnexos(
        projeto.id,
        {
          descricao,
          status,
          subStatus,
        },
        anexos
      );
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

  useEffect(
    () => setAnexos((anexos) => [...anexos, anexo].filter((anexo) => !!anexo)),
    [anexo]
  );
  useEffect(() => setAnexo(""), [anexos]);

  const removeAnexo = (idxRemover) => {
    setAnexos((anexos) => anexos.filter((_, idx) => idx !== idxRemover));
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
        <FlexList>
          <Box fixedWidth={100}>
            <InputFile value="Inserir Anexo" onSelectFile={setAnexo} />
          </Box>
          {anexos.length > 0 && (
            <FlexList rowDirection={true}>
              {anexos.map((anexo, idx) => (
                <FlexList key={`anexo_${idx}`} rowDirection={true}>
                  <Badge
                    value="X"
                    color={"red"}
                    clickable
                    onClick={() => removeAnexo(idx)}
                  />
                  <span>{anexo.name}</span>
                </FlexList>
              ))}
            </FlexList>
          )}
        </FlexList>
        {carregando && <span>Carregando...</span>}
        {requisicaoErro && <span>{requisicaoErro}</span>}
      </Form>
    </>
  );
};

export default CriaAtualizacao;
