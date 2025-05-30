// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, Button, Box, Typography,
  Alert, AppBar, Toolbar
} from '@mui/material';

// Helper to get token
function getToken() {
  const auth = localStorage.getItem('auth');
  if (!auth) return null;
  try {
    return JSON.parse(auth).token;
  } catch {
    return null;
  }
}

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  // Set login as default route
  const [pageView, setPageView] = useState('login'); // 'login' | 'signUp'

  const fetchProducts = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const res = await axios.get('http://192.168.28.104:5000/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      setProducts([]);
      if (err.response && err.response.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('auth');
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product) => {
    setEditRowId(product._id);
    setEditRowData({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditRowData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = getToken();
      const { name, price, category, inStock } = editRowData;
      await axios.put(
        `http://192.168.28.104:5000/products/${editRowId}`,
        { name, price, category, inStock },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchProducts();
      setEditRowId(null);
      setEditRowData({});
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`http://192.168.28.104:5000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchProducts();
    } catch (err) {}
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    try {
      const res = await axios.post('http://192.168.28.104:5000/register', registerData);
      setRegisterSuccess(res.data.message);
      setRegisterData({ username: '', password: '' });
    } catch (err) {
      setRegisterError(err.response?.data?.message || 'Registration failed: Unknown error');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await axios.post('http://192.168.28.104:5000/login', loginData);
      localStorage.setItem('auth', JSON.stringify({ token: res.data.token }));
      setIsLoggedIn(true);
      setLoginData({ username: '', password: '' });
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
    setProducts([]);
  };

  const Navbar = () => (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product App
        </Typography>
        {!isLoggedIn ? (
          <Box>
            <Button
              color="inherit"
              type="button"
              onClick={() => setPageView('login')}
              sx={{ mr: 2 }}
              data-testid="navbar-login-button"
            >
              Login
            </Button>
            <Button
              color="inherit"
              type="button"
              onClick={() => setPageView('signUp')}
              data-testid="navbar-register-button"
            >
              Register
            </Button>
          </Box>
        ) : (
          <Button color="inherit" type="button" onClick={handleLogout}>
            LOGOUT
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
          {pageView === 'signUp' && (
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>Register</Typography>
              {registerError && <Alert severity="error">{registerError}</Alert>}
              <form onSubmit={handleRegister}>
                <TextField
                  label="Username"
                  name="username"
                  value={registerData.username}
                  onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                  fullWidth margin="normal"
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  fullWidth margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  data-testid="form-register-button"
                >
                  Register
                </Button>
              </form>
              {/* Display acknowledgement below the form */}
              {registerSuccess && (
                <Box sx={{ mt: 2 }}>
                  <Alert severity="success">{registerSuccess}</Alert>
                </Box>
              )}
            </Paper>
          )}
          {pageView === 'login' && (
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>Login</Typography>
              {loginError && <Alert severity="error">{loginError}</Alert>}
              <form onSubmit={handleLogin}>
                <TextField
                  label="Username"
                  name="username"
                  value={loginData.username}
                  onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                  fullWidth margin="normal"
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  fullWidth margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  data-testid="form-login-button"
                >
                  Login
                </Button>
              </form>
            </Paper>
          )}
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
        >
          <Typography variant="h5" data-testid="dashboard-title">Product Table</Typography>
        </Box>
        <TextField
          label="Search Products by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          fullWidth
          margin="normal"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>In Stock</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product._id}>
                    {editRowId === product._id ? (
                      <>
                        <TableCell>
                          <TextField
                            name="name"
                            value={editRowData.name}
                            onChange={handleEditChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="price"
                            type="number"
                            value={editRowData.price}
                            onChange={handleEditChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="category"
                            value={editRowData.category}
                            onChange={handleEditChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="checkbox"
                            name="inStock"
                            checked={!!editRowData.inStock}
                            onChange={handleEditChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.inStock ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleEdit(product)}
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredProducts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </>
  );
}

export default App;
