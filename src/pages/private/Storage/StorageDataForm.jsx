/* eslint-disable react/prop-types */
import FlexList from "components/form/FlexList";
import Form from "components/form/Form";
import Input from "components/form/Input";
import React, { useEffect, useState } from "react";

const StorageDataForm = ({
  baseData,
  isUpdate = false,
  callback = () => {},
  loading = false,
  error,
}) => {
  const [serviceEndpoint, setServiceEndpoint] = useState("");
  const [region, setRegion] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [basePrefix, setBasePrefix] = useState("");

  useEffect(() => {
    limparFormulario();
  }, []);

  const limparFormulario = () => {
    const { serviceEndpoint, region, bucketName, basePrefix } = baseData || {};
    setServiceEndpoint(serviceEndpoint || "");
    setRegion(region || "");
    setAccessKey("");
    setSecretKey("");
    setBucketName(bucketName || "");
    setBasePrefix(basePrefix || "");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    callback({
      serviceEndpoint,
      region,
      accessKey,
      secretKey,
      bucketName,
      basePrefix,
    });
  };

  const formSubmitText = isUpdate ? "Update" : "Create";
  return (
    <>
      <Form
        loading={loading}
        submitText={formSubmitText}
        onSubmit={onSubmitForm}
      >
        <FlexList labelValuePairs={true}>
          <label>Service Address</label>
          <Input
            type="text"
            placeholder="s3.amazonaws.com"
            value={serviceEndpoint}
            onChange={setServiceEndpoint}
          />
          <label>Region</label>
          <Input
            type="text"
            placeholder="us-west-2"
            value={region}
            onChange={setRegion}
          />
          {!isUpdate && (
            <>
              <label>Access Key</label>
              <Input
                type="text"
                placeholder="AccessKey"
                value={accessKey}
                onChange={setAccessKey}
              />
              <label>Secret Key</label>
              <Input
                type="password"
                placeholder="Secret Key"
                value={secretKey}
                onChange={setSecretKey}
              />
            </>
          )}
          <label>Bucket Name</label>
          <Input
            type="text"
            placeholder="Nome do bucket"
            value={bucketName}
            onChange={setBucketName}
          />
          <label>Base Prefix</label>
          <Input
            type="text"
            placeholder="Eg.: /, /files, /resources, ..."
            value={basePrefix}
            onChange={setBasePrefix}
          />
        </FlexList>
        {error && <span>{error}</span>}
      </Form>
    </>
  );
};

export default StorageDataForm;
