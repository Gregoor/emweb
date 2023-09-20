import React from "react";
import ReactDOM from "react-dom/client";
import { jsx as _jsx } from "react/jsx-runtime";

import App from "./App.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  _jsx(React.StrictMode, { children: _jsx(App, {}) }),
);
