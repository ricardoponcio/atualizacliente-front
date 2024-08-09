/* eslint-disable react/prop-types */
import { useApiConfiguracaoEmail } from "api";
import FlexList from "components/form/FlexList";
import React, { useEffect, useState } from "react";
import CheckBox from "../../form/Checkbox";
import Form from "../../form/Form";
import Input from "../../form/Input";

const CriaConfiguracaoEmail = ({ callbackConfiguracaoCriada = () => {} }) => {
  const { criaConfiguracao } = useApiConfiguracaoEmail();
  const [smtpHost, setsmtpHost] = useState("");
  const [smtpPort, setsmtpPort] = useState(0);
  const [smtpSsl, setsmtpSsl] = useState(false);
  const [smtpTls, setsmtpTls] = useState(false);
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
    setsmtpTls(false);
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
        smtpTls,
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
        <FlexList labelValuePairs={true}>
          <label>Endereço SMTP</label>
          <Input
            type="text"
            placeholder="DNS ou IP"
            value={smtpHost}
            onChange={setsmtpHost}
          />
          <label>Porta SMTP</label>
          <Input
            type="number"
            placeholder="Ex.: 25, 487, ..."
            value={smtpPort}
            onChange={setsmtpPort}
          />
          <CheckBox label="Usa SSL" value={smtpSsl} onChange={setsmtpSsl} />
          <CheckBox label="Usa TLS" value={smtpTls} onChange={setsmtpTls} />
          <CheckBox
            label="Autenticação"
            value={smtpAuth}
            onChange={setsmtpAuth}
          />
          {smtpAuth && (
            <>
              <label>Usuário SMTP</label>
              <Input
                type="text"
                placeholder="usuário autenticação"
                value={smtpUser}
                onChange={setsmtpUser}
              />
              <label>Senha SMTP</label>
              <Input
                type="password"
                placeholder="senha autenticação"
                value={smtpPassword}
                onChange={setsmtpPassword}
              />
            </>
          )}
        </FlexList>
        {carregando && <span>Carregando...</span>}
        {requisicaoErro && <span>{requisicaoErro}</span>}
      </Form>
    </>
  );
};

export default CriaConfiguracaoEmail;
