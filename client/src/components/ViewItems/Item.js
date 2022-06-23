import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatMoney, shortenString } from "../../utils/utils";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  grid: {
    maxWidth: "30rem",
    "&:hover": {
      position: "relative",
      left: "-50%",
      top: "-25%",
      zIndex: 2,
      width: "200%",
      height: "200%",
      transition: "all 10s ease-in-out",
    },
  },
  root: {
    //maxWidth: "100%",
    width: "100%",
    borderRadius: "8%",
    transition: "all 1s cubic-bezier(0, 0.18, 0.12, 2.29)",

    "&:hover": {
      boxShadow: "10px 8px 10px 5px gray",
      transition: "all 0.5s cubic-bezier(0, 0.18, 0.12, 2.29)",
    },
  },
  contentContainer: {
    width: "fit-content",
  },
  mediaSmall: {
    height: "150px",
    transition: "all 1s cubic-bezier(0, 0.18, 0.12, 2.29)",
  },
  mediaLarge: {
    height: "300px",
    transition: "all .5s cubic-bezier(0, 0.18, 0.12, 2.29)",
  },
});

export default function Item(props) {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const {
    title,
    price,
    description,
    imgUrl,
    handleClick,
    condition,
    checkout,
  } = props;

  return (
    <Grid item xl={2} lg={4} md={4} sm={4}>
      <div className={classes.grid}>
        <Card
          className={classes.root}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <CardActionArea onClick={handleClick}>
            <CardMedia
              className={hover ? classes.mediaLarge : classes.mediaSmall}
              image={imgUrl}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6">
                {title}
              </Typography>
              <Typography variant="body1" color="primary" component="p">
                {hover ? description : formatMoney(price)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button variant="subtitle2">
              {hover ? formatMoney(price) : condition || "Unknown Condition"}
            </Button>
          </CardActions>
        </Card>
      </div>
    </Grid>
  );
}
