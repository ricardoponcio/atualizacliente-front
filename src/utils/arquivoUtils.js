export const baixarArquivo = (arquivo, nomeArquivo) => {
  const url = window.URL.createObjectURL(new Blob([arquivo]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", nomeArquivo);

  document.body.appendChild(link);
  link.click();

  link.parentNode.removeChild(link);
};

export const extraiNomeArquivo = (respostaDownload) => {
  const contentDisposition = respostaDownload.headers["content-disposition"];
  return contentDisposition.match(/.*?filename="(.*?)"/)?.[1];
};
