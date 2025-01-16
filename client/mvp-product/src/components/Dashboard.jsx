import React from "react";
import { Box, Card, Typography, Button, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
// import { Line, Bar } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";

const Dashboard = () => {
  const avatarStyle = { width: 250, height: 250, margin: 5 };
  const infoBoxStyle = { textAlign: "center", margin: 15 };

  return (
    <>
       <Box
      sx={{
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        {/* Current Balance Section */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              padding: "20px",
              borderRadius: "15px",
              background: "linear-gradient(to right, #8a7af3, #a37ef5)",
              color: "white",
            }}
          >
            <Typography variant="h5">Current Balance</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              IDR 759,000.00
            </Typography>
            <Typography sx={{ mt: 1 }}>Account No: 0019-0075-2727-xxxx</Typography>
          </Card>
        </Grid>

        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: "20px", borderRadius: "15px", textAlign: "center", height: 500 }}>
            <Avatar
              sx={{
                width: "80px",
                height: "80px",
                margin: "auto",
                mb: 2,
              }}
            />
            <Typography variant="h6">Panji Satrya</Typography>
            <Typography variant="body2" color="text.secondary">
              PRO Account
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, background: "#8a7af3", ":hover": { background: "#7a6ae4" } }}
            >
              View Full Profile
            </Button>
          </Card>
        </Grid>

        {/* Analytics and Income Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: "20px", borderRadius: "15px" }}>
            <Typography variant="h6">Analytics</Typography>
           
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ padding: "20px", borderRadius: "15px" }}>
            <Typography variant="h6">+30,000 Income</Typography>
           
          </Card>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Dashboard;

// <Box
//   sx={{
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center", // Ensures vertical alignment
//     flexWrap: "wrap", // Allows content to wrap on smaller screens
//     padding: 2,
//   }}
// >
//   <Avatar
//     alt="Profile picture of Itachi Uchiha"
//     src="http://images4.fanpop.com/image/photos/22500000/Itachi-itachi-uchiha-22583403-1280-800.jpg"
//     sx={avatarStyle}
//   />
//   <Box sx={infoBoxStyle}>
//     <Typography variant="h5" gutterBottom>
//       Name: Itachi Uchiha
//     </Typography>
//     <Typography variant="h5" gutterBottom>
//       Age: 21
//     </Typography>
//     <Typography variant="h5" gutterBottom>
//       Occupation: Ninja
//     </Typography>
//   </Box>
// </Box>
