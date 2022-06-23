import React, { useState } from "react";
import { Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import Form from "./Form";
import { postItem } from "../../utils/requests/items";
import Dialog from "../shared/Dialog";
import { formatAuth } from "../../utils/utils";
import { uploadImage } from "../../utils/requests/images";
import UserContext from "../../UserContext";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    width: "min(800px, 80%)",
    minHeight: "30rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    width: "min(800px, 80%)",
    marginTop: "2rem",
    marginBottom: "3rem",
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
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0',
    marginLeft: '1rem',
  },
}));

const ListItem = (props) => {
  const classes = useStyles();
  const [fields, setFields] = useState({
    title: "",
    price: "",
    description: "",
    imgUrl: "",
    condition: "",
    category: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemId, setItemId] = useState("");
  const { user } = React.useContext(UserContext);

  const getCoords = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  const getPosition = async () => {
    try {
      if (!"geolocation" in navigator) {
        console.log("Geolocation not available");
        return [0, 0];
      }
      let position;
      await getCoords().then((pos) => {
        console.log(pos);
        position = [pos.coords.longitude, pos.coords.latitude];
      });
      return position;
    } catch (e) {
      return [-120.54354468, 35.09349968];
    }
  };

  const getImage = (images) => {
    if (images.length < 1) return; //invalid images array

    //Otherwise, generate an objectURL using the image
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(images[0]);
    //setImage(images[0]);
  };

  const handleSubmit = async () => {
    // First format tags as a set
    const tagsAsSet = fields.tags.split(",").map((s) => s.trim());
    // Create a listing object with the tags and user position
    const listing = {
      ...fields,
      tags: tagsAsSet,
      lngLat: await getPosition(),
      imgUrl: image,
    };
    console.log(listing);
    setLoading(true);
    setError(false);

    // send image to imgur, get URL for image back
    // const imgurResp = await uploadImage(image);
    // console.log(imgurResp);
    // if (!imgurResp.success) {
    //   // Image upload failed :(
    //   setLoading(false);
    //   setError(true);
    //   return;
    // }
    // Image upload success! Update payload w URL
    // const listing = {
    //   ...fields,
    //   lngLat: await getPosition(),
    //   imgUrl: image,
    // };
    // console.log(listing);
    const resp = await postItem(listing, formatAuth(user._id, user.authId));
    if (resp.success) {
      setItemId(resp.id);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  const handleCancel = () => {
    props.history.goBack();
  };

  return (
    <>
      <Dialog
        title="Item Listed"
        description={`Your item, ${fields.title}, has been successfully listed`}
        onClose={() => props.history.push("/")}
        onAccept={() => props.history.push(`item/${itemId}`)}
        buttonText="Go to Item Page"
        open={itemId != ""}
      />
      <Dialog
        title="An error has occured"
        description={`Your item, ${fields.title}, has failed to be listed`}
        onClose={() => setError(false)}
        onAccept={handleSubmit}
        buttonText="Try Again"
        open={error}
      />
      <Dialog
        title="Loading"
        description={"Shuffling some shelves to list your item..."}
        onClose={() => null}
        onAccept={() => null}
        buttonText="This button will do nothing"
        open={loading}
      />

      <Grid container alignItems="center" direction="column">
        <Typography variant="h3">
          <h1 className={classes.styledText}>List an item</h1>
        </Typography>
        <Paper className={classes.paper}>
          <Form
            fields={fields}
            setFields={setFields}
            {...{ image, getImage, setImage }}
          />
        </Paper>
        <div className={classes.buttonGroup}>
          <Button className={classes.button} onClick={handleCancel}>
            Back
          </Button>
          <Button className={classes.button} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default ListItem;
