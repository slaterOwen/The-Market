import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getItem, deleteItem } from "../../utils/requests/items";
import Details from "./Details";
import Loading from "../shared/Loading";
import { StaticMap } from "../shared/Map";
import Dialog from "../shared/Dialog";
import UserContext from "../../UserContext";
import { formatAuth } from "../../utils/utils";

const parseId = (path) => {
  const toks = path.split("/");
  if (toks.length !== 3) {
    console.log("Not sure what to do here");
    return null;
  }
  return toks[2];
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: "min(100%, 30rem)",
    height: "auto",
    padding: 0,
  },
  leftPanel: {
    width: "min(100%, 30rem)",
  },
  root: {
    marginTop: "3rem",
  },
}));

const DEFAULT_ITEM = {
  title: "",
  desc: "",
  lngLat: [0, 0],
  imgUrl: "",
  id: "",
};

const ItemView = (props) => {
  const { user } = React.useContext(UserContext);

  const id = parseId(props.location.pathname);
  const [item, setItem] = useState(DEFAULT_ITEM);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [deleteError, setDeleteErorr] = useState(false);

  const checkoutItem = () => props.history.push(`/checkout/${id}`);

  const classes = useStyles();
  const fetchItem = async () => {
    setLoading(true);
    const itm = await getItem(id);
    if (itm.success) {
      setItem(itm.item);
      setError(false);
    } else setError(true);
    setLoading(false);
  };
  const removeItem = async () => {
    setDeleteClicked(false);
    setLoading(true);
    const resp = await deleteItem(id, formatAuth(user._id, user.authId));
    console.log(resp);
    if (resp.success) {
      setDeleteErorr(false);
      setDeleted(true);
    } else {
      setDeleteErorr(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const askQuestion = () => {
    const subject = `Inquiry on ${item.title}`;
    const to = item.owner;
    const newPath = `/messages/${subject}/${to}`;
    props.history.push(newPath);
  };

  return loading || error ? (
    <>
      <Dialog
        open={error}
        onClose={() => setError(false)}
        onAccept={fetchItem}
        title="Error Getting Item"
        buttonText="Retry"
        content="Unable to retrieve item details at this time"
      />

      <Loading />
    </>
  ) : (
    <>
      <Dialog
        open={deleteClicked}
        onClose={() => setDeleteClicked(false)}
        onAccept={removeItem}
        title="Delete Item?"
        buttonText="Confirm"
        content="Are you sure you want to delete this item?"
      />
      <Dialog
        open={deleteError}
        onClose={() => setDeleteErorr(false)}
        onAccept={removeItem}
        title="Error Deleting Item"
        buttonText="Retry"
        content="Unable to delete item..."
      />
      <Dialog
        open={deleted}
        onClose={() => props.history.push("/browse")}
        onAccept={() => props.history.push("/")}
        title="Item Deleted"
        buttonText="Back to Home Screen"
        closeButtonText="Back to Browse"
      />

      <Grid
        className={classes.root}
        container
        direction="column"
        wrap
        alignItems="center"
      >
        <Grid xs={10} item container direction="row" spacing={1}>
          <Grid
            item
            container
            direction="column"
            className={classes.leftPanel}
            xs={3}
          >
            <Grid item>
              <img
                src={item.imgUrl}
                className={classes.image}
                alt={item.title}
              />

              <StaticMap lngLat={item.lngLat} />
            </Grid>
          </Grid>
          <Details
            xs={8}
            {...item}
            isOwner={item.owner == user._id}
            handleDelete={() => setDeleteClicked(true)}
            askQuestion={askQuestion}
            checkout={checkoutItem}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ItemView;
