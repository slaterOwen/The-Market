import React, { useState } from "react";
import { CATEGORIES } from "../../utils/constants";
import { formatMoney } from "../../utils/utils";

import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  makeStyles,
  Typography,
  Slider,
  Input,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(2),
  },
  checkBox: {
    margin: theme.spacing(0),
  },
  slider: {
    marginTop: "1rem",
    width: "80%",
    marginLeft: "1rem",
    marginRight: "auto",
  },
  priceInput: {
    width: "33%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "0.5rem",
  },
}));

export const Filters = (props) => {
  const { categories, setCategories } = props;
  const classes = useStyles();
  const handleChange = (e) =>
    setCategories({
      ...categories,
      [e.target.name]: !categories[e.target.name],
    });
  const CategorySelectors = Object.keys(CATEGORIES).map((category, i) => (
    <FormControlLabel
      key={`category-filter-${category}-${i}`}
      control={
        <Checkbox
          checked={!!categories[category]}
          onChange={handleChange}
          name={category}
        />
      }
      label={category}
    />
  ));

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel copmonent="legend">Refine Your Search</FormLabel>
        <FormGroup>{CategorySelectors}</FormGroup>
      </FormControl>
    </div>
  );
};

export const PriceSlider = (props) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const handleChange = (e, newVal) => setPriceRange(newVal);
  const classes = useStyles();

  return (
    <div className={classes.slider}>
      <Typography id="range-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        valueLabelFormat={formatMoney}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={formatMoney}
        max={1000}
      />
      <div className={classes.root}>
        <Input
          className={classes.priceInput}
          value={priceRange[0]}
          onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
          inputProps={{
            min: 0,
            max: 999,
            type: "number",
          }}
        />
        <Input
          className={classes.priceInput}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
          inputProps={{
            min: 1,
            max: 1000,
            type: "number",
          }}
        />
      </div>
    </div>
  );
};
