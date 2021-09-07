import React, { useState, useEffect, useRef } from "react";
import fishService from '../services/fish'
import userService from '../services/user'
import Fish from "./Fish";
import FishForm from "./FishForm";
import Togglable from "./Togglable";
import { useParams } from 'react-router-dom'

const User = ({ user }) => {
  const [fish, setFish] = useState([])
  const [selectedUser, setUser] = useState([])

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


  const addFish = (fishObject) => {
    // fishFormRef.current.toggleVisibility()
    fishService.create(fishObject).then((returnedFish) => {
      setFish(fish.concat(returnedFish));
    });
  };

  const fishFormRef = useRef();

  // const fishForm = () => (
  //   <Togglable buttonLabel="Add Fish" ref={fishFormRef}>
  //     <FishForm createFish={addFish} />
  //   </Togglable>
  // );

  return (
    <div className="user-fish-wrapper">
        {fish.map((feesh) => (
          <Fish key={feesh.id} fish={feesh} user={selectedUser} />
        ))}

      {/* {fishForm()} */}
    </div>
  )
}

export default User