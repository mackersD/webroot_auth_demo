import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import authService from "../../authService";

function LoginForm(props) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleUsernameChange = e => {
    setUsername(e.target.value);
    setLoginError(null);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setLoginError(null);
  };

  const handleBackClick = () => {
    if (props.onReturn) {
      props.onReturn();
    }
  };

  const handleLoginClick = () => {
    setIsLoggingIn(true);
    authService
      .loginAsync(username, password)
      .then(user => {
        setIsLoggingIn(false);
        if (props.onLogin) {
          props.onLogin(user);
        }
      })
      .catch(err => {
        setIsLoggingIn(false);
        setUsername("");
        setPassword("");
        setLoginError(
          err.message || "There was a problem when attempting to login."
        );
      });
  };

  return (
    <div className="loginForm">
      {loginError && (
        <div>
          {loginError}
          <br />
          Please try again.
          <br />
        </div>
      )}
      <TextField
        id="userName"
        label="Username"
        margin="normal"
        onChange={handleUsernameChange}
        value={username}
      />
      <br />
      <TextField
        id="userName"
        type="password"
        label="Password"
        margin="normal"
        onChange={handlePasswordChange}
        value={password}
      />
      <br />
      <Button onClick={handleLoginClick} disabled={isLoggingIn}>
        Login
      </Button>
      <Button onClick={handleBackClick} disabled={isLoggingIn}>
        Back
      </Button>
    </div>
  );
}

export default LoginForm;
