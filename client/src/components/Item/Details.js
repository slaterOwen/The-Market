import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Divider,
  Button,
  Box,
} from "@material-ui/core";
import { formatMoney } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  description: {
    marginTop: "1rem",
  },
  button: {
    marginTop: "1rem",
    background: `linear-gradient(45deg, ${theme.palette.accent1} 30%, ${theme.palette.accent2} 90%)`,
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 35,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgb(0 121 255 / 30%)",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Details = (props) => {
  const {
    title,
    price,
    description,
    owner,
    xs,
    isOwner,
    handleDelete,
    askQuestion,
    checkout,
  } = props;
  const classes = useStyles();
  console.log(props);
  return (
    <Grid xs={xs} container item direction="column">
      <Grid item container justify="space-between" alignItems="flex-end">
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h4">{formatMoney(price)}</Typography>
      </Grid>
      <Divider />
      <Grid item>
        <Typography variant="subtitle2">Sold by: {owner}</Typography>
      </Grid>
      <Grid
        item
        container
        justify="space-between"
        className={classes.description}
      >
        <Grid item xs={9}>
          <Typography variant="body1">{description}</Typography>
        </Grid>
        {isOwner ? (
          <Button className={classes.button} onClick={handleDelete}>
            Delete Item
          </Button>
        ) : (
          <Box className={classes.buttonGroup}>
            <Button className={classes.button} onClick={checkout}>
              Purchase
            </Button>
            <Button onClick={askQuestion} className={classes.button}>
              Ask A Question
            </Button>
          </Box>
        )}
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default Details;
