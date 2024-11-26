

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Teste from './components/teste';



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/about" element={<Teste />} />
      {/* Adicione suas rotas aqui */}
    </Routes>
  </Router>,
  document.getElementById('root')
);

