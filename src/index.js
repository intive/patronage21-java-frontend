import React from "react";
import App from "./views/App";
import ReactDOM from "react-dom";
import Home from "./views/Home/Home";
import User from "./views/User/User";
import UserEdit from "./views/User/UserEdit";

ReactDOM.render(
  <React.StrictMode>
    <App Component={Home} />
    <App Component={User} />
    <App Component={UserEdit} />
  </React.StrictMode>,
  document.getElementById("root")
);
