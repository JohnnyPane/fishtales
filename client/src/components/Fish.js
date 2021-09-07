import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    boxShadow: "rgb(0 0 0 / 5%) 0px 3px 15px 0px",
    margin: "20px 0",
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
}));

const defaultImage = "https://images.unsplash.com/photo-1485452499676-62ab02c20e83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
const defaultAvatar = "https://images.unsplash.com/photo-1532015917327-c7c46aa1d930?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80"

const Fish = ({ fish, user }) => {

  const classes = useStyles();

  return (
    <Card className={classes.root} my={20}>
      <CardHeader
        title={user.username}
        subheader={fish.species}
        avatar={
          <Avatar alt={user.username} src={user.image ? user.image : defaultAvatar} /> 
        }
      />
      <CardMedia
        className={classes.media}
        image={fish.image ? fish.image : defaultImage}
        title={fish.species}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          <div className="fish-card-header-wrapper">
            <div className="card-user-header">
              <div>{user.username}</div>
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
  );
};

export default Fish;
