import React, { useState } from "react";
import { uploadImage } from "../services/s3";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: "20px"
  },
}));


const FishForm = ({ createFish }) => {
    const [newFish, setNewFish] = useState({
        species: "",
        location: "",
        length: "",
        weight: "",
        baitType: "",
        temperature: "",
        image: ""
    });

    const [fishImage, setImage] = useState("")

    const classes = useStyles();

    const handleFishChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setNewFish((newFish) => ({
            ...newFish,
            [name]: value,
        }));
    };

    const addFish = (event) => {
      event.preventDefault()
      createFish(newFish)
      setNewFish({
          species: "",
          location: "",
          length: "",
          weight: "",
          baitType: "",
          temperature: "",
          image: ""
      })
    }

    const uploadImageToS3 = (async (image) => {
      if (image){
        const objectUrl = URL.createObjectURL(image);
        setImage(objectUrl);
        console.log(image, "here with image");
        let returnedImage = await uploadImage(image);
        let imageUrl = returnedImage.location.toString();
        setNewFish((newFish) => ({
          ...newFish,
          image: imageUrl,
        }));
      }
    })

    return (
      <form onSubmit={addFish} className="fish-form">
        <div className="species-image-wrapper">
          <label className="fish-form-label">
            Species
            <input
              className="fish-input"
              value={newFish.species}
              name="species"
              onChange={handleFishChange}
              placeholder="fish species"
            />
          </label>
          <label className="fish-form-label fish-image-label">
            <div>
              Image
              <br />
              <div className="fish-form-image-subtext">Add an image</div>
            </div>
            <input
              className="fish-image-input"
              onChange={(event) => uploadImageToS3(event.target.files[0])}
              type="file"
              accept="image/*"
            />
            <Avatar src={fishImage} className={classes.large}></Avatar>
            {/* <img alt="upload a fish" src={fishImage} /> */}
          </label>
        </div>
        <label className="fish-form-label">
          Location
          <input
            className="fish-input"
            value={newFish.location}
            name="location"
            onChange={handleFishChange}
            placeholder="where was the fish caught?"
          />
        </label>
        <label className="fish-form-label">
          Length
          <input
            className="fish-input"
            value={newFish.length}
            name="length"
            onChange={handleFishChange}
            placeholder="length in inches"
          />
        </label>
        <label className="fish-form-label">
          Weight
          <input
            className="fish-input"
            value={newFish.weight}
            name="weight"
            onChange={handleFishChange}
            placeholder="weight in lbs."
          />
        </label>
        <label className="fish-form-label">
          Bait
          <input
            className="fish-input"
            value={newFish.baitType}
            name="baitType"
            onChange={handleFishChange}
            placeholder="e.g. Rapala"
          />
        </label>
        <label className="fish-form-label">
          Temperature
          <input
            className="fish-input"
            value={newFish.temperature}
            name="temperature"
            onChange={handleFishChange}
            placeholder="Temp in fahrenheit"
          />
        </label>
        <button type="submit" className="submit-fish-button">
          save
        </button>
      </form>
    );
}

export default FishForm