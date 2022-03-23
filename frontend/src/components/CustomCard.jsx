import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";


export default function CustomCard({imageObject, altText, topic, description, nextPage}) {

  const history = useHistory();

  const routeChange = () => {
    let path = nextPage;
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
      <CardActions>
        <Button size="small" onClick = {routeChange}>GO</Button>
      </CardActions>
    </Card>
  );
}
