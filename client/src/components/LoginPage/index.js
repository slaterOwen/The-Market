import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { sha256 } from "js-sha256";
import UserContext from "../../UserContext";
import Footer from "./Footer";
import InputField from "./InputField";
import "./Login.css";
import Dialog from "../shared/Dialog";
import axios from "axios";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    height: "80vh",
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
    boxShadow: "0 3px 5px 2px rgb(0 121 255 / 30%)",
  },
  styledText: {
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    fontSize: "2.5rem",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
    marginLeft: "1rem",
    textAlign: "center",
  },
}));

// const [state name, function to update state]
// body = default state
const LoginPage = (props) => {
  const { user, setUser } = React.useContext(UserContext);
  const classes = styles();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempUser, setTempUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // called when user types into fields
  // if any fields are red (error), remove them at this time
  // update temp user fields based on which field was typed into
  const handleChange = (e, tempUser) => {
    const { name, value } = e.target;
    if (name === "email") {
      setTempUser({ ...tempUser, email: value });
      setEmailError(false);
    } else if (name === "password") {
      setTempUser({ ...tempUser, password: value });
      setPasswordError(false);
    }
  };

  // does a GET /users call with tempUser's saved credentials
  async function getUser(emailID, passwordID) {
    try {
      const resp = await axios.get("http://127.0.0.1:5000/users", {
        auth: {
          username: emailID,
          password: passwordID,
        },
      });

      // Query went through successfully
      return {
        success: resp.status === 200,
        user: resp.data,
      };
    } catch (e) {
      return {
        success: false,
        err: e,
      };
    }
  }

  // User hits 'Log In'
  async function submitForm() {
    console.log("Submitting...");
    setLoading(true);
    var resp = await validateUser();

    // any fields were empty
    if (resp === -1) {
      console.log("Empty Field(s)");
    }
    // successful login - global user values
    else if (resp.success === true) {
      console.log("Successful Login credentials");
      setUser(resp.user);
      props.history.push("/browse");
    }
    // unsuccessful login - setError
    else if (resp.success === false) {
      console.log("Invalid Credentials");
      console.log(resp.err);
      setError(true);
    }
    setLoading(false);
  }

  // checks InputFields
  // resp === -1, if fields are empty
  // otherwise, holds info from GET call (error or user data)
  async function validateUser() {
    let resp = 0;
    if (tempUser.email.length === 0) {
      setEmailError(true);
      resp = -1;
    }
    if (tempUser.password.length === 0) {
      setPasswordError(true);
      resp = -1;
    }
    if (resp === 0)
      resp = await getUser(tempUser.email, sha256(tempUser.password));

    return resp;
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.styledText}>Login</h1>
      <div className="box">
        <h1 className={classes.styledText}>The Market</h1>
        <form>
          <InputField
            handleChange={handleChange}
            label={"Email"}
            name={"email"}
            tempUser={tempUser}
            errorFlag={emailError}
            helperText={"Invalid Email"}
            type={"email"}
          />
          <InputField
            handleChange={handleChange}
            label={"Password"}
            name={"password"}
            tempUser={tempUser}
            errorFlag={passwordError}
            helperText={"Invalid Password"}
            type={"password"}
          />
          <Dialog
            title="Invalid Email or Password"
            description={"Invalid Login"}
            closeButtonText="Got It"
            buttonText={null}
            onClose={() => setError(false)}
            onAccept={() => null}
            open={error}
          />
          <Dialog
            title="Loading..."
            description={"Checking backend"}
            content="Checking my sources..."
            onClose={() => null}
            onAccept={() => null}
            open={loading}
          />
          <center>
            <Button
              variant="outlined"
              onClick={submitForm}
              className={classes.button}
            >
              Log In
            </Button>
          </center>
        </form>
      </div>
      <Footer> </Footer>
    </div>
  );
};

export default LoginPage;
