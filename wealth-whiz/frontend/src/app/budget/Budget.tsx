import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Stack,
  Container,
  Grid2,
} from '@mui/material';
import PieChartSection from './PieChartSection';
import "./Budget.css";
import '@fontsource/roboto/500.css';

const BudgetPage = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Groceries', amount: 50 },
    { id: 2, description: 'Rent', amount: 1000 },
    { id: 3, description: 'Utilities', amount: 150 },
  ]);

  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '' });

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount) {
      setTransactions([
        ...transactions,
        {
          id: transactions.length + 1,
          description: newTransaction.description,
          amount: parseFloat(newTransaction.amount),
        },
      ]);
      setNewTransaction({ description: '', amount: '' });
    }
  };

  const pieChartData = transactions.map((transaction) => ({
    label: transaction.description,
    value: transaction.amount,
  }));

  useEffect(() => {
    // Load Botpress scripts dynamically
    const injectScript = document.createElement('script');
    injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

    const botScript = document.createElement('script');
    botScript.src = "https://files.bpcontent.cloud/2025/01/10/05/20250110053925-JR2JNBEM.js";
    botScript.async = true;
    document.body.appendChild(botScript);

    return () => {
      // Cleanup scripts
      document.body.removeChild(injectScript);
      document.body.removeChild(botScript);
    };
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          marginTop: '75px',
          fontWeight: 'bold',
          fontSize: '40px'
        }}
      >
        Your Personalized Budget Tracker
      </Typography>

      {/* Add Transaction Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" align="left"> Add Transaction</Typography>
        <Stack direction="row" spacing={6} sx={{ mt: 2}}>
          <TextField
            label="Description"
            variant="outlined"
            sx={{
              width: '1650px',
              '& .MuiInputBase-input': {
                color: 'white', // Text color for the input
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#90caf9', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#42a5f5', // Focused border color
                },
              },
            }}
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            sx={{
              width: '1250px',
              '& .MuiInputBase-input': {
                color: 'white', // Text color for the input
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Label color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#90caf9', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#42a5f5', // Focused border color
                },
              },
            }}
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddTransaction} sx={{
            backgroundColor: '#001A6E',
            '&:hover': {
              backgroundColor: '#074799', // Adjust hover color
            },
          }}>
            Add
          </Button>
        </Stack>
      </Box>

      {/* Transaction List and Pie Chart */}
      <Grid2 container spacing={6} sx={{ mt: 4, height: '400px' }}>
        {/* Transaction List */}
        <Grid2 size={6} xs={12} md={6}>
          <Box
            className="transaction-table-container"
            sx={{
              padding: '1rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              height: '350px',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h6" sx={{ color: 'black', fontSize: '30px' }}>Transactions Log</Typography>
            <TableContainer component={Paper} sx={{ mt: 2, height: 'calc(100% - 40px)'}}>
              <Table>
                <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '22px' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '22px' }} align="left">
                    Amount
                  </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{ fontSize: '20px', color: 'black' }}>
                    {transaction.description}
                  </TableCell>
                  <TableCell sx={{ fontSize: '20px', color: 'black' }} align="left">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid2>

        {/* Pie Chart */}
        <Grid2 size={6} xs={12} md={6}>
          <Box
            className="pie-chart-container"
            sx={{
              padding: '1rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '8px',
              height: '350px',
              width: '100%',
            }}
          >
            <PieChartSection data={pieChartData} />
          </Box>
        </Grid2>
      </Grid2>

      {/* Botpress Chatbot */}
      <div id="botpress-webchat-container" />
    </Container>
  );
};

export default BudgetPage;
