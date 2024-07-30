// src/pages/HomePage.jsx

import React from 'react';
import { useAuth } from 'context/authContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user, logout } = useAuth(); // Assuming you store user data in your context

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      {/* Display user-specific content */}
      <button onClick={logout}>Logout</button>
      <br />
      <Link to={'/projetos'}>Projetos</Link>
      <br />
      <Link to={'/clientes'}>Clientes</Link>
    </div>
  );
};

export default HomePage;
