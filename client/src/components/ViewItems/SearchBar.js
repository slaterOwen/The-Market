import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  centeredItem: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    background: `linear-gradient(${theme.palette.accent1}, ${theme.palette.accent2})`,
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    padding: "0 30px",
    "&:hover": {
      opacity: 0.75,
      transtion: "all 1s ease-in-out",
      boxShadow: "0 3px 5px 2px rgb(0 121 255 / 30%)",
    },
  },
  clearSearch: {
    color: "red",
    marginLeft: "1rem",
    cursor: "pointer",
  },
}));

const SearchBar = (props) => {
  const { onSubmit, clearSearch, showClear } = props;
  const classes = useStyle();
  const [search, setSearch] = useState("");
  const handleInput = (e) => setSearch(e.target.value);
  const submitSearch = () => {
    onSubmit(search);
    setSearch("");
  };
  return (
    <Grid container xs={8} spacing={2}>
      <Grid item xs={10}>
        <TextField
          id="outlined-full-width"
          label={!!search && "Search for an item"}
          style={{ margin: 8 }}
          placeholder="Search for an item..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInput}
          value={search}
          variant="outlined"
        />
        {showClear && (
          <Typography className={classes.clearSearch} onClick={clearSearch}>
            Clear Search
          </Typography>
        )}
      </Grid>
      <Grid item xs={2} justify="center" className={classes.centeredItem}>
        <Button onClick={submitSearch} className={classes.button}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
