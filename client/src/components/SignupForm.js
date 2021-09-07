import React from "react";
import { Link } from "react-router-dom"

const SignupForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  handleEmailChange,
  username,
  password,
  email
}) => {
  return (
    <div className="credential-box">
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          email
          <input
            type="email"
            value={email}
            name="Email"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">sign up</button>
      </form>

      <Link to="/">Or log in if you already have an account</Link>
    </div>
  );
};

export default SignupForm;
