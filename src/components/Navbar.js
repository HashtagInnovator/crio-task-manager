import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Task Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
