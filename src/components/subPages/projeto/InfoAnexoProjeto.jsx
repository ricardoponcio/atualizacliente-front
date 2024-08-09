/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import Button from "components/form/Button";
import FlexList from "components/form/FlexList";
import { filesize } from "filesize";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import "./InfoAnexoProjeto.scss";

const InfoAnexoProjeto = ({ anexos }) => {
  const [anexosSubList, setAnexosSubList] = useState([]);

  useEffect(() => {
    const perChunk = 2;
    setAnexosSubList(
      anexos.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, [])
    );
  }, [anexos]);

  return (
    <FlexList>
      {anexosSubList?.map((anexoSubList, rowIdx) => (
        <FlexList key={`anexo-row-${rowIdx}`} rowDirection={true}>
          {anexoSubList.map((anexo, itemIdx) => (
            <FlexList key={`anexo-row-${rowIdx}-item-${itemIdx}`}>
              <div className="anexo-item">
                <FlexList rowDirection={true}>
                  <span className="arquivo-item-nome">{anexo.arquivoNome}</span>
                  <span className="arquivo-item-tamanho">
                    {filesize(anexo.tamanho, { standard: "jedec" })}
                  </span>
                </FlexList>
                <span className="arquivo-item-origem">
                  Adicionado Por <b>{anexo.criadoPor.nome}</b> em{" "}
                  <b>{moment(anexo.criadoEm).format("LLL")}</b>
                </span>
                <div>
                  <Button value={"Baixar Anexo"} />
                </div>
              </div>
            </FlexList>
          ))}
        </FlexList>
      ))}
      {!anexosSubList ||
        (anexosSubList.length === 0 && <span>Nenhum anexo inserido</span>)}
    </FlexList>
  );
};

export default InfoAnexoProjeto;
