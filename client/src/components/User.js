import React, { useState, useEffect, useRef } from "react";
import fishService from '../services/fish'
import userService from '../services/user'
import Fish from "./Fish";
import FishForm from "./FishForm";
import Togglable from "./Togglable";
import { useParams } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { uploadImage } from "../services/s3";

const defaultAvatar =
  "https://images.unsplash.com/photo-1532015917327-c7c46aa1d930?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80";

const useStyles = makeStyles((theme) => ({
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
    paddingBottom: "30px"
  },
}));

const User = ({ user }) => {
  const [fish, setFish] = useState([])
  const [selectedUser, setUser] = useState([])
  const [imageFile, setFile] = useState('')
  const inputFile = useRef(null); 

  let userId = useParams().id

  useEffect(() => {
    fishService.getUsersFish(userId).then(usersFish => {
      setFish(usersFish)
    })

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

  const addFish = (fishObject) => {
    // fishFormRef.current.toggleVisibility()
    fishService.create(fishObject).then((returnedFish) => {
      setFish(fish.concat(returnedFish));
    });
  };

  const fishFormRef = useRef();

  const classes = useStyles();

  // const fishForm = () => (
  //   <Togglable buttonLabel="Add Fish" ref={fishFormRef}>
  //     <FishForm createFish={addFish} />
  //   </Togglable>
  // );

  return (
    <div style={{display: "flex", "flex-direction": "column"}}>
      <Box className={classes.box}>
        <Avatar style={{ cursor: "pointer" }}className={classes.large} alt={selectedUser.username} src={selectedUser.image ? selectedUser.image : null} onClick={() => inputFile.current.click()} />
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
        {fish.map((feesh) => (
          <Fish key={feesh.id} fish={feesh} user={selectedUser} />
        ))}

        {/* {fishForm()} */}
      </div>
    </div>
  );
}

export default User