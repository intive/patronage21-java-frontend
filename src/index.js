import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import Home from './views/Home/Home';

ReactDOM.render(
  <React.StrictMode>
    <App Component={Home}/>
  </React.StrictMode>,
  document.getElementById('root')
);

