import React, { useState, useEffect, useRef } from "react";
import userService from '../services/user'
import Fish from "./Fish";
import { useParams } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { uploadImage } from "../services/s3";

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

const User = ({ user, fish }) => {
  // const [fish, setFish] = useState([])
  const [selectedUser, setUser] = useState([])
  const [imageFile, setFile] = useState('')
  const inputFile = useRef(null); 

  let userId = useParams().id

  useEffect(() => {
    // fishService.getUsersFish(userId).then(usersFish => {
    //   setFish(usersFish)
    // })

    console.log("USER EFFECT", selectedUser)

    if (!user) {
      userService.fetchUser(userId).then(user => {
        console.log(user, "HERE WITH USER")
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

  // const addFish = (fishObject) => {
  //   fishService.create(fishObject).then((returnedFish) => {
  //     setFish(fish.concat(returnedFish));
  //   });
  // };

  // const fishFormRef = useRef();

  const classes = useStyles();

  // const fishForm = () => (
  //   <Togglable buttonLabel="Add Fish" ref={fishFormRef}>
  //     <FishForm createFish={addFish} />
  //   </Togglable>
  // );

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
        {fish.map((feesh) => (
          <Fish key={feesh.id} fish={feesh} user={selectedUser} />
        ))}

        {/* {fishForm()} */}
      </div>
    </div>
  );
}

export default User