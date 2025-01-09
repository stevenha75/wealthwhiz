import React, { useState } from 'react';
import './SignInForm.css';
import { login } from '../services/authService'; // Import the login function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password); // Call the login function
      alert('Sign in successful!');
      navigate('/budget'); // Redirect to the budget page after success
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.');
    }
  };

  return (
    <div className="sign-in-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
