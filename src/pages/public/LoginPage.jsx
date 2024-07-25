// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // Assuming you've already created this context

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
    <div>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default LoginPage;
