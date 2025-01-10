import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignInForm from './components/SignInForm';
import ProtectedRoute from './components/ProtectedRoute';
import BudgetPage from './app/budget/Budget';
import FormPage from './app/form/Form';
import logo from './assets/logo.png';
import { AuthProvider } from './context/AuthContext';

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
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <BudgetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;