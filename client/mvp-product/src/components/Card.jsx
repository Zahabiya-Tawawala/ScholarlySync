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
import { TextField } from "@mui/material";
// import LinearProgress from '@mui/material/LinearProgress'
import ProgressBar from "react-bootstrap/ProgressBar";

const cardData = [
  {
    title: "Project Assessment - 1",
    status: "not completed",
    description: "Make a Dashboard using powerBI",
  },
  {
    title: "Project Assessment - 2",
    status: "not completed",
    description: "Make a Dashboard using Tableau",
  },
  {
    title: "Project Assessment - 3",
    status: "not completed",
    description: "Make a Dashboard using Excel",
  },
  {
    title: "Project Assessment - 1",
    status: "not completed",
    description: "Make a Dashboard using powerBI",
  },
  {
    title: "Project Assessment - 2",
    status: "not completed",
    description: "Make a Dashboard using Tableau",
  },
  {
    title: "Project Assessment - 3",
    status: "not completed",
    description: "Make a Dashboard using Excel",
  },
  {
    title: "Project Assessment - 1",
    status: "not completed",
    description: "Make a Dashboard using powerBI",
  },
  {
    title: "Project Assessment - 2",
    status: "not completed",
    description: "Make a Dashboard using Tableau",
  },
  {
    title: "Project Assessment - 3",
    status: "not completed",
    description: "Make a Dashboard using Excel",
  },
];

export default function OutlinedCard() {
  // Define consistent card dimensions
  const cardStyles = {
    width: 350, // Set desired width
    height: 250, // Set desired height
    margin: 2, // Add margin between cards
    justifyContent: "space-between", // Aligns content to the end of the card
    borderRadius: 7, // Rounds the corners
  };

  //   open and close the dilogue box

  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClickOpen = (card) => {
    // card state is defined here it was showing error before cause it was not defined passed as a function parameter
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {

  }
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
            {/* <ProgressBar now={40} style={{}}/> */}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleClickOpen(card)}
              sx={{ background: "rgb(116, 152, 253)", ml: 13 }}
            >
              {" "}
              {/* card state is defined here passed here and defined  */}
              View Details
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* dialogue box component */}
      {selectedCard && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {selectedCard.title}
          </DialogTitle>
          <DialogContent>
            <Typography>Title: {selectedCard.description}</Typography>
            <Typography>Status: {selectedCard.status}</Typography>
            <Typography>project github link</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
            />
            <Typography>project video link</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
