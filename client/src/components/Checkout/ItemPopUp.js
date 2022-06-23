import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { formatMoney, shortenString } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: "100%",
    width: "6rem",
    textAlign: "center",
    borderRadius: "8%",
    transition: "all 0.2s linear",
    position: "relative",
    zIndex: 999,
    top: "-6rem",
    left: "1rem",
  },
  cardClosed: {
    border: `none`,
    boxShadow: `inset 0 0 3px 3px ${theme.palette.accent2}, 0 0 3px 3px ${theme.palette.accent2}`,
    transition: "all 0.3s linear",
    "&::before": {
      content: '"View Item"',
      position: "absolute",
      background: theme.palette.accent2,
      top: "120%",
      left: 0,
      width: "100%",
      height: "100%",
      transform: "perspective(1em) rotateX(40deg) scale(1, 0.35)",
      filter: "blur(1em)",
      opacity: 0.7,
      zIndex: 999,
    },
    "&:hover": {
      color: theme.palette.accent1,
      textShadow: "none",
      boxShadow: `inset 0 0 3px 3px ${theme.palette.accent2}, 0 0 12px 6px ${theme.palette.accent2}`,
      background: theme.palette.accent2,
    },
  },
  cardOpened: {
    width: "max(20vw, 10rem)",
    textAlign: "left",
    transition: "all 1s linear",
    boxShadow: "10px 8px 10px 5px gray",
    animation: "$grow 0.5s 1",
  },
  buttonClosed: {
    textTransform: "none",
    fontSize: "1rem",
    textShadow: `0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em ${theme.palette.accent2}`,
    color: theme.palette.accent2,
    "&:hover": {
      background: "none",
      color: "white",
      textShadow: "none",
    },
  },
  contentContainer: {
    width: "fit-content",
  },
  mediaLarge: {
    height: "300px",
    transition: "all .5s cubic-bezier(0, 0.18, 0.12, 2.29)",
  },
  "@keyframes grow": {
    "0%": {
      width: "5rem",
      transform: "rotateX(90deg) rotateY(90deg)",
    },
    "100%": {
      width: "max(20vw, 10rem)",
      transform: "rotateX(0deg) rotateY(0deg)",
    },
  },
}));

const ItemPopUp = (props) => {
  const classes = useStyles();
  const { title, price, description, imgUrl, handleClick, condition } = props;
  const [opened, setOpened] = useState(false);

  return (
    <Card
      className={`${classes.root} ${
        opened ? classes.cardOpened : classes.cardClosed
      }`}
      //   onMouseEnter={() => setHover(true)}
      //   onMouseLeave={() => setHover(false)}
    >
      <Button
        onClick={() => setOpened(!opened)}
        className={!opened && classes.buttonClosed}
      >
        {opened ? "X" : "View Item"}
      </Button>
      {opened && (
        <CardMedia
          className={classes.mediaLarge}
          image={imgUrl}
          title={title}
        />
      )}
      {opened && (
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}, {formatMoney(price)}
          </Typography>
          <Typography variant="body1" color="primary" component="p">
            {description}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default ItemPopUp;
