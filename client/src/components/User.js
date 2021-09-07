import React, { useState, useEffect, useRef } from "react";
import fishService from '../services/fish'
import Fish from "./Fish";
import FishForm from "./FishForm";
import Togglable from "./Togglable";
import { useParams } from 'react-router-dom'

const User = ({ user }) => {
  const [fish, setFish] = useState([])

  let userId = useParams().id

  useEffect(() => {
    fishService.getUsersFish(userId).then(usersFish => {
      setFish(usersFish)
    })
  }, [])


  const addFish = (fishObject) => {
    // fishFormRef.current.toggleVisibility()
    fishService.create(fishObject).then((returnedFish) => {
      setFish(fish.concat(returnedFish));
    });
  };

  const fishFormRef = useRef();

  const fishForm = () => (
    <Togglable buttonLabel="Add Fish" ref={fishFormRef}>
      <FishForm createFish={addFish} />
    </Togglable>
  );

  return (
    <div>
      <ul>
        {fish.map((feesh) => (
          <Fish key={feesh.id} fish={feesh} />
        ))}
      </ul>

      {fishForm()}
    </div>
  )
}

export default User