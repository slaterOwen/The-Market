import React, { useState } from "react";
import "./Register.css";
import { Button, makeStyles, TextField } from "@material-ui/core";
import styled from "styled-components";
import { sha256 } from "js-sha256";
import UserContext from "../../UserContext";
import axios from "axios";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textBox: {
    margin: 10,
    width: "80%",
  },
  button: {
    background: `linear-gradient(45deg, ${theme.palette.accent1} 30%, ${theme.palette.accent2} 90%)`,
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "0 30px",
    "&:hover": {
      opacity: 0.75,
      transtion: "all 1s ease-in-out",
      boxShadow: "0 3px 5px 2px rgb(0 121 255 / 30%)",
    },
  },
  styledText: {
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    fontSize: "2.5rem",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Register = (props) => {
  const [user, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    secondPass: "",
  });

  const { setUser } = React.useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserInfo({
        username: value,
        email: user["email"],
        password: user["password"],
        secondPass: user["secondPass"],
      });
    } else if (name === "email") {
      setUserInfo({
        username: user["username"],
        email: value,
        password: user["password"],
        secondPass: user["secondPass"],
      });
    } else if (name === "password") {
      setUserInfo({
        username: user["username"],
        email: user["email"],
        password: value,
        secondPass: user["secondPass"],
      });
    } else if (name === "secondPass") {
      setUserInfo({
        username: user["username"],
        email: user["email"],
        password: user["password"],
        secondPass: value,
      });
    }
  };

  async function submitForm() {
    // Place stuff in here to add person to database
    console.log("Submitting");
    if (
      validateUser() === 0 &&
      validateEmail() === 0 &&
      validatePassword() === 0
    ) {
      try {
        const resp = await axios.post("http://127.0.0.1:5000/users", {
          ...{ username: user.username, email: user.email },
          password: sha256(user.password),
        });
        setUser(resp.data);
        props.history.push("/profile");
      } catch (e) {
        console.log(e);
      }
    }
  }

  function validateUser() {
    console.log("User");
    if (user.username.length === 0) {
      alert("Please enter a Username");
      return -1;
    }
    return 0;
  }

  function validateEmail() {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.email
      )
    ) {
      alert("Incorrect Email Address Format");
      return -1;
    }
    return 0;
  }

  function validatePassword() {
    if (user.password.length < 7) {
      alert("Make sure password is 7 characters or longer");
    } else if (user.password !== user.secondPass) {
      alert("Passwords do not match");
      return -1;
    }
    return 0;
  }

  const classes = styles();

  // Make sure to insert proper href link in the button
  // Make sure to place proper link going into the login page in the href
  return (
    <div className={classes.root}>
      <h1 className={classes.styledText}>Register</h1>
      <div className="box">
        <center>
          <h1>
            <h1 className={classes.styledText}>The Market</h1>
          </h1>
        </center>
        <form>
          <TextField
            className={classes.textBox}
            type="text"
            variant="outlined"
            size="small"
            label="Username"
            name="username"
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="email"
            variant="outlined"
            size="small"
            label="Email"
            name="email"
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="password"
            variant="outlined"
            size="small"
            label="Password"
            name="password"
            onChange={handleChange}
          />
          <br />

          <TextField
            className={classes.textBox}
            type="password"
            variant="outlined"
            size="small"
            label="Confirm Password"
            name="secondPass"
            onChange={handleChange}
          />
          <br />
          <br />

          <center>
            <Button className={classes.button} onClick={submitForm}>
              Submit
            </Button>
          </center>
        </form>
      </div>
      <p className="Log_in">
        Already registered? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Register;
