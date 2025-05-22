import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Stack, Box, Menu, MenuItem, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, List, ListItem,
  ListItemText, Avatar, Grid, Paper
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { getAllUsers } from '../services/userService';
import { getTransactions, addTransaction } from '../services/transactionService';
import { fetchPosts, createPost, deletePost } from '../services/postService';

interface User {
  _id: string;
  name: string;
  email: string;
  currentBalance: number;
  transactions: { _id: string; type: string; amount: number; date: string }[];
}

interface Post {
  _id: string;
  title: string;
  content: string;
  user: { _id: string; name: string; email: string };
  createdAt: string;
}

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<User[0]['transactions']>([]);
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // YouTube video search state
  const [youtubeResults, setYoutubeResults] = useState<{ title: string, videoId: string, thumbnail: string }[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoId: string } | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [videoSearchTerm, setVideoSearchTerm] = useState('');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Debounced YouTube search effect
  useEffect(() => {
    if (!videoSearchTerm.trim()) {
      setYoutubeResults([]);
      return;
    }
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        const apiKey = 'AIzaSyCJ1heRe87CYt2clLclp4HPWUCIWaJVEeg';
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(videoSearchTerm)}&type=video&key=${apiKey}&maxResults=5`
        );
        const results = response.data.items.map((item: any) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          thumbnail: item.snippet.thumbnails.default.url
        }));
        setYoutubeResults(results);
      } catch (error) {
        console.error('YouTube search error:', error);
      }
    }, 500);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [videoSearchTerm]);

  const handleLangClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const generateAvatarUrl = (name: string) =>
    `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(name)}`;

  const renderPostContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const ytMatch = line.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
      if (ytMatch) {
        return (
          <iframe
            key={idx}
            width="100%"
            height="300"
            src={`https://www.youtube.com/embed/${ytMatch[1]}`}
            frameBorder="0"
            allowFullScreen
          />
        );
      }
      return <Typography key={idx} variant="body2">{line}</Typography>;
    });
  };

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const match = res.data.find((u: User) => u.email === decoded.email);
      setCurrentUser(match);
      setTransactions(match?.transactions || []);
    }
  };

  const loadPosts = async () => {
    const res = await fetchPosts();
    setPosts(res.data.reverse());
  };

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  const handleTransaction = async (delta: number) => {
    if (!currentUser) return;
    await addTransaction({ email: currentUser.email, amount: delta });
    await loadUsers();
    setAmount(0);
  };

  const handlePostSubmit = async () => {
    if (!title || !content) return;
    await createPost({ title, content });
    setTitle('');
    setContent('');
    await loadPosts();
  };

  // searchYouTube is no longer needed for button, but still used to open dialog and initialize results
  const searchYouTube = async () => {
    setVideoDialogOpen(true);
    setVideoSearchTerm('');
    try {
      const apiKey = 'AIzaSyCJ1heRe87CYt2clLclp4HPWUCIWaJVEeg';
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=Juice+WRLD+Unreleased&type=video&key=${apiKey}&maxResults=10`
      );
      const results = response.data.items.map((item: any) => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default.url
      }));
      setYoutubeResults(results);
    } catch (error) {
      console.error('YouTube search error:', error);
      setYoutubeResults([]);
    }
  };

  const handlePostDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      await deletePost(id, token);
      console.log('Post deleted');
      await loadPosts();
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  const handleMediaSearch = async () => {
    try {
      console.log('Searching Giphy for:', mediaSearchTerm);
      const key = 'dc6zaTOxFJmzC'; // public beta key
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${encodeURIComponent(mediaSearchTerm)}&limit=6`);
      const data = await res.json();
      const urls = data.data.map((g: any) => g.images.original.url);
      setMediaResults(urls);
    } catch (err) {
      console.error('Ошибка поиска Giphy:', err);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('name'), flex: 1 },
    { field: 'email', headerName: t('email'), flex: 1 },
    { field: 'currentBalance', headerName: t('balance'), flex: 1, type: 'number' }
  ];

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Typography variant="h6">{t('welcome')}, {currentUser?.name}</Typography>
        <div>
          <IconButton onClick={handleLangClick}><LanguageIcon /></IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => handleLangChange('ru')}>Русский</MenuItem>
            <MenuItem onClick={() => handleLangChange('en')}>English</MenuItem>
          </Menu>
          <Button color="error" variant="outlined" onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}>
            {t('logout')}
          </Button>
        </div>
      </Stack>

      <Box mt={4}>
        <Typography variant="h5">{t('create_post')}</Typography>
        <TextField label={t('title')} fullWidth sx={{ mt: 2 }} value={title} onChange={e => setTitle(e.target.value)} />
        <TextField
          label={t('content')}
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Button
          variant="text"
          onClick={searchYouTube}
          sx={{ mt: 1 }}
        >
          {t('find_video')}
        </Button>
        <Button variant="contained" onClick={handlePostSubmit} sx={{ mt: 2, ml: 2 }}>
          {t('publish')}
        </Button>
      </Box>


      <Box mt={5}>
        <Typography variant="h5">{t('posts')}</Typography>
        <List>
          {posts.map(post => (
            <ListItem key={post._id} divider alignItems="flex-start">
              <Avatar src={generateAvatarUrl(post.user.name)} sx={{ mr: 2 }} />
              <ListItemText
                primary={<Typography variant="h6">{post.title}</Typography>}
                secondary={
                  <Box>
                    {renderPostContent(post.content)}
                    <Typography variant="caption" display="block" color="text.secondary">
                      {t('author')}: {post.user.name} • {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
              {currentUser?._id === post.user._id && (
                <Button color="error" onClick={() => handlePostDelete(post._id)}>{t('delete')}</Button>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      <Typography variant="h4" sx={{ mt: 4 }}>{t('users')}</Typography>
      <TextField
        label={t('search')}
        fullWidth
        margin="normal"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users.filter(u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
          ).map(u => ({ id: u._id, ...u }))}
          columns={columns}
          pageSizeOptions={[5]}
        />
      </div>

      {currentUser && (
        <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">{t('your_balance')}: {currentUser.currentBalance}</Typography>
          <Grid container spacing={2} alignItems="center" mt={1}>
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

          <Typography variant="subtitle1" mt={2}>{t('transactions')}</Typography>
          <List dense>
            {transactions.map(tx => (
              <ListItem key={tx._id}>
                <ListItemText
                  primary={`${tx.type} — ${tx.amount}`}
                  secondary={new Date(tx.date).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Dialog open={videoDialogOpen} onClose={() => { setVideoSearchTerm(''); setVideoDialogOpen(false); }} maxWidth="sm" fullWidth>
        <DialogTitle>{t('choose_video')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('video_search')}
            fullWidth
            size="small"
            margin="dense"
            value={videoSearchTerm}
            onChange={(e) => setVideoSearchTerm(e.target.value)}
          />
          <List>
            {youtubeResults
              .filter(video => video.title.toLowerCase().includes(videoSearchTerm.toLowerCase()))
              .map((video) => (
                <ListItem
                  key={video.videoId}
                  button
                  onClick={() => {
                    setContent(prev => prev + `\nhttps://www.youtube.com/watch?v=${video.videoId}`);
                    setVideoSearchTerm('');
                    setVideoDialogOpen(false);
                  }}
                  onMouseEnter={() => setHoveredVideoId(video.videoId)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {hoveredVideoId === video.videoId ? (
                    <iframe
                      width="160"
                      height="90"
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      style={{ marginRight: 16 }}
                    />
                  ) : (
                    <Avatar src={video.thumbnail} variant="square" sx={{ mr: 2, width: 160, height: 90 }} />
                  )}
                  <ListItemText primary={video.title} />
                </ListItem>
              ))
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setVideoSearchTerm(''); setVideoDialogOpen(false); }}>{t('close')}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;