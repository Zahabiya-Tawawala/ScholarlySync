// components/Sidebar.jsx
import React from "react";
import {Link} from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const drawerWidth = 300;

const menuItems = [
  { icon: <DashboardIcon />, label: "Dashboard", active: true, path: "/" },
  { icon: <DescriptionIcon />, label: "Projects" , path: "/ProjectAssessment"},
  { icon: <PeopleIcon />, label: "Team" },
  { icon: <SettingsIcon />, label: "Settings" },
];

const Sidebar = ({ isOpen }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "56px",
          height: "calc(100vh - 56px)",
          background: 'linear-gradient(rgb(116, 152, 253), rgb(168, 127, 255))'
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding component={Link} to={item.path}>
            <ListItemButton
            //   selected={item.active}
            >
              <ListItemIcon sx={{color: "white"}}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} sx={{color: "white"}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto" }}>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{color: "white"}}/>
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
