/* eslint-disable react/prop-types */
import { useApiConfiguracaoS3 } from "api";
import React, { useEffect, useState } from "react";
import Form from "../../form/Form";
import Input from "../../form/Input";

const CriaConfiguracaoS3 = ({ callbackConfiguracaoCriada = () => {} }) => {
  const { criaConfiguracao } = useApiConfiguracaoS3();
  const [s3ServiceEndpoint, setS3ServiceEndpoint] = useState("");
  const [s3Region, setS3Region] = useState("");
  const [s3AccessKey, setS3AccessKey] = useState("");
  const [s3SecretKey, setS3SecretKey] = useState("");
  const [s3BucketName, setS3BucketName] = useState("");
  const [prefixoBase, setPrefixoBase] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => {
    limparFormulario();
  }, []);

  const limparFormulario = () => {
    setS3ServiceEndpoint("");
    setS3Region("");
    setS3AccessKey("");
    setS3SecretKey("");
    setPrefixoBase("");
    setS3BucketName("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setRequisicaoErro("");
    try {
      const configuracaoCriada = await criaConfiguracao({
        s3ServiceEndpoint,
        s3Region,
        s3AccessKey,
        s3SecretKey,
        prefixoBase,
        s3BucketName
      });
      callbackConfiguracaoCriada(configuracaoCriada.data);
      limparFormulario();
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem ||
          "Erro ao cadastrar configuração de armazenamento"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Criar configuração de S3" onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="Endereço do serviço"
          value={s3ServiceEndpoint}
          onChange={setS3ServiceEndpoint}
        />
        <Input
          type="text"
          placeholder="Região"
          value={s3Region}
          onChange={setS3Region}
        />
        <Input
          type="text"
          placeholder="Chave de Acesso"
          value={s3AccessKey}
          onChange={setS3AccessKey}
        />
        <Input
          type="password"
          placeholder="Chave Secreta"
          value={s3SecretKey}
          onChange={setS3SecretKey}
        />
        <Input
          type="text"
          placeholder="Nome do Bucket"
          value={s3BucketName}
          onChange={setS3BucketName}
        />
        <Input
          type="text"
          placeholder="Prefixo base"
          value={prefixoBase}
          onChange={setPrefixoBase}
        />
        {carregando && <span>Carregando...</span>}
        {requisicaoErro && <span>{requisicaoErro}</span>}
      </Form>
    </>
  );
};

export default CriaConfiguracaoS3;
