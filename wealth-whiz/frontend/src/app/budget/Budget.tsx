import React, { useState } from 'react';
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


  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Budget Management
      </Typography>
  
      {/* Add Transaction Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Add Transaction</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            fullWidth
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleAddTransaction}>
            Add
          </Button>
        </Stack>
      </Box>
  
      {/* Transaction List and Pie Chart */}
      <Grid2 container spacing={4} sx={{ mt: 4 }}>
        {/* Transaction List */}
        <Grid2 size={6} xs={12} md={6}>
          <Box
            className="transaction-table-container"
            sx={{
              padding: '1.5rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              height: '100%',
            }}
          >
            <Typography variant="h6">Transaction List</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell align="right">${transaction.amount.toFixed(2)}</TableCell>
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
              padding: '1.5rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <PieChartSection data={pieChartData} />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default BudgetPage;
