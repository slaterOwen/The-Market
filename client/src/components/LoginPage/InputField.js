import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  textBox: {
    margin: "0.625rem",
    width: "80%",
  },
});

const InputField = ({
  handleChange,
  label,
  name,
  tempUser,
  errorFlag,
  helperText,
  type,
}) => {
  const classes = styles();
  return (
    <div>
      <TextField
        error={errorFlag}
        helperText={errorFlag ? helperText : ""}
        className={classes.textBox}
        type={type}
        variant="outlined"
        size="small"
        label={label}
        name={name}
        onChange={(e) => handleChange(e, tempUser)}
      />
    </div>
  );
};

export default InputField;
