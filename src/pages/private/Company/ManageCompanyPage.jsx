import Button from "components/form/Button";
import Loader from "components/form/Loader";
import { useAuth } from "context/authContext"; // Assuming you've already created this context
import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useApiCompany } from "api";
import "./ManageCompany.scss";
import Select from "components/form/Select";
import { useControlledApp } from "context/controlContext";

const ManageCompanyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { managedCompany } = useControlledApp();
  const { list: listCompaniesRequest } = useApiCompany();

  const handleManage = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Validate user credentials and perform login logic
      // For simplicity, let's assume successful login sets isLoggedIn to true
      await managedCompany(company.id); // Update with actual login logic
      redirect("/");
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
      setCompanies((await listCompaniesRequest()).data);
    } catch (err) {
      setError(
        err.response?.data?.mensagem ||
          "Error while loading list of companies"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="manage-company-wrapper">
      <div className="manage-company-container">
        <h1>ClothAI</h1>
        <h6>Hello {user.name}</h6>
        <Select
          value={company}
          placeholder="Select a company to manage"
          onChange={setCompany}
          firstOptionValue="Select..."
          options={companies}
        />
        {isLoading && <Loader />}
        {error && <span>{error}</span>}
        <Button onClick={handleManage} value={"Select"} />
      </div>
    </div>
  );
};

export default ManageCompanyPage;
