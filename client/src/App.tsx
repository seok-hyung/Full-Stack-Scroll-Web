import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AppRoutes from './routes/index';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
