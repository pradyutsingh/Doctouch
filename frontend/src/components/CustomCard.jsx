import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";

export default function CustomCard({
  imageObject,
  altText,
  topic,
  description,
  nextPage,
  tablePage,
}) {
  const history = useHistory();

  const routeChange = () => {
    let path = nextPage;
    history.push(path);
  };

  const goToTablePage = () => {
    let path = tablePage;
    history.push(path);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageObject}
        alt={altText}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {topic}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardActions>
            <Button size="small" onClick={routeChange}>
              GO
            </Button>
          </CardActions>
        </Grid>

        <Grid item xs={4}>
          <CardActions>
            <Button size="small" onClick={goToTablePage}>
              PATIENTS
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
