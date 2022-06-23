import React, { useState, useEffect } from "react";
import { Grid, Divider, makeStyles, Typography } from "@material-ui/core";
import Map from "../shared/Map";
import Loading from "../shared/Loading";
import Dialog from "../shared/Dialog";
import SearchBar from "./SearchBar";
import { Filters, PriceSlider } from "./Filters";
import ItemList from "./ItemList";
import { getItems } from "../../utils/requests/items";
import { intersection } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  mapContainer: {
    width: "100%",
    height: "20rem",
    marginTop: theme.spacing(1),
  },
  sideBar: {
    outline: "1px black solid",
    marginLeft: theme.spacing(1),
    boxShadow: "7px 6px 5px gray",
    position: "sticky",
    top: 0,
    left: 0,
  },
  container2: {
    marginTop: theme.spacing(3),
  },
}));

const filteredListings = (listings, categories, tags) => {
  const selected = Object.keys(categories).reduce(
    (accum, c) => accum + (categories[c] ? 1 : 0),
    0
  );
  // if no filters have been selected, do not filter!
  let filtered = listings;
  if (selected > 0)
    filtered = listings.filter((listing) => !!categories[listing.category]);
  console.log(filtered);
  if (tags.size > 0)
    filtered = filtered.filter(
      (l) =>
        !!l.tags && l.tags.reduce((accum, tag) => accum || tags.has(tag), false)
    );
  return filtered;
};

const ViewItems = (props) => {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const classes = useStyles();

  const fetchItems = async () => {
    setLoading(true);
    // Grab items from backend.  If no error, then display the data
    // If error, then set error
    // Either way, set loading to false
    const itms = await getItems();
    if (itms.success) {
      setListings(itms.listings);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // On submit of searchbar
  const onSubmit = (e) => {
    const tags = e.split(",").map((s) => s.trim().toLowerCase());
    console.log(tags);
    setTags(new Set(tags));
  };

  // Takes user to the page of the specified item
  const goToItem = (id) => props.history.push(`/item/${id}`);
  const checkoutItem = (id) => props.history.push(`/checkout/${id}`);

  const map = (
    <Grid item className={classes.mapContainer}>
      <Map
        markers={filteredListings(listings, categories, tags).map(
          (l) => l.lngLat
        )}
      />
    </Grid>
  );
  return (
    <div className={classes.root}>
      <Dialog
        open={error}
        onClose={() => setError(false)}
        onAccept={fetchItems}
        title="Error Getting Items"
        buttonText="Retry"
        content="Unable to retrieve items at this time"
      />
      <Grid xs={12} container justify="center">
        <SearchBar
          onSubmit={onSubmit}
          clearSearch={() => setTags(new Set())}
          showClear={tags.size > 0}
        />
      </Grid>

      <Grid
        container
        className={classes.container2}
        spacing={3}
        justify="center"
      >
        <Grid item xl={2} lg={3} md={3} sm={3}>
          <Grid container direction="column" className={classes.sideBar}>
            <Grid item>
              <Filters {...{ categories, setCategories }} />
            </Grid>
            <Divider />
            {/* <Grid item>
              <PriceSlider />
            </Grid>
            <Divider /> */}
            {map}
          </Grid>
        </Grid>
        <Grid container item xl={8} lg={9} md={9} sm={9}>
          <Grid item xs>
            {loading ? (
              <Loading />
            ) : (
              <ItemList
                items={filteredListings(listings, categories, tags)}
                goToItem={goToItem}
                checkoutItem={checkoutItem}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewItems;
