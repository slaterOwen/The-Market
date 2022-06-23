import React, { useState, useEffect } from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    height: "fit-content",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    borderRadius: "2rem",
  },
  rootSent: {
    background: theme.palette.accent1Light,
    marginLeft: "auto",
    minWidth: "55%",
    paddingRight: "2rem",
  },
  rootReceived: {
    background: theme.palette.lightGrey,
    marginRight: "auto",
    minWidth: "55%",
    paddingLeft: "2rem",
  },
  recieved: {
    marginRight: "auto",
  },
  sent: {
    marginLeft: "auto",
    marginRight: "1rem",
  },
  sentText: {
    marginTop: "2rem",
    marginLeft: "auto",
  },
  receivedText: {
    marginTop: "2rem",
    marginRight: "auto",
  },
}));

const Message = (props) => {
  const { from, message } = props;
  const classes = useStyles();

  return (
    <Paper
      className={`${classes.root} ${
        from === "You" ? classes.rootSent : classes.rootReceived
      }`}
    >
      <Typography
        variant="h6"
        className={from === "You" ? classes.sent : classes.recieved}
      >
        {`${from} said...`}
      </Typography>
      <Typography
        variant="body1"
        className={from === "You" ? classes.sentText : classes.receivedText}
      >
        {message}
      </Typography>
    </Paper>
  );
};

export default Message;
