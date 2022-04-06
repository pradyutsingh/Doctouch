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

const initialValues = {
  PatientName: "",
  PhoneNum: "",
  Pregnancies: 0,
  Glucose: 0,
  BloodPressure: 0,
  SkinThickness: 0,
  Insulin: 0,
  BMI: 0,
  DiabetesPedigreeFunction: 0,
  Age: 0,
  Sex: "M"
};

function DiabetesForm() {
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
      isNaN(values["Pregnancies"] * 1) ||
      isNaN(values["Glucose"] * 1) ||
      isNaN(values["BloodPressure"] * 1) ||
      isNaN(values["SkinThickness"] * 1) ||
      isNaN(values["Insulin"] * 1) ||
      isNaN(values["BMI"] * 1) ||
      isNaN(values["DiabetesPedigreeFunction"] * 1) ||
      isNaN(values["Age"] * 1)
    ) {
      alert("Please fill all the values correctly");
    } else {
      setValues({
        ...values,
        ["Pregnancies"]: values["Pregnancies"] * 1,
        ["Glucose"]: values["Glucose"] * 1,
        ["BloodPressure"]: values["BloodPressure"] * 1,
        ["SkinThickness"]: values["SkinThickness"] * 1,
        ["Insulin"]: values["Insulin"] * 1,
        ["BMI"]: values["BMI"] * 1,
        ["DiabetesPedigreeFunction"]: values["DiabetesPedigreeFunction"] * 1,
        ["Age"]: values["Age"] * 1,
      });
      console.log(values);

      const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
      }

      let response = await axios.post("/api/diabetes/predict/", values, config);

      if (response.status === 200) {
        if (response.data["Condition"] === 0) {
          routePush("/safe");
        } else {
          routePush("/unsafe");
        }
      } else {
        console.log("error");
      }
    }
  }

  return (
    <Paper className={classes.pageContent}>
      <Form>
        <h2> Diabetes check patient form</h2>
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
              name="Pregnancies"
              label="Pregnancies"
              value={values.Pregnancies}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="Glucose"
              label="Glucose"
              value={values.Glucose}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="BloodPressure"
              label="BloodPressure"
              value={values.BloodPressure}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="SkinThickness"
              label="Skin Thickness"
              value={values.SkinThickness}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="Insulin"
              label="Insulin"
              value={values.Insulin}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              name="BMI"
              label="BMI"
              value={values.BMI}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="DiabetesPedigreeFunction"
              label="DiabetesPedigreeFunction"
              value={values.DiabetesPedigreeFunction}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="Age"
              label="Age"
              value={values.Age}
              onChange={handleInputChange}
            />
                        <Controls.RadioGroup
              name="Sex"
              label="Gender"
              value={values.Sex}
              onChange={handleInputChange}
              items={genderItems}
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

export default DiabetesForm;
