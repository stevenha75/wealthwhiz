import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Stack, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlaidLinkButton from '../../components/PlaidLinkButton';

const FormPage = () => {
  const [formValues, setFormValues] = useState({ grossIncome: '' });
  const [isBankLinked, setIsBankLinked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePlaidSuccess = () => {
    console.log('Bank linked successfully.');
    setIsBankLinked(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.grossIncome || !isBankLinked) {
      alert('Please enter your gross income and link your bank account.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/generate-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grossIncome: formValues.grossIncome,
          transactions: [
            { category: 'Groceries', amount: 250 },
            { category: 'Rent', amount: 1200 },
            { category: 'Entertainment', amount: 200 },
            { category: 'Transportation', amount: 150 },
            { category: 'Savings', amount: 500 },
          ],
        }),
      });

      if (!response.ok) throw new Error('Failed to generate budget.');

      const data = await response.json();
      console.log('Budget generated:', data.budget);

      navigate('/budget', {
        state: {
          budget: data.budget,
        },
      });
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while generating your budget. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{color: "#ECECEC"}} >
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
          <TextField
            label="Current Gross Income"
            variant="outlined"
            fullWidth
            name="grossIncome"
            value={formValues.grossIncome}
            onChange={handleChange}
            required
          />
          <PlaidLinkButton onSuccess={handlePlaidSuccess} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!formValues.grossIncome || !isBankLinked || isLoading}
            startIcon={isLoading && <CircularProgress size={20} />}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default FormPage;
