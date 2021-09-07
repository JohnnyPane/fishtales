import React, { useState } from "react";
import fishService from "../services/fish";
import { uploadImage } from "../services/s3";
// import { upload } from '../services/s3'


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
    //   let imageUrl = await upload(image)
        console.log(image, "here with image")
        let returnedImage = await uploadImage(image)
        let imageUrl = returnedImage.location.toString()
        setNewFish((newFish) => ({
            ...newFish,
            image: imageUrl,
        }));
    })

    return (
      <form onSubmit={addFish}>
        <label>
          Species
          <input
            value={newFish.species}
            name="species"
            onChange={handleFishChange}
          />
        </label>
        <label>
          Location
          <input
            value={newFish.location}
            name="location"
            onChange={handleFishChange}
          />
        </label>
        <label>
          Length
          <input
            value={newFish.length}
            name="length"
            onChange={handleFishChange}
          />
        </label>
        <label>
          Weight
          <input
            value={newFish.weight}
            name="weight"
            onChange={handleFishChange}
          />
        </label>
        <label>
          Bait
          <input
            value={newFish.baitType}
            name="baitType"
            onChange={handleFishChange}
          />
        </label>
        <label>
          Temperature
          <input
            value={newFish.temperature}
            name="temperature"
            onChange={handleFishChange}
          />
        </label>
        <label>
          Image
          <input
            onChange={event => uploadImageToS3(event.target.files[0])}
            type="file"
          />
        </label>
        <button type="submit">save</button>
      </form>
    );
}

export default FishForm