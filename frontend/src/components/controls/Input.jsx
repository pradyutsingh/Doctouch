import React from "react";
import { Grid, Paper, TextField, makeStyles } from "@material-ui/core";

function Input(props) {
  const { name, value, label, onChange } = props;
  return (
    <div>
      <TextField
        required
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      ></TextField>
    </div>
  );
}

export default Input;
