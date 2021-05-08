import React from "react";
import App from "./views/App";
import ReactDOM from "react-dom";
import Home from "./views/Home";
import UserEdit from "./views/UserEdit";

ReactDOM.render(
  <React.StrictMode>
    <App Component={Home} />
    <App Component={UserEdit} />
  </React.StrictMode>,
  document.getElementById("root")
);
