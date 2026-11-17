import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";
import { Menu as MenuIcon, School as SchoolIcon } from "@mui/icons-material";

const Navbar = ({ toggleSidebar }) => {
  return (
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
          onClick={toggleSidebar}
          aria-label="Toggle student navigation"
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
            Student Portal
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Chip
          icon={<SchoolIcon />}
          label="Student"
          sx={{
            color: "white",
            backgroundColor: "rgba(255,255,255,0.16)",
            "& .MuiChip-icon": { color: "white" },
          }}
        />
        <Avatar
          sx={{ width: 34, height: 34, bgcolor: "#5947b5" }}
          src="http://images4.fanpop.com/image/photos/22500000/Itachi-itachi-uchiha-22583403-1280-800.jpg"
        >
          S
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
