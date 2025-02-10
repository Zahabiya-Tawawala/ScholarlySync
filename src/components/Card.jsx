import React, { useState, useEffect } from "react";
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
import axios from "axios";
// import LinearProgress from '@mui/material/LinearProgress'
// import ProgressBar from "react-bootstrap/ProgressBar";

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

  const [enteredGithubLink, setEnteredGithubLink] = useState("");
  const [enteredVideoLink, setEnteredVideoLink] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/submitGithubAndVideoLink", {
        id: selectedCard.id,
        github_link: enteredGithubLink,
        video_link: enteredVideoLink,
      })
      .then((response) => {
        console.log("Updated Successfully!", response.data);

        setCardData((prevData) =>
          prevData.map((card) =>
            card.id === selectedCard.id
              ? { ...card, status: "completed" }
              : card
          )
        );

        setOpen(false);
      })
      .catch((error) => {
        console.error(
          "Error updating project links: ",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Fetch data from the server

  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projectCards")
      .then((response) => {
        setCardData(response.data);
      })
      .catch((error) => {
        console.log("error in fetching data: ", error);
      });
  }, []);

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexWrap: "wrap", // Allows cards to wrap on smaller screens
      }}
    >
      {cardData.map((card, id) => (
        <Card key={card.id} variant="outlined" sx={cardStyles}>
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
              disabled = {card.status === 'completed'}
              sx={{ background: "rgb(116, 152, 253)", ml: 13 }}
            >
              {card.status === 'completed' ? "Completed" : "View Details"}
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* dialogue box component */}
      {selectedCard && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedCard.title}</DialogTitle>
          <DialogContent>
            <Typography>Title: {selectedCard.description}</Typography>
            <Typography>Status: {selectedCard.status}</Typography>
            <Typography>project github link</Typography>
            <TextField
              id="github_link"
              variant="outlined"
              value={enteredGithubLink}
              onChange={(e) => setEnteredGithubLink(e.target.value)}
            />
            <Typography>project video link</Typography>
            <TextField
              id="video_link"
              variant="outlined"
              value={enteredVideoLink}
              onChange={(e) => setEnteredVideoLink(e.target.value)}
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

// const cardData = [
//   {
//     title: "Project Assessment - 1",
//     status: "not completed",
//     description: "Make a Dashboard using powerBI",
//   },
//   {
//     title: "Project Assessment - 2",
//     status: "not completed",
//     description: "Make a Dashboard using Tableau",
//   },
//   {
//     title: "Project Assessment - 3",
//     status: "not completed",
//     description: "Make a Dashboard using Excel",
//   },
//   {
//     title: "Project Assessment - 1",
//     status: "not completed",
//     description: "Make a Dashboard using powerBI",
//   },
//   {
//     title: "Project Assessment - 2",
//     status: "not completed",
//     description: "Make a Dashboard using Tableau",
//   },
//   {
//     title: "Project Assessment - 3",
//     status: "not completed",
//     description: "Make a Dashboard using Excel",
//   },
//   {
//     title: "Project Assessment - 1",
//     status: "not completed",
//     description: "Make a Dashboard using powerBI",
//   },
//   {
//     title: "Project Assessment - 2",
//     status: "not completed",
//     description: "Make a Dashboard using Tableau",
//   },
//   {
//     title: "Project Assessment - 3",
//     status: "not completed",
//     description: "Make a Dashboard using Excel",
//   },
// ];
