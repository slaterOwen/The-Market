import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"; //import "@material/layout-grid"
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  color: {
    background: "#c8c2ae",
    main: "#2b4141",
    accent1: "#0eb1d2",
    accent2: "#34e4ea",
    accent3: "#8ab9b5",
  },
  palette: {
    accent1: "#73dff6",
    accent2: "#b46aff",
    // accent1: "#2196F3",
    // accent2: "#21CBF3",
    accent1Light: "#2196f385",
    lightGrey: "#dad7cd",
  },
});

ReactDOM.render(
  <>
    <CssBaseline />
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </>,
  document.getElementById("root")
);
