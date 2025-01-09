import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import SignInForm from './components/SignInForm'
import logo from './assets/logo.png'

function App() {

  return (
    <>
      <Header />
      <main>
        {/* <img src="/assets/logo.png" alt="Wealth Whiz Logo" className="logo-img me-3" /> */}
        <img src={logo} alt="Wealth Whiz Logo" className="logo-img me-3" />
        <SignInForm/>
      </main>
    </>
  );
};

export default App