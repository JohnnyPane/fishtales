import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    boxShadow: "rgb(0 0 0 / 5%) 0px 3px 15px 0px",
    margin: "20px 0",
    width: 320,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const defaultImage = "https://images.unsplash.com/photo-1485452499676-62ab02c20e83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"

const Fish = ({ fish, user }) => {

  const classes = useStyles();

  return (
    <Grid item xs={4} >
      <Card className={classes.paper} my={20}>
        {!user ? <CardHeader
          title={user ? user.username : fish.user.username}
          subheader={fish.species}
          avatar={
            <Avatar
              alt={user ? user.username : fish.user.username}
              src={user && user.image ? user.image : fish.user.image ? fish.user.image : null}
            />
          }
        /> : null }
        <CardMedia
          className={classes.media}
          image={fish.image ? fish.image : defaultImage}
          title={fish.species}
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            <div className="fish-card-header-wrapper">
              <div className="card-user-header">
                <div>{user ? user.username : fish.user.username}</div>
                <div className="card-header-subtext">
                  {fish.date.slice(0, 10).split("-").reverse().join("-")}
                </div>
              </div>
            </div>
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Fish;
