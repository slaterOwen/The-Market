import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { getMessageSummary } from "../../utils/requests/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20%",
    marginTop: "1.75rem",
  },
  message: {
    width: "100%",
    border: "1px solid black",
    opacity: 0.9,
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
      boxShadow: "0 0 5px 5px " + theme.palette.accent1,
      opacity: 1,
    },
  },
}));
const messages = [
  {
    subject: "Inquiry on a bike",
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

const MessageSummary = (props) => {
  const classes = useStyles();
  const { userId } = props;
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const resp = await getMessageSummary(userId);
    if (resp.success) {
      setMessages(resp.messageSummaries);
    }
  };

  useEffect(() => fetchMessages(), []);

  const goToMessage = (subject) => {
    props.history.push("/messages/" + subject);
  };

  const summaries = messages.map((m) => (
    <div className={classes.message} onClick={() => goToMessage(m.subject)}>
      <Typography variant="h6">{m.subject}</Typography>
      <Typography variant="subtitle1">
        From: {m.user_1 == userId ? m.user_2 : m.user_1}
      </Typography>
    </div>
  ));

  return (
    <div className={classes.root}>
      <Typography variant="h5">Messages</Typography>
      {summaries}{" "}
    </div>
  );
};

export default MessageSummary;
