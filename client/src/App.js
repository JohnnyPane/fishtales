import './App.css';
import {
  BrowserRouter as Router, 
  Switch, Route, Redirect
} from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import loginService from "./services/login"
import userService from './services/user'
import fishService from "./services/fish"
import Fish from './components/Fish'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import User from './components/User'
import StatsPage from './components/StatsPage'
import Navbar from './components/Navbar';
// import { param } from '../../server/controllers/users';

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('') 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState('')
  const [currentUserId, setUserId] = useState('')
  const [currentUser, setUser] = useState(null)
  const [fish, setFish] = useState([])
  const [userFish, setUserFish] = useState([])
  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    // fishService.getAll().then(initialFish => {
    //   // setFish(initialFish)
    //   initialFish.map(async feesh => {
    //     let owner = await userService.fetchUser(feesh.user)
    //       feesh.user = owner
    //       setFish(fish.concat(feesh))
    //   })
    // })
     const currentUserJSON = window.localStorage.getItem("currentUser");
     if (currentUserJSON) {
       const user = JSON.parse(currentUserJSON);
       setUser(user);
       setUserId(user.id);
       fishService.setToken(user.token);

       fishService.getUsersFish(user.id).then((usersFish) => {
         setUserFish(usersFish);
       });
     }

  }, [])

    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setDrawerState({ ...drawerState, [anchor]: open });
    };


  // useEffect(() => {
  //   const currentUserJSON = window.localStorage.getItem("currentUser")
  //   if (currentUserJSON) {
  //     const user = JSON.parse(currentUserJSON)
  //     setUser(user)
  //     setUserId(user.id)
  //     fishService.setToken(user.token)
  //   }
  // }, [])

  const addFish = (fishObject) => {
    // JUST ADD USER FISH FOR NOW
    fishService.create(fishObject).then((returnedFish) => {
      setUserFish(userFish.concat(returnedFish))
      // setFish(fish.concat(returnedFish));
    });

    setDrawerState("bottom", false)
  };

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log("login time")
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      fishService.setToken(user.token)
      setUser(user)
      setUserId(user.id)
      setUsername('')
      setPassword('')
      setEmail('')
    } catch {
      console.log("wrong credentials")
    }
  }

  const handleSignup = async (event) => {
     event.preventDefault();
     try {
        console.log("SGINING")
        await userService.signup({
          username,
          password,
          email
        });

        handleLogin(event)
     } catch {
       console.log("unable to sign up");
     }
  }

  const handleLogout = async (event) => {
    // event.preventDefault()
    console.log("Logout")
    window.localStorage.removeItem("currentUser");
    setUser(null)
    setUserId("")
    setUsername("");
    setPassword("");
    setEmail("");
  }

  // const loginForm = () => (
  //   <Togglable buttonLabel="Log in">
  //     <LoginForm
     
  //     />
  //     <button onClick={() => setLoginVisible(false)}>cancel</button>
  //   </Togglable>
  // );

  // const fishFormRef = useRef()

  // const fishForm = () => (
  //   <Togglable buttonLabel="Add Fish" ref={fishFormRef}>
  //     <FishForm createFish={addFish} />
  //   </Togglable>
  // );

  return (
    <div>
      {currentUser ? (
        <Navbar 
          currentUser={currentUser}
          handleLogout={handleLogout}
          addFish={addFish}
          toggleDrawer={toggleDrawer}
          drawerState={drawerState}
        />
      ) : null}

      <Switch>
        <Route path="/fish">
          {fish.map((feesh) => (
            <Fish fish={feesh} />
          ))}
        </Route>
        <Route path="/user/:id/stats">
            <StatsPage fish={userFish} />
        </Route>
        <Route path="/user/:id">
          <User user={currentUser ? currentUser : null} fish={userFish} />
        </Route>
        <Route path="/signup">
          {currentUser ? (
            <Redirect to={"/user/" + currentUserId} />
          ) : (
            <SignupForm
              username={username}
              password={password}
              email={email}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleEmailChange={({ target }) => setEmail(target.value)}
              handleSubmit={handleSignup}
            />
          )}
        </Route>
        <Route path="/">
          {currentUser ? (
            <Redirect to={"/user/" + currentUserId} />
          ) : (
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          )}
        </Route>
      </Switch>
    </div>

    // <div>
    //   <h1>Fish</h1>
    //   <div>
    //     {username} {password}
    //   </div>

    //   {user ? <button onClick={(event) => handleLogout(event)}>Logout</button> : loginForm()}

    //   {fishForm()}
    //   <ul>
    //     {fish.map((feesh) => (
    //       <Fish key={feesh.id} fish={feesh} />
    //     ))}
    //   </ul>
    // </div>
  );
}

export default App