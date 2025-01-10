import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';

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
      navigate('/form'); // Redirect to the budget page after success
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        padding: 3,
        borderRadius: 2,
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontFamily: 'Roboto, sans-serif',
          color: '#074799',
          fontWeight: '400',
        }}
      >
        Sign In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%', // Fix IE 11 issue.
          mt: 1,
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2, backgroundColor: '#074799', fontFamily: 'Roboto, sans-serif',}}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignInForm;