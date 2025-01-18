import { useApiStorage } from "api";
import Button from "components/form/Button";
import ButtonGoBack from "components/form/ButtonGoBack";
import DataTable from "components/form/DataTable";
import Spacer from "components/form/Spacer";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import StorageDataForm from "./StorageDataForm";

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { openYesNoPopup } from "components/external/YesNoPopupController";

const StoragePage = () => {
  const {
    get: getRequest,
    create: createRequest,
    update: updateRequest,
    remove: removeRequest,
  } = useApiStorage();
  const [configurations, setConfigurations] = useState([]);
  const [updateConfig, setUpdateConfig] = useState("");
  const [removeConfig, setRemoveConfig] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFormLoading, setIsDataFormLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataFormError, setDataFormError] = useState("");

  useEffect(() => {
    updatePage();
  }, []);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const updatePage = async () => {
    setIsLoading(true);
    setError("");
    try {
      setConfigurations((await getRequest()).data);
    } catch (err) {
      setError(
        err.response?.data?.mensagem ||
          "Error while loading storage configuration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const beginConfigUpdate = (config) => {
    setUpdateConfig(config);
    openDrawer();
  };

  const beginConfigRemove = async (config) => {
    setRemoveConfig(config);
    openYesNoPopup(null, 'Sure about it?',
      () => finishConfigRemove(removeConfig),
      () => {}
    )
  };

  const finishConfigRemove = async () => {
    setIsLoading(true);
    try {
      await removeRequest(removeConfig.id);
      updatePage();
    } catch (err) {
      //nothing
    }
    setIsLoading(false);
  };

  const handleCallback = (data) => {
    setDataFormError(null);
    setIsDataFormLoading(true);
    try {
      if (updateConfig) handleUpdateData(data);
      handleCreateData(data);
    } catch (error) {
      setDataFormError("Operation failed");
    } finally {
      setIsDataFormLoading(false);
    }
  };

  const handleCreateData = (data) => {
    createRequest(data);
  };

  const handleUpdateData = (data) => {
    updateRequest(updateConfig.id, data);
  };

  return (
    <div>
      <ButtonGoBack />
      <h1>Storage Configuration</h1>
      {!isLoading && !error && configurations && (
        <>
          <Button
            value={"New"}
            disabled={configurations.length >= 1}
            onClick={() => {
              setUpdateConfig("");
              openDrawer();
            }}
          />
          <Spacer height={16} />
          <DataTable
            headers={[
              "Service Address",
              "Region",
              "Bucket Name",
              "Base Prefix",
              "Created At",
            ]}
            columnsRenderNames={[
              "serviceEndpoint",
              "region",
              "bucketName",
              "basePrefix",
              "createdAt",
            ]}
            data={configurations?.map((config) => {
              return {
                ...config,
                createdAt: config.createdAt
                  ? moment(config.createdAt).format("L")
                  : "N/A",
              };
            })}
            actionsPerRow={[
              {
                value: "Update",
                onClick: (event, row, idx) =>
                  beginConfigUpdate(configurations[idx]),
              },
              {
                value: "Delete",
                onClick: (event, row) => beginConfigRemove(row),
              },
            ]}
          />
        </>
      )}
      {isLoading && <span>Loading...</span>}
      {!isLoading && error && <span>{error}</span>}

      <Drawer
        direction='right'
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <h1>{updateConfig ? "Update" : "New"}</h1>
        <StorageDataForm
          baseData={updateConfig}
          isUpdate={!!updateConfig}
          callback={handleCallback}
          error={dataFormError}
          loading={isDataFormLoading}
        />
      </Drawer>
    </div>
  );
};

export default StoragePage;
