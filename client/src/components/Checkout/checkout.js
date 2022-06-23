import React, { useState, useEffect } from "react";
import { StaticMap } from "../shared/Map";
import { Typography, Paper, Grid, makeStyles, Button } from "@material-ui/core";
import ItemInfo from "./ItemInfo";
import CheckoutForm from "./CheckoutForm";
import ItemPopUp from "./ItemPopUp";
import { getItem, postTransaction } from "../../utils/requests/items";
import UserContext from "../../UserContext";
import { formatAuth } from "../../utils/utils";
import Dialog from "../shared/Dialog";

const listing = {
  title: "Bike",
  price: 10.29,
  imgUrl:
    "https://target.scene7.com/is/image/Target/GUEST_9251c93b-9ab1-42d4-beed-5f2ea738a131?fmt=webp&wid=1400&qlt=80",
  description: "A super aweseom bike!",
};

const parseId = (path) => {
  const toks = path.split("/");
  if (toks.length !== 3) {
    console.log("Not sure what to do here");
    return null;
  }
  return toks[2];
};

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "3rem",
  },
  containerInner: {
    width: "min(1250px, 80%)",
    background: "#FFFFFF",
    boxShadow: "-1px 1px 6px 2px #edeeef",
    borderRadius: "1em",
    padding: "0.5rem",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    // background: "#FFFFFF",
    // boxShadow: "-1px 1px 6px 2px #edeeef",
    // borderRadius: "1em",
    // padding: "0.5rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  checkout: {
    width: "100%",
    textAlign: "center",
    padding: "1rem",
  },

  image: {
    width: "min(100%, 30rem)",
    height: "auto",
    padding: 0,
  },

  payment: {
    textAlign: "right",
  },

  button: {
    backgroundColor: "pink",
    marginLeft: "30%",
  },

  buttonR: {
    backgroundColor: "pink",
    marginLeft: "60%",
  },
  topContainer: {
    width: "100%",
    position: "static",
  },
  viewItem: {
    width: "1px",
    height: "1px",
    position: "absolute",
    // left: "2rem",
    //background: "black",

    // "&::before": {
    //   content: '"View Item"',
    //   display: "block",
    //   width: "5rem",
    //   height: "1rem",
    //   opacity: 1,
    //   background: "green",
    // },
  },
}));

function submitForm() {
  window.location.href = "/profile";
}

function goBack() {
  window.location.href = "/browse";
}

const DEFAULT_ITEM = {
  title: "",
  desc: "",
  lngLat: [0, 0],
  imgUrl: "",
  id: "",
};

const Checkout = (props) => {
  const classes = styles();
  const itemId = parseId(props.location.pathname);
  const { user } = React.useContext(UserContext);

  const [itemLoading, setItemLoading] = useState(true);
  const [itemError, setItemError] = useState(false);
  const [listing, setListing] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);

  const [fields, setFields] = useState({
    card: "",
    street: "",
    city: "",
    state: "",
  });

  const fetchItem = async () => {
    setItemLoading(true);
    const resp = await getItem(itemId);
    if (resp.success) {
      setListing(resp.item);
      setItemError(false);
    } else {
      setItemError(true);
    }
    setItemLoading(false);
  };

  const sendTransaction = async () => {
    setPostLoading(true);
    const resp = await postTransaction(
      fields,
      listing._id,
      user._id,
      formatAuth(user._id, user.authId)
    );
    if (resp.success) {
      setPostError("");
      setPostSuccess(true);
    } else {
      setPostError(resp.message);
    }
    setPostLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <Dialog
        open={postSuccess}
        onClose={() => props.history.push("/browse")}
        onAccept={() => props.history.push("/")}
        closeButtonText="Browse"
        title="Transaction Successful"
        buttonText="To Home"
        content="You should receive your item in the next 1 - 20 business days"
      />
      <Dialog
        open={!!postError}
        onClose={() => setPostError(false)}
        onAccept={() => setPostError(false)}
        title="Transaction Failed"
        closeButtonText="Close"
        content={`Reason: ${postError}`}
      />

      <Grid container xs={12} alignContent="center" direction="column">
        <Grid
          container
          item
          className={classes.containerInner}
          direction="column"
        >
          <div className={classes.topContainer}>
            <Typography variant="h2" className={classes.checkout}>
              Checkout
            </Typography>
            <div className={classes.viewItem}>
              <ItemPopUp {...listing} />
            </div>
          </div>
          {/* <ItemInfo {...listing} /> */}
          <Grid item className={classes.formContainer}>
            <CheckoutForm {...{ fields, setFields, sendTransaction }} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  // return (
  //   <div>
  //     <div className={classes.root}>
  //       <Grid container spacing={3}>
  //         <Grid item xs>
  //           <Paper className={classes.paper}>
  //             <img />
  //           </Paper>
  //         </Grid>
  //         <Grid item xs={6} sm container>
  //           <Grid item xs container direction="column" spacing={2}>
  //             <Grid item xs>
  //               <Typography gutterBottom variant="h6">
  //                 Name of Item!!!
  //               </Typography>
  //             </Grid>
  //             <Grid item>
  //               <Typography variant="subtitle1">Price: xxx</Typography>
  //               <Typography variant="subtitle1">Cost: xxx</Typography>
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //         <Grid item xs>
  //           {/* Map goes here */}
  //         </Grid>
  //       </Grid>
  //     </div>
  //     <div className="questionsBox">
  //       <Typography variant="h5" className={classes.payment}>
  //         Payment Info
  //       </Typography>
  //       <Typography variant="subtitle1">
  //         Info goes here... Grabbed from database?
  //       </Typography>
  //     </div>
  //     <Grid justify="space-between" container spacing={2}>
  //       <Grid item xs>
  //         <Button
  //           raised
  //           variant="outlined"
  //           className={classes.button}
  //           onClick={goBack}
  //         >
  //           Back
  //         </Button>
  //       </Grid>

  //       <Grid item xs>
  //         <Button
  //           variant="outlined"
  //           className={classes.buttonR}
  //           onClick={submitForm}
  //         >
  //           Submit
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
};

export default Checkout;
