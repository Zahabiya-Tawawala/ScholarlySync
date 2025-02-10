import React from "react";
import { Box, Card, Typography, Button, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
// import { Line, Bar } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";

const Dashboard = () => {
  return (
    <>
      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Continue Current Project section */}
          <Card
            sx={{
              padding: "20px",
              borderRadius: "15px",
              background: "linear-gradient(to right, #8a7af3, #a37ef5)",
              color: "white",
              width: 790,
              height: 200,
            }}
          >
            <Typography variant="h5">Continue Current Project</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              Make a Simple Website
            </Typography>
            <Typography sx={{ mt: 1 }}>
              status of the project: not completed
            </Typography>
          </Card>

          {/* Activity and progress section */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: "15px",
                  width: 385,
                  height: 375,
                  padding: "20px",
                  margin: "auto",
                }}
              >
                <Typography variant="h6">Activity - Weekly</Typography>

                <LineChart
                  xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5, 3],
                    },
                  ]}
                  width={350}
                  height={300}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  width: 385,
                  height: 375,
                  margin: "auto",
                  borderRadius: "15px",
                  padding: "20px",
                }}
              >
                <Typography variant="h6">
                  Progress Report - Completion Projects
                </Typography>

                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "completed" },
                        { id: 1, value: 10, label: "incomplete" },
                      ],
                    },
                  ]}
                  width={350}
                  height={200}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              height: 600,
              width: 350,
            }}
          >
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                margin: "auto",
              }}
              src="http://images4.fanpop.com/image/photos/22500000/Itachi-itachi-uchiha-22583403-1280-800.jpg"
            />
            <Typography variant="h6">Itachi Uchiha</Typography>
            <Typography variant="body2" color="text.secondary">
              PRO Account
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                background: "#8a7af3",
                ":hover": { background: "#7a6ae4" },
              }}
            >
              View all Scores and Projects
            </Button>
          </Card>
        </Grid>
      </Grid>
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
