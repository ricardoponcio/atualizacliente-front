// src/pages/HomePage.jsx

import { useAuth } from "context/authContext";
import React from "react";

const HomePage = () => {
  const { user } = useAuth(); // Assuming you store user data in your context

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
    </div>
  );
};

export default HomePage;
