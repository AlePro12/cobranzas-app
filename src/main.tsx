import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import App from "./App";
import NiceModal from "@ebay/nice-modal-react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";
import * as BackendAPI from "./backendAPI";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    {" "}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <NiceModal.Provider>
        <App />
        <Toaster />
      </NiceModal.Provider>
    </LocalizationProvider>
  </>
);
