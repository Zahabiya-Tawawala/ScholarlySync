import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  AddCircleOutline as CreateProjectIcon,
  FolderOpen as ProjectsIcon,
  Menu as MenuIcon,
  School as SchoolIcon,
  SpaceDashboard as OverviewIcon,
} from "@mui/icons-material";

const drawerWidth = 280;

const navigationItems = [
  {
    label: "Dashboard",
    icon: <OverviewIcon />,
    path: "/professor/dashboard",
  },
  {
    label: "Projects",
    icon: <CreateProjectIcon />,
    path: "/professor/projects",
  },
  {
    label: "Assessment",
    icon: <ProjectsIcon />,
    path: "/professor/assessment",
  },
];

const ProfessorLayout = () => {
  const isMobile = useMediaQuery("(max-width: 899px)");
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(100deg, #617ff0, #9a70e8)",
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2 }, gap: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="Toggle professor navigation"
            onClick={() => setSidebarOpen((open) => !open)}
            sx={{ flexShrink: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" noWrap sx={{ lineHeight: 1.2 }}>
              ScholarlySync
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: { xs: "none", sm: "block" }, opacity: 0.85 }}
            >
              Professor Portal
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            icon={<SchoolIcon />}
            label="Professor"
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.16)",
              "& .MuiChip-icon": { color: "white" },
            }}
          />
          <Avatar sx={{ width: 34, height: 34, bgcolor: "#5947b5" }}>
            P
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: "min(280px, calc(100vw - 56px))", sm: drawerWidth },
            boxSizing: "border-box",
            top: "64px",
            height: "calc(100vh - 64px)",
            color: "white",
            background:
              "linear-gradient(180deg, rgb(99, 130, 242), rgb(145, 105, 226))",
          },
        }}
      >
        {/* <Box sx={{ px: 2.5, py: 3 }}>
          <Typography variant="overline" sx={{ opacity: 0.8 }}>
            Teaching tools
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Professor portal
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.25)" }} /> */}
        <List sx={{ pt: 1 }}>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                selected={pathname === item.path}
                onClick={isMobile ? () => setSidebarOpen(false) : undefined}
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 42 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          minWidth: 0,
          p: { xs: 2, sm: 3 },
          mt: "64px",
          ml: !isMobile && sidebarOpen ? `${drawerWidth}px` : 0,
          transition: "margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default ProfessorLayout;
