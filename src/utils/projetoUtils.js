export const translateStatus = (status) => {
  const translateTable = {
    ["ABERTO"]: "Aberto",
    ["CONCLUIDO"]: "Concluído",
  };
  return translateTable[status] || status;
};

export const translateSubStatus = (subStatus) => {
  const translateTable = {
    ["NA_FILA"]: "Na Fila",
    ["BLOQUEADO"]: "Bloqueado",
    ["EM_ANDAMENTO"]: "Em Andamento",
    ["EM_REVISAO"]: "Em Revisão",
    ["AGUARDANDO_PAGAMENTO"]: "Aguardando Pagamento",
    ["FINALIZADO"]: "Finalizado",
  };
  return translateTable[subStatus] || subStatus;
};
