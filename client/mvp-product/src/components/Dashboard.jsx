import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const avatarStyle = { width: 250, height: 250, margin: 5 };
  const infoBoxStyle = { textAlign: "center", margin: 15 };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center", // Ensures vertical alignment
        flexWrap: "wrap", // Allows content to wrap on smaller screens
        padding: 2,
      }}
    >
      <Avatar
        alt="Profile picture of Itachi Uchiha"
        src="http://images4.fanpop.com/image/photos/22500000/Itachi-itachi-uchiha-22583403-1280-800.jpg"
        sx={avatarStyle}
      />
      <Box sx={infoBoxStyle}>
        <Typography variant="h5" gutterBottom>
          Name: Itachi Uchiha
        </Typography>
        <Typography variant="h5" gutterBottom>
          Age: 21
        </Typography>
        <Typography variant="h5" gutterBottom>
          Occupation: Ninja
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
