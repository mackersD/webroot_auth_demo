import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegistrationForm from "../RegistrationForm";
import LoginForm from "../LoginForm";

function App() {
  const [page, setPage] = useState("welcome");
  const [user, setUser] = useState(null);

  const handleWelcomeLoginClick = e => {
    setPage("login");
  };

  const handleWelcomeRegisterClick = e => {
    setPage("register");
  };

  const handleOnRegister = () => {
    setPage("welcome");
  };

  const handleOnReturn = () => {
    setPage("welcome");
  };

  const handleOnLogin = user => {
    setUser(user || null);
    setPage("home");
  };

  const handleLogoutClick = () => {
    setUser(null);
    setPage("welcome");
  };

  return (
    <Typography component="div">
      <div className="App">
        {page === "welcome" && (
          <div className="welcomePage">
            {"Welcome to the auth demo by Jonathan MacDonald!"}
            <br />
            {"Please select an option below."}
            <br />
            <Button onClick={handleWelcomeLoginClick}>Login</Button>
            <Button onClick={handleWelcomeRegisterClick}>Register</Button>
          </div>
        )}
        {page === "register" && (
          <RegistrationForm
            onRegister={handleOnRegister}
            onReturn={handleOnReturn}
          />
        )}
        {page === "login" && (
          <LoginForm onReturn={handleOnReturn} onLogin={handleOnLogin} />
        )}
        {page === "home" && (
          <div>
            {`Congrats ${user.username}! You successfully logged in`}
            <br />
            <Button onClick={handleLogoutClick}>Logout</Button>
          </div>
        )}
      </div>
    </Typography>
  );
}

export default App;
