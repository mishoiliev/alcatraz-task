import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./style.css";

//creating a theme for mui
const theme = createTheme({
  palette: {
    primary: {
      light: "#ff784e",
      main: "rgb(255, 69, 0)",
      dark: "#b23c17",
      contrastText: "#fff",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
