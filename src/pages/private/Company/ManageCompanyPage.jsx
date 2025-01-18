import { useApiCompany } from "api";
import Button from "components/form/Button";
import Loader from "components/form/Loader";
import Select from "components/form/Select";
import { useAuth } from "context/authContext";
import { useControlledApp } from "context/controlContext";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./ManageCompany.scss";

const ManageCompanyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyChoose, setCompanyChoose] = useState("");
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  const { company } = useAuth();
  const { managedCompany } = useControlledApp();
  const { list: listCompaniesRequest } = useApiCompany();

  const handleManage = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Validate user credentials and perform login logic
      // For simplicity, let's assume successful login sets isLoggedIn to true
      await managedCompany(JSON.parse(companyChoose)); // Update with actual login logic
    } catch (err) {
      setError("There is a problem selecting the company...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updatePage();
  }, []);

  const updatePage = async () => {
    setIsLoading(true);
    setError("");
    try {
      const companiesRequest = await listCompaniesRequest();
      setCompanies(companiesRequest.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensagem || "Error while loading list of companies"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (company) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="manage-company-wrapper">
      <div className="manage-company-container">
        <h1>ClothAI</h1>
        <span>Choose a company to manage</span>
        <Select
          value={companyChoose}
          placeholder="Select a company to manage"
          onChange={setCompanyChoose}
          firstOptionValue="Select..."
          options={companies}
          selectOptionLabelFactory={(company) => company.name}
          selectOptionValueFactory={(company) => JSON.stringify(company)}
        />
        {isLoading && <Loader />}
        {error && <span>{error}</span>}
        <Button onClick={handleManage} value={"Select"} />
      </div>
    </div>
  );
};

export default ManageCompanyPage;
