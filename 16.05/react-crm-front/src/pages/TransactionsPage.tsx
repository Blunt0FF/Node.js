import { useEffect, useState } from 'react';
import { getTransactions, addTransaction } from '../services/transactionService';
import { getAllUsers } from '../services/userService';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Box,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

interface Transaction {
  _id: string;
  email: string;
  type: string;
  amount: number;
  date: string;
}

interface User {
  email: string;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState<number>(0);

  const loadData = async () => {
    try {
      const [txRes, usersRes] = await Promise.all([
        getTransactions(),
        getAllUsers()
      ]);
      setTransactions(txRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async () => {
    try {
      await addTransaction({ email, amount });
      await loadData();
      setAmount(0);
      setEmail('');
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Транзакции</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Email</InputLabel>
        <Select value={email} label="Email" onChange={e => setEmail(e.target.value)}>
          {users.map(u => (
            <MenuItem key={u.email} value={u.email}>{u.email}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        label="Сумма (+/-)"
        fullWidth
        margin="normal"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />

      <Button variant="contained" onClick={handleAdd}>Добавить</Button>

      <Box mt={4}>
        <Typography variant="h6">История</Typography>
        <List>
          {transactions.map(tx => (
            <ListItem key={tx._id} divider>
              <ListItemText
                primary={`${tx.email}: ${tx.type} — ${tx.amount}`}
                secondary={new Date(tx.date).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default TransactionsPage;