import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { makeStyles, Grid } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import UserContext from "../../UserContext";
import { getUserItems, deleteUserItems } from "../../utils/requests/items";
import { removeAccount } from "../../utils/requests/accounts";
import Profile from "./Profile";

import ItemList from "../ViewItems/ItemList";
import Loading from "../shared/Loading";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MessageSummary from "../Messages/MessageSummary";
// import Profile from "./Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button1: {
    marginTop: "1.5rem",
    marginLeft: "45rem",
    marginBottom: "1rem",
    maxWidth: "100px",
  },
  button2: {
    marginLeft: "42.75rem",
    marginBottom: "2rem",
    maxWidth: "170px",
  },
  styledText: {
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    fontSize: "2.5rem",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "2rem",
    textAlign: "center",
  },
  container: {
    width: "90%",
    padding: "0rem",
    display: "flex",
    //justifyContent: "space-evenly",
  },
  accordions: {
    width: "min(1280px, 70%)",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "fit-content",
    padding: "0.5rem",
    paddingRight: "1rem",
    paddingLeft: "1rem",
  },
  itemView: {
    marginTop: "1rem",
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const ProfilePage = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState("panel1");
  const { user, setUser } = React.useContext(UserContext);

  if (!user.authId) {
    props.history.push("/login");
  }

  const classes = useStyles();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const itms = await getUserItems(user._id);
    if (itms.success) {
      setListings(itms.listings);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  const deleteAccount = async () => {
    const resp = await removeAccount(user._id);
    console.log(resp);
  };

  const removeUserItems = async () => {
    const resp = await deleteUserItems(user._id);
    console.log(resp);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const goToItem = (id) => props.history.push(`/item/${id}`);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Profile {...user} updateUser={setUser} history={props.history} />
        <MessageSummary history={props.history} userId={user._id} />
      </div>

      {listings.length > 0 ? (
        <div className={classes.itemView}>
          <h1 className={classes.styledText}>Your listed items</h1>
          <Grid container item xs={12} justify="center">
            <Grid item xl={9} lg={8} md={8} sm={8}>
              {loading ? (
                <Loading />
              ) : (
                <ItemList items={listings} goToItem={goToItem} />
              )}
            </Grid>
          </Grid>
        </div>
      ) : (
        <h1 className={classes.styledText}>You have no items up for sale</h1>
      )}

      {/* <Button
        className={classes.button1}
        variant="contained"
        color="secondary"
        onClick={() => {
          setUser({});
          props.history.push("/login");
        }}
      >
        LOG OUT
      </Button>

      <Button
        className={classes.button2}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        DELETE ACCOUNT
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting your account will remove you and all your listed items off
            our website. Are you sure you want continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              handleClose();
              removeUserItems();
              deleteAccount();
              setUser({});
              props.history.push("/login");
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default ProfilePage;
