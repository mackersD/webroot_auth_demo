import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import authService from "../../authService";

function RegistrationForm(props) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = e => {
    setUsername(e.target.value);
    setRegistrationError(null);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setRegistrationError(null);
  };

  const handleRegisterClick = () => {
    if (username.trim() === "" || password.trim() === "") {
      setRegistrationError("Username and Password cannot be empty.");
    } else if (!authService.isPasswordStrong(password)) {
      setRegistrationError("The password entered is not strong enough.");
    } else {
      setIsRegistering(true);
      authService
        .registerAsync(username, password)
        .then(res => {
          setIsRegistering(false);
          if (res) {
            alert("You have successfully been registered.");
            if (props.onRegister) {
              props.onRegister();
            }
          } else {
            setRegistrationError(
              "Please refer to your email to complete the registration process."
            );
          }
        })
        .catch(err => {
          setIsRegistering(false);
          setRegistrationError(
            "There was a problem when attempting to register."
          );
        });
    }
  };

  const handleBackClick = () => {
    if (props.onReturn) {
      props.onReturn();
    }
  };

  return (
    <div className="registrationForm">
      {registrationError && (
        <div>
          {registrationError}
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
      <Button onClick={handleRegisterClick} disabled={isRegistering}>
        Register
      </Button>
      <Button onClick={handleBackClick} disabled={isRegistering}>
        Back
      </Button>
    </div>
  );
}

export default RegistrationForm;
