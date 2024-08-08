export const translateResultado = (resultado) => {
  const translateTable = {
    ["ENVIADO_SUCESSO"]: "Enviado com sucess",
    ["ENVIO_FALHOU"]: "Envio Falhou",
  };
  return translateTable[resultado] || resultado;
};
