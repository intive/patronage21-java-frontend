import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import Home from "./views/Home/Home";
import { makeServer } from "./mocks/server";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

ReactDOM.render(
  <React.StrictMode>
    <App Component={Home} />
  </React.StrictMode>,
  document.getElementById("root")
);
