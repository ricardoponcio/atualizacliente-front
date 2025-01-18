/* eslint-disable react/prop-types */
import { useApiConfiguracaoS3 } from "api";
import FlexList from "components/form/FlexList";
import React, { useEffect, useState } from "react";
import Form from "../../form/Form";
import Input from "../../form/Input";

const AtualizaConfiguracaoS3 = ({
  configuracaoS3,
  callbackConfiguracaoAtualizada = () => {},
}) => {
  const { atualizaConfiguracao } = useApiConfiguracaoS3();
  const [s3ServiceEndpoint, setS3ServiceEndpoint] = useState("");
  const [s3Region, setS3Region] = useState("");
  const [s3BucketName, setS3BucketName] = useState("");
  const [prefixoBase, setPrefixoBase] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => resetaFormulario(), []);
  useEffect(() => resetaFormulario(), [configuracaoS3]);

  const resetaFormulario = () => {
    limparFormulario();
    setS3ServiceEndpoint(configuracaoS3.s3ServiceEndpoint || "");
    setS3Region(configuracaoS3.s3Region || "");
    setS3BucketName(configuracaoS3.s3BucketName || "");
    setPrefixoBase(configuracaoS3.prefixoBase || "");
  };

  const limparFormulario = () => {
    setS3ServiceEndpoint("");
    setS3Region("");
    setS3BucketName("");
    setPrefixoBase("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setRequisicaoErro("");
    try {
      const configuracaoAtualizada = await atualizaConfiguracao(
        configuracaoS3.id,
        {
          s3ServiceEndpoint,
          s3Region,
          s3BucketName,
          prefixoBase,
        }
      );
      callbackConfiguracaoAtualizada(configuracaoAtualizada.data);
      limparFormulario();
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem ||
          "Erro ao atualizar configuração de armazenamento"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Atualizar configuração de S3" onSubmit={onSubmitForm}>
        <FlexList labelValuePairs={true}>
          <label>Endereço do Serviço</label>
          <Input
            type="text"
            placeholder="s3.amazonaws.com"
            value={s3ServiceEndpoint}
            onChange={setS3ServiceEndpoint}
          />
          <label>Região</label>
          <Input
            type="text"
            placeholder="us-west-2"
            value={s3Region}
            onChange={setS3Region}
          />
          <label>Nome do Bucket</label>
          <Input
            type="text"
            placeholder="Nome do bucket"
            value={s3BucketName}
            onChange={setS3BucketName}
          />
          <label>Prefixo Base</label>
          <Input
            type="text"
            placeholder="Ex.: /, /arquivos, /atualizacliente, ..."
            value={prefixoBase}
            onChange={setPrefixoBase}
          />
        </FlexList>
        <h4>
          <i>Para alterar usuário e/ou senha, remova o registro e recrie</i>
        </h4>
        {carregando && <span>Carregando...</span>}
        {requisicaoErro && <span>{requisicaoErro}</span>}
      </Form>
    </>
  );
};

export default AtualizaConfiguracaoS3;
