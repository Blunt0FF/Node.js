import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAllUsers } from '../services/userService';
import { getTransactions, addTransaction } from '../services/transactionService';
import {
  Container, Typography, TextField, IconButton, Menu, MenuItem, Button,
  Paper, Stack, List, ListItem, ListItemText, Grid
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface User {
  _id: string;
  name: string;
  email: string;
  currentBalance: number;
  transactions: {
    _id: string;
    type: string;
    amount: number;
    date: string;
  }[];
}

interface JwtPayload {
  name: string;
  email: string;
}

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<User[0]['transactions']>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);

      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        const matchedUser = res.data.find((u: User) => u.email === decoded.email);
        setCurrentUser(matchedUser || null);
        setTransactions(matchedUser?.transactions || []);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleTransaction = async (delta: number) => {
    if (!currentUser) return;
    try {
      await addTransaction({ email: currentUser.email, amount: delta });
      await loadUsers();
      setAmount(0);
    } catch (err) {
      console.error('Transaction error:', err);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete');
      await loadUsers();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('name'), flex: 1 },
    { field: 'email', headerName: t('email'), flex: 1 },
    { field: 'currentBalance', headerName: t('balance'), type: 'number', flex: 1 },
  ];

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="h6">{t('welcome')}, {currentUser?.name || t('unknown_user')}</Typography>
        <div>
          <IconButton onClick={handleLangClick}>
            <LanguageIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleLangChange('ru')}>Русский</MenuItem>
            <MenuItem onClick={() => handleLangChange('en')}>English</MenuItem>
          </Menu>
          <Button variant="outlined" color="error" onClick={handleLogout} sx={{ ml: 2 }}>
            {t('logout')}
          </Button>
        </div>
      </Stack>

      {currentUser ? (
        <Paper sx={{ mt: 3, p: 2 }} elevation={3}>
          <Typography variant="h6" gutterBottom>{t('your_balance')}: {currentUser.currentBalance}</Typography>
          <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={8}>
              <TextField
                label={t('amount')}
                fullWidth
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth variant="contained" color="success" onClick={() => handleTransaction(amount)}>
                <AddIcon />
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth variant="contained" color="warning" onClick={() => handleTransaction(-amount)}>
                <RemoveIcon />
              </Button>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>{t('transactions')}</Typography>
          <List dense>
            {transactions.map(tx => (
              <ListItem key={tx._id} secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteTransaction(tx._id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText
                  primary={`${tx.type} — ${tx.amount}`}
                  secondary={new Date(tx.date).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography color="error" sx={{ mt: 3 }}>{t('welcome')} — пользователь не найден.</Typography>
      )}

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>{t('users')}</Typography>
      <TextField
        label={t('search')}
        fullWidth
        margin="normal"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredUsers.map(u => ({ id: u._id, ...u }))}
          columns={columns}
          pageSizeOptions={[5]}
        />
      </div>
    </Container>
  );
};

export default DashboardPage;