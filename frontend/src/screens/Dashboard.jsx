import React from "react";
import CustomCard from "../components/CustomCard";
import Box from "@material-ui/core/Box";
import heart from "../static/images/heart.png";
import diabetes from "../static/images/diabetes.png";
import Grid from "@mui/material/Grid";

function Dashboard() {
  return (
    <div margin="auto">
      <Grid container >
        <Grid item xs={3}>
          <Box m={2} pt={2}>
            <CustomCard
              imageObject={heart}
              altText="Heart"
              topic="Heart"
              description="People with cardiovascular disease or who are at high cardiovascular risk 
          need early detection and management wherein a machine learning model can be of great help."
              nextPage="/heart"
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box m={2} pt={2}>
            <CustomCard
              imageObject={diabetes}
              altText="Diabetes"
              topic="Diabetes"
              description="Diabetes is a disease that occurs when your blood glucose, 
          also called blood sugar, is too high."
              nextPage="/diabetes"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
