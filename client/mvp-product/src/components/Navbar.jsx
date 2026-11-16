import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Box,
  styled
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  flexGrow: 1,
  minWidth: 0,
  maxWidth: 560,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    minWidth: 0,
  },
}));

const Navbar = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(rgb(116, 152, 253), rgb(168, 127, 255))' }}>
      <Toolbar sx={{ gap: { xs: 0, sm: 1 }, px: { xs: 1, sm: 2 } }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: { xs: 0.5, sm: 1 }, flexShrink: 0 }}
          aria-label="Toggle navigation"
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          ProjectHub
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 2 }, flexShrink: 0 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }} src='http://images4.fanpop.com/image/photos/22500000/Itachi-itachi-uchiha-22583403-1280-800.jpg'></Avatar>
            <Typography sx={{ display: { xs: 'none', md: 'block' } }}>
              Itachi Uchiha
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

// import React from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link } from "react-router-dom";
// // import NavDropdown from 'react-bootstrap/NavDropdown';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// function NavbarComponent() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           Dashboard
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/ProjectAssessment">
//               Project Assessment
//             </Nav.Link>
//             <Nav.Link as={Link} to="/ProgressTracker">
//               Progress Tracking
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavbarComponent;

// components/Navbar.jsx
