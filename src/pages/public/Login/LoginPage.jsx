import Button from "components/form/Button";
import Input from "components/form/Input";
import { useAuth } from "context/authContext"; // Assuming you've already created this context
import React, { useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import "./Login.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { user, login } = useAuth();

  const handleLogin = async () => {
    try {
      // Validate user credentials and perform login logic
      // For simplicity, let's assume successful login sets isLoggedIn to true
      await login(email, senha); // Update with actual login logic
      redirect("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Atualiza Cliente</h1>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={setSenha}
        />
        <Button onClick={handleLogin} value={"Entrar"} />
      </div>
    </div>
  );
};

export default LoginPage;
