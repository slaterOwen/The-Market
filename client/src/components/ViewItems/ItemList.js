import React from "react";
import { Grid } from "@material-ui/core";
import Item from "./Item";

const ItemList = (props) => {
  return (
    <Grid container wrap="wrap" spacing={2}>
      {props.items.map((itm, i) => (
        <Item
          {...itm}
          key={`itm-${i}`}
          handleClick={() => props.goToItem(itm._id)}
          checkout={() => props.checkoutItem(itm._id)}
        />
      ))}
    </Grid>
  );
};

export default ItemList;
