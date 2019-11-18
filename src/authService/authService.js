import passwordHelper from "./passwordHelper";
import userStore from "./userStore";

function registerAsync(username, password) {
  return passwordHelper
    .hashPasswordAsync(password)
    .then(hash => userStore.addUserAsync(username, hash));
}

function loginAsync(username, password) {
  var passwordError = new Error(
    "The username/password combination is incorrect."
  );
  return userStore.getUserAsync(username).then(user => {
    if (!user) {
      throw passwordError;
    }
    return passwordHelper.checkPasswordAsync(password, user.hash).then(res => {
      if (!res) {
        throw passwordError;
      }
      return Object.assign(
        {},
        {
          username: username
        }
      );
    });
  });
}

export default {
  registerAsync,
  loginAsync
};
