import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApplicationProvider } from "./components/ApplicationProvider";
import { Application } from "./functions/Application";

const application = new Application()
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApplicationProvider application={application}>
      <App />
    </ApplicationProvider>
  </React.StrictMode>
);
