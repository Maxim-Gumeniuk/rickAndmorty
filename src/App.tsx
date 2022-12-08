import React from 'react';
import {  Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.scss';

function App() {

  return (
    <div className="wrapper">
      <div className="top">
        <Header />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default App;
