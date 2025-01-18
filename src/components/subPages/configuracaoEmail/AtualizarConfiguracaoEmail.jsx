/* eslint-disable react/prop-types */
import { useApiConfiguracaoEmail } from "api";
import FlexList from "components/form/FlexList";
import React, { useEffect, useState } from "react";
import CheckBox from "../../form/Checkbox";
import Form from "../../form/Form";
import Input from "../../form/Input";

const AtualizaConfiguracaoEmail = ({
  configuracaoEmail,
  callbackConfiguracaoAtualizada = () => {},
}) => {
  const { atualizaConfiguracao } = useApiConfiguracaoEmail();
  const [smtpHost, setsmtpHost] = useState("");
  const [smtpPort, setsmtpPort] = useState(0);
  const [smtpSsl, setsmtpSsl] = useState(false);
  const [smtpTls, setsmtpTls] = useState(false);
  const [smtpAuth, setsmtpAuth] = useState(false);
  const [enviarDe, setEnviarDe] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicaoErro, setRequisicaoErro] = useState("");

  useEffect(() => resetaFormulario(), []);
  useEffect(() => resetaFormulario(), [configuracaoEmail]);

  const resetaFormulario = () => {
    limparFormulario();
    setsmtpHost(configuracaoEmail.smtpHost || "");
    setsmtpPort(configuracaoEmail.smtpPort || 0);
    setsmtpSsl(configuracaoEmail.smtpSsl || false);
    setsmtpTls(configuracaoEmail.smtpTls || false);
    setsmtpAuth(configuracaoEmail.smtpAuth || false);
    setEnviarDe(configuracaoEmail.enviarDe || "");
  };

  const limparFormulario = () => {
    setsmtpHost("");
    setsmtpPort(0);
    setsmtpSsl(false);
    setsmtpTls(false);
    setsmtpAuth(false);
    setEnviarDe("");
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
          smtpTls,
          smtpAuth,
          enviarDe,
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
          <label>Endereço Email Origem</label>
          <Input
            type="text"
            placeholder="meuemail@companhia.com.br"
            value={enviarDe}
            onChange={setEnviarDe}
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

export default AtualizaConfiguracaoEmail;
