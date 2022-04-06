import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, makeStyles } from "@material-ui/core";
import { Form, useForm } from "../components/useForm";
import Input from "../components/controls/Input";
import Controls from "../components/controls/Controls";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1.5),
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const genderItems = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },
];

const FastingBSItems = [
  { id: 0, title: "Fasting Blood Sugar > 120" },
  { id: 1, title: "Fasting Blood Sugar <= 120" },
];

const restingECGItems = [
  { id: "Normal", title: "Normal" },
  { id: "ST", title: "ST" },
  { id: "LVH", title: "LVH" },
];

const chestPainTypeItems = [
  { id: "ATA", title: "ATA" },
  { id: "NAP", title: "NAP" },
  { id: "ASY", title: "ASY" },
  { id: "TA", title: "TA" },
];

const exerciseAnginaItems = [
  { id: "N", title: "No" },
  { id: "Y", title: "Yes" },
];

const STSlopeItems = [
  { id: "Up", title: "Up" },
  { id: "Flat", title: "Flat" },
  { id: "Down", title: "Down" },
];

const initialValues = {
  PatientName: "", //
  PhoneNum: "", //
  Age: 20, //
  Sex: "M", //
  ChestPainType: "NAP", //
  RestingBP: 10,
  Cholesterol: 200,
  FastingBS: 0,
  RestingECG: "Normal",
  MaxHR: 150,
  ExerciseAngina: "N",
  Oldpeak: 0.0,
  ST_Slope: "Up",
};

function HeartForm() {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const axios = require("axios");
  // const [values, setValues] = useState(initialValues);
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const classes = useStyles();

  function routePush(nextPage) {
    let path = nextPage;
    history.push(path);
  }

  async function validateAndSubmit() {
    if (
      values["PatientName"] === "" ||
      values["PhoneNum"] === "" ||
      isNaN(values["Age"] * 1) ||
      isNaN(values["RestingBP"] * 1) ||
      isNaN(values["Cholesterol"] * 1) ||
      isNaN(values["FastingBS"] * 1) ||
      isNaN(values["Oldpeak"] * 1) ||
      isNaN(values["MaxHR"] * 1)
    ) {
      alert("Please fill all the values correctly");
    } else {
      setValues({
        ...values,
        ["Age"]: values["Age"] * 1,
        ["RestingBP"]: values["RestingBP"] * 1,
        ["Cholesterol"]: values["Cholesterol"] * 1,
        ["FastingBS"]: values["FastingBS"] * 1,
        ["Oldpeak"]: values["Oldpeak"] * 1,
        ["MaxHR"]: values["MaxHR"] * 1,
      });
      console.log(values);
      const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
      }
      let response = await axios.post("/api/heart/predict/", values, config);

      if (response.status === 200) {
        if (response.data["Condition"] === 0) {
          routePush("/safe");
        } else {
          routePush("/unsafe");
        }
      } else {

        //TODO : Handle this 
        console.log("error");
      }

    }
  }

  return (
    <Paper className={classes.pageContent}>
      <Form>
        <h2> Heart check patient form</h2>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="PatientName"
              label="Patient Name"
              value={values.PatientName}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="PhoneNum"
              label="Phone number"
              value={values.PhoneNum}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="Age"
              label="Age"
              value={values.Age}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="RestingBP"
              label="Resting blood pressure"
              value={values.RestingBP}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="Cholesterol"
              label="Cholesterol"
              value={values.Cholesterol}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="MaxHR"
              label="Max Heart Rate"
              value={values.MaxHR}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="Oldpeak"
              label="Oldpeak"
              value={values.Oldpeak}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.RadioGroup
              name="Sex"
              label="Gender"
              value={values.Sex}
              onChange={handleInputChange}
              items={genderItems}
            />
            <Controls.RadioGroup
              name="RestingECG"
              label="Resting ECG"
              value={values.RestingECG}
              onChange={handleInputChange}
              items={restingECGItems}
            />
            <Controls.RadioGroup
              name="ChestPainType"
              label="Chest Pain Type"
              value={values.ChestPainType}
              onChange={handleInputChange}
              items={chestPainTypeItems}
            />
            <Controls.RadioGroup
              name="ExerciseAngina"
              label="Exercise Angina"
              value={values.ExerciseAngina}
              onChange={handleInputChange}
              items={exerciseAnginaItems}
            />
            <Controls.RadioGroup
              name="ST_Slope"
              label="ST Slope"
              value={values.ST_Slope}
              onChange={handleInputChange}
              items={STSlopeItems}
            />
            <Controls.RadioGroup
              name="FastingBS"
              label="Fasting Blood Sugar"
              value={values.FastingBS}
              onChange={handleInputChange}
              items={FastingBSItems}
            />
          </Grid>
          <Controls.Button
            variant="contained"
            color="primary"
            size="large"
            text="Predict"
            onClick={validateAndSubmit}
          />
        </Grid>
      </Form>
    </Paper>
  );
}

export default HeartForm;
