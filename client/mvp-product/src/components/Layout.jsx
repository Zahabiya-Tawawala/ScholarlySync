import { Box } from '@mui/material';

const Layout = ({ children, sidebarOpen, isMobile }) => {
  return (
    <Box
      component="main"
      sx={{
        minWidth: 0,
        p: { xs: 2, sm: 3 },
        mt: '64px',
        ml: !isMobile && sidebarOpen ? '300px' : 0,
        transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;