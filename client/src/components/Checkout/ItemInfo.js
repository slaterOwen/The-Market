import React from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import { formatMoney } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  title: {
    padding: 0,
    margin: 0,
    fontSize: "3em",
  },
}));

const ItemInfo = (props) => {
  const { title, price, imgUrl } = props;
  const classes = useStyles();
  return (
    <Grid item container xs className={classes.root} spacing={3}>
      <Grid item xs={1}>
        <img src={imgUrl} alt={title} className={classes.image} />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="subtitle1">{formatMoney(price)}</Typography>
      </Grid>
      <Grid item container xs justify="flex-end">
        <Button variant="outlined">Go Back</Button>
      </Grid>
    </Grid>
  );
};

export default ItemInfo;
