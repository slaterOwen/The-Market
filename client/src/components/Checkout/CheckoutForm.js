import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Radio,
  makeStyles,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Typography,
  MenuItem,
  Select,
  Switch,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { STATES } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  cityAndState: {
    width: "max(15rem, 40%)",
    alignItems: "center",
  },
  radioContainer: {
    display: "flex",
    marginTop: "1rem",
  },
  price: {
    width: "6rem",
  },
  title: {
    width: "60%",
  },
  description: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  radio: {
    margin: 0,
  },
  categories: {
    marginRight: "2rem",
  },
  uploadBackground: (props) => ({
    backgroundImage: `url(${props.uploadedImage})`,
    transition: "all 1s ease-in-out",
    marginTop: "1rem",
    marginBottom: "1rem",
  }),
  imageUploaded: {
    height: "20rem",
    backgroundRepeat: "no-repeat",
    width: "100%",
    display: "flex",
    transition: "all 1s ease-in-out",
  },
  deleteImage: {
    marginLeft: "auto",
    marginBottom: "auto",
    padding: "0.25rem",
    background: "white",
    fontSize: "1rem",
    borderRadius: "20%",
    boxShadow: "-2px 3px 9px 4px black",
    cursor: "pointer",
    marginTop: "1rem",
    marginRight: "1rem",
    transition: "box-shadow 0.5s ease-in-out",
    "&:hover": {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      boxShadow: "-2px 3px 9px 4px white",
      transition: "all 0.5s ease-in-out",
    },
  },
  divider: {
    height: "1px",
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    background: "blacK",
    opacity: 0.6,
  },
  uploaded: {
    width: "20%",
    height: "fit-content",
    margin: "auto",
  },
  header: {
    marginTop: "2rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  postalCode: {
    width: "max(7rem, 10%)",
  },
  submitBtn: {
    marginTop: "3rem",
  },
}));

const Form = (props) => {
  const { fields, setFields, image, sendTransaction } = props;
  const [copyShipping, setCopyShipping] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles({ uploadedImage: image });

  const handleSubmit = () => {
    const filledOut = Object.keys(fields).reduce(
      (accum, field) => accum && !!fields[field],
      true
    );
    setError(!filledOut);
    if (filledOut) sendTransaction();
  };

  useEffect(() => {
    if (copyShipping) {
      setFields({
        ...fields,
        billingCity: fields.city,
        billingStreet: fields.street,
        billingPostalCode: fields.postalCode,
        billingState: fields.state,
      });
    } else {
      setFields({
        ...fields,
        billingCity: "",
        billingStreet: "",
        billingPostalCode: "",
        billingState: "",
      });
    }
  }, [copyShipping]);

  const updateText = (field, e) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const SectionHeader = ({ title }) => (
    <div className={classes.header}>
      <div className={classes.divider} />

      <Typography variant="h5">{title}</Typography>
      <div className={classes.divider} />
    </div>
  );

  const DropDown = ({ values, fieldName, title }) => (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fields[fieldName]}
        onChange={(e) => updateText(fieldName, e)}
      >
        {values.map((val) => (
          <MenuItem value={val}>{val}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className={classes.root}>
      <SectionHeader title="Shipping Information" />
      <TextField
        label="Street Address"
        value={!!fields && fields.street}
        onChange={(e) => updateText("street", e)}
        required
        error={error && !fields.street}
        //className={classes.title}
      />
      <div className={`${classes.container} ${classes.cityAndState}`}>
        <TextField
          label="City"
          value={!!fields && fields.city}
          onChange={(e) => updateText("city", e)}
          error={error && !fields.city}
        />
        {/* <TextField
          label="State"
          value={!!fields && fields.state}
          onChange={(e) => updateText("state", e)}
        /> */}
        <DropDown
          values={STATES}
          fieldName="state"
          title="State"
          error={error && !fields.state}
        />
      </div>
      <TextField
        label="Postal Code"
        value={!!fields && fields.postalCode}
        onChange={(e) => updateText("postalCode", e)}
        className={classes.postalCode}
        error={error && !fields.postalCode}
      />

      <SectionHeader title="Payment Information" />
      <div className={classes.container}>
        <TextField
          label="Card Number"
          value={!!fields && fields.card}
          onChange={(e) => updateText("card", e)}
          className={classes.title}
          error={error && !fields.card}
        />
        <TextField
          label="Security Code"
          value={!!fields && fields.securityCode}
          onChange={(e) => updateText("securityCode", e)}
          error={error && !fields.securityCode}
        />
        <TextField
          label="Expiration"
          value={!!fields && fields.expiration}
          onChange={(e) => updateText("expiration", e)}
          error={error && !fields.expiration}
        />
      </div>
      <FormControlLabel
        control={
          <Switch
            checked={copyShipping}
            onChange={() => setCopyShipping(!copyShipping)}
            name="checked"
          />
        }
        label="Copy Shipping Address"
      />
      <TextField
        label={!copyShipping && "Billing Address"}
        value={!!fields && fields.billingStreet}
        onChange={(e) => updateText("billingStreet", e)}
        error={error && !fields.billingStreet}

        //className={classes.title}
      />
      <div className={`${classes.container} ${classes.cityAndState}`}>
        <TextField
          label={!copyShipping && "City"}
          value={!!fields && fields.billingCity}
          onChange={(e) => updateText("billingCity", e)}
          error={error && !fields.billingCity}
        />
        {/* <TextField
          label="State"
          value={!!fields && fields.state}
          onChange={(e) => updateText("state", e)}
        /> */}
        <DropDown
          values={STATES}
          fieldName="billingState"
          title="State"
          error={error && !fields.billingState}
        />
      </div>
      <TextField
        label={!copyShipping && "Postal Code"}
        value={!!fields && fields.billingPostalCode}
        onChange={(e) => updateText("billingPostalCode", e)}
        className={classes.postalCode}
        error={error && !fields.postalCode}
      />
      <Button
        className={classes.submitBtn}
        onClick={handleSubmit}
        variant="outlined"
      >
        Submit
      </Button>
    </div>
  );
};

export default Form;
