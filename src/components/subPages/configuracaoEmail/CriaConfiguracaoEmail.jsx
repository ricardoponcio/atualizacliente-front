/* eslint-disable react/prop-types */
import { useApiConfiguracaoEmail } from "api";
import React, { useEffect, useState } from "react";
import Form from "../../form/Form";
import Input from "../../form/Input";
import CheckBox from "../../form/Checkbox";

const CriaConfiguracaoEmail = ({ callbackConfiguracaoCriada = () => {} }) => {
  const { criaConfiguracao } = useApiConfiguracaoEmail();
  const [smtpHost, setsmtpHost] = useState("");
  const [smtpPort, setsmtpPort] = useState(0);
  const [smtpSsl, setsmtpSsl] = useState(false);
  const [smtpAuth, setsmtpAuth] = useState(false);
  const [smtpUser, setsmtpUser] = useState("");
  const [smtpPassword, setsmtpPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => {
    limparFormulario();
  }, []);

  const limparFormulario = () => {
    setsmtpHost("");
    setsmtpPort(0);
    setsmtpSsl(false);
    setsmtpAuth(false);
    setsmtpUser("");
    setsmtpPassword("");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setRequisicaoErro("");
    try {
      const configuracaoCriada = await criaConfiguracao({
        smtpHost,
        smtpPort,
        smtpSsl,
        smtpAuth,
        smtpUser,
        smtpPassword,
      });
      callbackConfiguracaoCriada(configuracaoCriada.data);
      limparFormulario();
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem ||
          "Erro ao cadastrar configuração de email"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Criar" onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="Endereço SMTP"
          value={smtpHost}
          onChange={setsmtpHost}
        />
        <Input
          type="number"
          placeholder="Porta SMTP"
          value={smtpPort}
          onChange={setsmtpPort}
        />
        <CheckBox
          label="Usa SSL"
          value={smtpSsl}
          onChange={setsmtpSsl}
        />
        <CheckBox
          label="Autenticação"
          value={smtpAuth}
          onChange={setsmtpAuth}
        />
        <Input
          type="text"
          placeholder="Usuário SMTP"
          value={smtpUser}
          onChange={setsmtpUser}
        />
        <Input
          type="password"
          placeholder="Senha SMTP"
          value={smtpPassword}
          onChange={setsmtpPassword}
        />
        {carregando && <span>Carregando...</span>}
        {requisicaoErro && <span>{requisicaoErro}</span>}
      </Form>
    </>
  );
};

export default CriaConfiguracaoEmail;
