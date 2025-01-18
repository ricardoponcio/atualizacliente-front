import Button from "components/form/Button";
import Input from "components/form/Input";
import Loader from "components/form/Loader";
import { useAuth } from "context/authContext"; // Assuming you've already created this context
import React, { useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import "./Login.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, login } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Validate user credentials and perform login logic
      // For simplicity, let's assume successful login sets isLoggedIn to true
      await login(email, password); // Update with actual login logic
      redirect("/");
    } catch (err) {
      setError("Invalid user or password");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>ClothAI</h1>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
        {isLoading && <Loader />}
        {error && <span>{error}</span>}
        <Button onClick={handleLogin} value={"Login"} />
      </div>
    </div>
  );
};

export default LoginPage;
