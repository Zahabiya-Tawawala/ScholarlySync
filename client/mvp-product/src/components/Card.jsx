import { React, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const cardData = [
  {
    title: "Project Assessment - 1",
    status: "not completed",
    description: "Title: Make a Dashboard using powerBI",
  },
  {
    title: "Project Assessment - 2",
    status: "not completed",
    description: "Title: Make a Dashboard using Tableau",
  },
  {
    title: "Project Assessment - 3",
    status: "not completed",
    description: "Title: Make a Dashboard using Excel",
  },
];

export default function OutlinedCard() {
  // Define consistent card dimensions
  const cardStyles = {
    width: 300, // Set desired width
    height: 250, // Set desired height
    margin: 2, // Add margin between cards
    justifyContent: "space-between", // Aligns content to the end of the card
  };

  //   open and close the dilogue box

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexWrap: "wrap", // Allows cards to wrap on smaller screens
      }}
    >
      {cardData.map((card, index) => (
        <Card key={index} variant="outlined" sx={cardStyles}>
          <CardContent>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Status: {card.status}
            </Typography>
            <Typography variant="h6">Title: {card.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleClickOpen}>
              View Details
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* dialogue box component */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Project Assessment - 1
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>Title: Make a Dashboard using powerBI</Typography>
          <Typography>Status: Not Completed</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
