import React, { useState, useEffect, useRef } from "react";
import userService from '../services/user'
import Fish from "./Fish";
import { useParams } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { uploadImage } from "../services/s3";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "80%"
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    marginLeft: "20px",
  },
  box: {
    width: "80%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid rgb(219,219,219)",
    paddingBottom: "30px",
  },
}));

const User = ({ user, fish }) => {
  const [selectedUser, setUser] = useState([])
  const inputFile = useRef(null); 

  let userId = useParams().id

  useEffect(() => {
    if (!user) {
      userService.fetchUser(userId).then(user => {
        setUser(user)
      })
    } else {
      setUser(user)
    }
  }, [])

  // NEED TO FIX FOR JUST CURRENT USER
    const uploadImageToS3 = async (image) => {
      if (image) {
        let returnedImage = await uploadImage(image);
        let imageUrl = returnedImage.location.toString();
        setUser((selectedUser) => ({
          ...selectedUser,
          image: imageUrl,
        }))

        userService.updateUser(selectedUser.id, {image: imageUrl});
      }

    };

  const userSpecies = [...new Set(fish.map(feesh => feesh.species))]

  const classes = useStyles();

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Box className={classes.box}>
        <Avatar style={{ cursor: "pointer" }}className={classes.large} alt={selectedUser.username} src={ selectedUser.image } onClick={() => inputFile.current.click()} />
        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(event) => uploadImageToS3(event.target.files[0])}/>
        <div className="user-home-info">
          <div className="user-home-header">{ selectedUser.username }</div>
          <div className="user-subheader-wrapper">
            <div className="user-subheader">{fish.length} <span className="user-subheader-stats">caught</span></div>
            <div className="user-subheader">{userSpecies.length} <span className="user-subheader-stats">species</span></div>
          </div>
        </div>
      </Box>
      <div className="user-fish-wrapper">
        <Grid container spacing={1} style={{width: "80%"}}>
          {fish.map((feesh) => (
            <Fish key={feesh.id} fish={feesh} user={selectedUser} />
          ))}
        </Grid>
        
      </div>
    </div>
  );
}

export default User