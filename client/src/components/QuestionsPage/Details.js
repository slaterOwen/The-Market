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
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Details = (props) => {
  const { title, price, description, owner, xs, isOwner, handleDelete } = props;
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
      </Grid>
      <Grid item className={classes.button}></Grid>
    </Grid>
  );
};

export default Details;
