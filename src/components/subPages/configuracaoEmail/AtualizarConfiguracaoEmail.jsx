/* eslint-disable react/prop-types */
import { useApiConfiguracaoEmail } from "api";
import React, { useEffect, useState } from "react";
import Form from "../../form/Form";
import Input from "../../form/Input";
import CheckBox from "../../form/Checkbox";

const AtualizaConfiguracaoEmail = ({
  configuracaoEmail,
  callbackConfiguracaoAtualizada = () => {},
}) => {
  const { atualizaConfiguracao } = useApiConfiguracaoEmail();
  const [smtpHost, setsmtpHost] = useState("");
  const [smtpPort, setsmtpPort] = useState(0);
  const [smtpSsl, setsmtpSsl] = useState(false);
  const [smtpAuth, setsmtpAuth] = useState(false);
  const [smtpUser, setsmtpUser] = useState("");
  const [smtpPassword, setsmtpPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => resetaFormulario(), []);
  useEffect(() => resetaFormulario(), [configuracaoEmail]);

  const resetaFormulario = () => {
    limparFormulario();
    setsmtpHost(configuracaoEmail.smtpHost || "");
    setsmtpPort(configuracaoEmail.smtpPort || 0);
    setsmtpSsl(configuracaoEmail.smtpSsl || false);
    setsmtpAuth(configuracaoEmail.smtpAuth || false);
    setsmtpUser(configuracaoEmail.smtpUser || "");
    setsmtpPassword(configuracaoEmail.smtpPassword || "");
  };

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
      const configuracaoAtualizada = await atualizaConfiguracao(
        configuracaoEmail.id,
        {
          smtpHost,
          smtpPort,
          smtpSsl,
          smtpAuth,
          smtpUser,
          smtpPassword,
        }
      );
      callbackConfiguracaoAtualizada(configuracaoAtualizada.data);
      limparFormulario();
    } catch (err) {
      setRequisicaoErro(
        err.response?.data?.mensagem ||
          "Erro ao atualizar configuração de email"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Form submitText="Atualizar" onSubmit={onSubmitForm}>
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
        <CheckBox label="Usa SSL" value={smtpSsl} onChange={setsmtpSsl} />
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

export default AtualizaConfiguracaoEmail;
