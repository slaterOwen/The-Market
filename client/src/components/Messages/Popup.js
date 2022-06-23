import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    left: 0,
    top: 0,
  },
  messages: {
    position: "relative",
    zIndex: 999,
    boxShadow: "0 0 10 10 black",
    width: "15rem",
    padding: "1rem",
  },
}));

const example = [
  {
    subject: "Toyota Tacoma",
    user_1: "1234",
    user_2: "5678",
  },
  {
    subject: "Questions about Bike!",
    user_1: "1234",
    user_2: "5678",
  },
  {
    subject: "Sick bike dude",
    user_1: "1234",
    user_2: "5678",
  },
];

const PopUpMessages = (props) => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  return <Button className={classes.root}>Messages</Button>;
};

export default PopUpMessages;
