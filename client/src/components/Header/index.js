import React from "react";
import styled from "styled-components";
import {
  ButtonGroup,
  Button,
  Grid,
  makeStyles,
  Divider,
} from "@material-ui/core";
import UserContext from "../../UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "1rem",
  },
  h1: {
    fontSize: "2.5rem",
    margin: 0,
  },
  buttonGroup: {
    maxHeight: "5rem",
    marginRight: "3.25rem",
  },
  button: {
    transition: "all 0.5s ease-in",

    "&:hover": {
      background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
      transition: "all 0.5s ease-in",
    },

    // borderRadius: 3,
    // border: 0,
    // color: 'white',
    // height: 40,
    // padding: '0 30px',
  },
  styledText: {
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    fontSize: "2.5rem",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0",
    marginLeft: "1rem",
    cursor: "pointer",
  },
}));

const Header = (props) => {
  const classes = useStyles({ buttonIsBlue: true });
  const { user } = React.useContext(UserContext);

  return props.location.pathname == "/" ? null : (
    <div className={classes.root}>
      <Grid container justify="space-between" align-items="center" spacing={0}>
        <Grid item xs={3} alignItems="flex-end">
          <h1
            className={classes.styledText}
            onClick={() => props.history.push("/")}
          >
            The Market
          </h1>
        </Grid>
        <Grid
          container
          xs={2}
          xl={1}
          alignItems="center"
          className={classes.buttonGroup}
        >
          {!!user._id && (
            <ButtonGroup size="small" aria-label="website router">
              <Button
                onClick={() => props.history.push("/browse")}
                className={classes.button}
              >
                Buy
              </Button>
              <Button
                onClick={() => props.history.push("/sell")}
                className={classes.button}
              >
                Sell
              </Button>
              <Button
                onClick={() => props.history.push("/profile")}
                className={classes.button}
              >
                Profile
              </Button>
            </ButtonGroup>
          )}
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

// (
//     <Container>
//       <h1 onClick={() => props.history.push("/")}>The Market</h1>
//       <ButtonGroup size="small" aria-label="website router">
//         <Button onClick={() => console.log("Buy was clicked")}>Buy</Button>
//         <Button onClick={() => console.log("Sell was clicked")}>Sell</Button>
//         <Button onClick={() => console.log("Profile was clicked")}>
//           Profile
//         </Button>
//       </ButtonGroup>
//     </Container>
//   );

export default Header;
