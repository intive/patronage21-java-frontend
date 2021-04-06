import React from 'react';
import App from './views/App';
import ReactDOM from 'react-dom';
import Home from './views/Home/Home';
import User from "./views/User/User";

ReactDOM.render(
  <React.StrictMode>
    <App Component={Home}/>
    <App Component={User}/>
  </React.StrictMode>,
  document.getElementById('root')
);
