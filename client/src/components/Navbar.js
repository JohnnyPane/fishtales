import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import FishForm from "./FishForm";
import fishService from "../services/fish";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const defaultAvatar =
  "https://images.unsplash.com/photo-1532015917327-c7c46aa1d930?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80";


const Navbar = ({ currentUser, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fish, setFish] = useState([]);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

   const addFish = (fishObject) => {
     fishService.create(fishObject).then((returnedFish) => {
       setFish(fish.concat(returnedFish));
     });

     setState({ ...state, bottom: false })
   };

   const list = (anchor) => (
     <div
       className={clsx(classes.list, {
         [classes.fullList]: anchor === "top" || anchor === "bottom",
       })}
       role="presentation"
     >
       <FishForm createFish={addFish} toggleDrawer={toggleDrawer}/>
     </div>
   );

  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <div className="navbar">
      <div className="navbar-nav">
        <div className="display-fish-form">
          <React.Fragment>
            <Button onClick={toggleDrawer("bottom", true)}>
              <i className="far fa-plus-square fa-lg"></i>
            </Button>
            <Drawer
              anchor="bottom"
              open={state["bottom"]}
              onClose={toggleDrawer("bottom", false)}
            >
              {list("bottom")}
            </Drawer>
          </React.Fragment>
        </div>
      </div>

      <div className="nav-avatar">
        <Avatar
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleAnchorClick}
          alt={currentUser.username}
          src={currentUser.image ? currentUser.image : defaultAvatar}
          className={classes.small}
          cursor="pointer"
        />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAnchorClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={handleAnchorClose}>
          <Link to="/">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleAnchorClose}>
          <Link to="/fish">Feed</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {" "}
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
