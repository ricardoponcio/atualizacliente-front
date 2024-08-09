/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import FlexList from "components/form/FlexList";
import "react-datepicker/dist/react-datepicker.css";
import AnexoProjetoArquivo from "./AnexoProjetoArquivo";

const InfoAnexoProjeto = ({ anexos, onBaixarAnexo = () => {} }) => {
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
              <AnexoProjetoArquivo
                anexo={anexo}
                onBaixarAnexo={onBaixarAnexo}
              />
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
