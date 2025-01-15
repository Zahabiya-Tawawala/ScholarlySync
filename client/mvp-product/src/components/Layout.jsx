// components/Layout.jsx
import React from 'react';
import { Box } from '@mui/material';

const Layout = ({ children, sidebarOpen }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: '64px',
        ml: sidebarOpen ? '240px' : 0,
        transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;