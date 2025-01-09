import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignInForm from './components/SignInForm';
import BudgetPage from './app/budget/Budget';
import logo from './assets/logo.png';

const HomePage = () => (
  <main>
    <div className="logo-section">
      <img src={logo} alt="Wealth Whiz Logo" className="logo-img me-3" />
    </div>
    <SignInForm />
  </main>
);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </Router>
  );
}


export default App