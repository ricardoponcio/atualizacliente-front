/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import "./DataTable.scss";

const DataTable = ({
  headers = [],
  data = [],
  columnsRenderNames = [],
  actionsPerRow = [],
  customActionFactory,
}) => {
  const stringFromData = (data) => {
    return data instanceof Object ? JSON.stringify(data) : data;
  };

  const objectPropName2Render = (row, columnsEnabled) => {
    if (columnsEnabled && columnsEnabled.length > 0) {
      return Object.keys(row).filter((prop) =>
        columnsRenderNames.includes(prop)
      );
    } else {
      return Object.keys(row);
    }
  };

  return (
    <table className="my-custom-table">
      <thead className="my-custom-table-thead">
        <tr className="my-cystom-table-header-row">
          {headers?.map((header, idx) => (
            <th key={`header_${idx}`} className="my-custom-table-header-item">
              {header}
            </th>
          ))}
          {actionsPerRow && actionsPerRow.length > 0 && (
            <th className="my-custom-table-header-item" key={`header_actions`}>
              Ações
            </th>
          )}
        </tr>
      </thead>
      <tbody className="my-custom-table-tbody">
        {data?.map((row, idxRow) => (
          <tr key={`row_${idxRow}`} className="my-custom-table-row">
            {objectPropName2Render(row, columnsRenderNames).map(
              (value, idxCell) => (
                <td key={`cell_${idxCell}`} className="my-custom-table-cell">
                  {stringFromData(row[value])}
                </td>
              )
            )}
            {actionsPerRow && actionsPerRow.length > 0 && (
              <td
                key={`row_${idxRow}_actions`}
                className="my-custom-table-actions-cell"
              >
                {actionsPerRow?.map((action, idxAction) =>
                  customActionFactory ? (
                    customActionFactory(action, idxAction)
                  ) : (
                    <Button
                      key={`row_${idxRow}_action_${idxAction}`}
                      value={action.value}
                      onClick={(event) => action.onClick(event, row, idxRow)}
                    />
                  )
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
