import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const FormPage = () => {
  const [formValues, setFormValues] = useState({
    grossIncome: '',
    savings: '',
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
    navigate('/budget');
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
          <TextField
            label="Current Gross Income"
            variant="outlined"
            fullWidth
            name="grossIncome"
            value={formValues.grossIncome}
            onChange={handleChange}
            required
          />
          <TextField
            label="Savings"
            variant="outlined"
            fullWidth
            name="savings"
            value={formValues.savings}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default FormPage;