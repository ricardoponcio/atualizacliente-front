import React, { useEffect } from "react";
import "./HomePage.scss";

const HomePage = () => {
  useEffect(() => {
    updatePage();
  }, []);

  const updatePage = async () => {};

  return (
    <>
      <h1>Welcome home</h1>
    </>
  );
};

export default HomePage;
