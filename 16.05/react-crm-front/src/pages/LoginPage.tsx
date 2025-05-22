import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Box, Alert, IconButton, Menu, MenuItem
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { login } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleLangClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка авторизации');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="right">
        <IconButton onClick={handleLangClick}>
          <LanguageIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => handleLangChange('ru')}>Русский</MenuItem>
          <MenuItem onClick={() => handleLangChange('en')}>English</MenuItem>
        </Menu>
      </Box>

      <Typography variant="h4" gutterBottom>{t('login')}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t('email')}
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label={t('password')}
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          {t('submit')}
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
  {t('no_account')}{' '}
          <Button
            component={Link}
            to="/register"
            variant="text"
            size="small"
          >
            {t('register')}
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;