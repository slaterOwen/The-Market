import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Message from "./Message";
import UserContext from "../../UserContext";
import { getConversation, sendMessage } from "../../utils/requests/messages";
import Loading from "../shared/Loading";
import { GiClawSlashes } from "react-icons/gi";

const messages = {
  subject: "Test messages",
  messages: [
    {
      from: "1234",
      message: "Hi there",
      date: "2021-05-20",
    },
    {
      from: "5678",
      message: "Hello!",
      date: "2021-05-21",
    },
    {
      from: "1234",
      message: "What is up?",
      date: "2021-05-23",
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "min(1280px, 80%)",
    marginRight: "auto",
    marginLeft: "auto",
  },
  textInput: {
    marginTop: "3rem",
  },
  refresh: {
    marginLeft: "auto",
  },
}));

const parseSubject = (path) => {
  const toks = path.split("/");
  if (toks.length < 3) {
    console.log("Not sure what to do here");
    return null;
  }
  if (toks.length === 3)
    return {
      subject: toks[2],
    };
  return {
    subject: toks[2],
    to: toks[3],
  };
};

const Messages = (props) => {
  const { subject, to } = parseSubject(props.location.pathname);
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const [messages, setMessages] = useState({
    subject: "",
    messages: [],
  });
  const [otherUser, setOtherUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const fetchConversation = async () => {
    setLoading(true);
    const resp = await getConversation(user._id, subject);
    if (resp.success) {
      setMessages(resp.conversation);
      setError(false);
      if (resp.conversation.messages.length === 0) {
        setOtherUser(to);
      } else {
        setOtherUser(
          resp.conversation.messages[0].receiver === user._id
            ? resp.conversation.messages[0].sender
            : resp.conversation.messages[0].receiver
        );
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    const payload = {
      subject: subject,
      sender: user._id,
      receiver: otherUser,
      message: newMessage,
    };
    setLoading(true);
    const resp = await sendMessage(payload);
    if (resp.success) {
      setError(false);
      setMessages({
        ...messages,
        messages: [...messages.messages, resp.message],
      });
      setNewMessage("");
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => fetchConversation(), []);

  return loading ? (
    <Loading />
  ) : (
    <Grid container xs={12} justify="center">
      <Grid container item xs={9} justify="center" spacing={1}>
        <Button className={classes.refresh} onClick={fetchConversation}>
          Refresh Messages
        </Button>

        <Grid item container xs={12} justify="center">
          <Typography variant="h3">Subject: {messages.subject}</Typography>
          <div style={{ width: "100%", height: "1px", background: "black" }} />
        </Grid>
        {messages.messages.map((m) => (
          <Grid item xs={8}>
            <Message
              from={m.sender === user._id ? "You" : m.sender}
              message={m.message}
            />
          </Grid>
        ))}
        <Grid item container xs={8} className={classes.textInput}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              label="Type a message..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </Grid>
          <Grid item container alignItems="center" xs={2}>
            <Button onClick={handleSend}>Send</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Messages;
