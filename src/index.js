import { ControlProvider } from "context/controlContext.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.js";
import Popup from "components/form/Popup.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ControlProvider>
          <App />
        </ControlProvider>
      </AuthProvider>
      <Popup
        closeBtn={true}
        closeHtml={null}
        defaultOk="Ok"
        defaultCancel="Cancel"
        wildClasses={false}
        escToClose={true}
      />
    </BrowserRouter>
  </React.StrictMode>
);
