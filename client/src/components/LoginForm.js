import React from 'react'
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Container";
import { borders, palette, sizing, spacing } from "@material-ui/system";


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Box className="credential-box" maxWidth="500px" px="50px">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="credenitial-label">username</div>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            placeholder="e.g. JackSparrow"
            className="credential-input"
          />
        </div>
        <div>
          <div className="credenitial-label">password</div>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            placeholder="******"
            className="credential-input"
          />
        </div>
        <div className="credential-button-wrapper">
          <button type="submit" className="submit-credential-button">
            login
          </button>
          <Link to="/signup" className="credential-reroute">
            Create An Account
          </Link>
        </div>
      </form>
    </Box>
  );
};

export default LoginForm