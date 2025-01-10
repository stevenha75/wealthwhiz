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
import '@fontsource/roboto/700.css';


const HomePage = () => (
  <main style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
    {/* Left Section: Logo */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <img
        src={logo}
        alt="Wealth Whiz Logo"
        style={{ width: '200%', maxWidth: '400px'}}
      />
      <hr style={{ width: '50%', border: '1px solid #ccc' }} />
      <p style={{ fontSize: '1.5rem', color: '#FFFF', textAlign: 'center' }}>
        Welcome to Wealth Whiz: <br /> Your personalized budget advisor.
      </p>
    </div>

    {/* Right Section: Sign-In Form */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <SignInForm />
    </div>
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