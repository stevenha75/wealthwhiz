import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlaidLinkButton from '../../components/PlaidLinkButton';

const FormPage = () => {
  const [formValues, setFormValues] = useState({
    grossIncome: '',
  });
  const [isBankLinked, setIsBankLinked] = useState(false); // Track if bank account is linked
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle Plaid success (simulate bank linking)
  const handlePlaidSuccess = () => {
    console.log('Bank linked successfully.');
    setIsBankLinked(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure both gross income is entered and bank is linked
    if (!formValues.grossIncome || !isBankLinked) {
      alert('Please enter your gross income and link your bank account.');
      return;
    }

    // Set loading state to prevent multiple submissions
    setIsLoading(true);

    console.log('Form submitted:', formValues);

    // Simulate hardcoded transaction data
    const transactions = [
      { category: 'Groceries', amount: 250 },
      { category: 'Rent', amount: 1200 },
      { category: 'Entertainment', amount: 200 },
      { category: 'Transportation', amount: 150 },
      { category: 'Savings', amount: 500 },
    ];

    try {
      // Send data to the backend for budget generation
      const response = await fetch('http://localhost:8000/api/generate-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grossIncome: formValues.grossIncome,
          transactions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate budget.');
      }

      const data = await response.json();
      console.log('Budget generated:', data.budget);

      // Navigate to the budget page with budget data
      navigate('/budget', {
        state: {
          grossIncome: formValues.grossIncome,
          transactions,
          budget: data.budget,
        },
      });
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while generating your budget. Please try again.');
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Tell us about you and your goals so we can help you get there:
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Stack spacing={3}>
          {/* Input for gross income */}
          <TextField
            label="Current Gross Income"
            variant="outlined"
            fullWidth
            name="grossIncome"
            value={formValues.grossIncome}
            onChange={handleChange}
            required
          />

          {/* Plaid Link Button */}
          <PlaidLinkButton onSuccess={handlePlaidSuccess} />

          {/* Submit button with loading spinner */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!formValues.grossIncome || !isBankLinked || isLoading} // Disable button when loading
            startIcon={isLoading && <CircularProgress size={20} />} // Show spinner
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default FormPage;
