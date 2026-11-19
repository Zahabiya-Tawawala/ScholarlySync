// components/Sidebar.jsx
import { Link } from "react-router-dom";
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
  AssignmentTurnedIn as AssessmentIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const drawerWidth = 300;

const menuItems = [
  {
    icon: <DashboardIcon />,
    label: "Dashboard",
    active: true,
    path: "/student",
  },
  { icon: <DescriptionIcon />, label: "Projects", path: "/student/projects" },
  { icon: <AssessmentIcon />, label: "Assessment", path: "/student/assessment" },
];

const Sidebar = ({ isOpen, isMobile, onClose }) => {
  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={isOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { xs: "min(300px, calc(100vw - 56px))", sm: drawerWidth },
          boxSizing: "border-box",
          top: "56px",
          height: "calc(100vh - 56px)",
          background: "linear-gradient(rgb(116, 152, 253), rgb(168, 127, 255))",
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            component={Link}
            to={item.path}
            onClick={isMobile ? onClose : undefined}
          >
            <ListItemButton
            //   selected={item.active}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto" }}>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
