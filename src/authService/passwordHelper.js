import bcrypt from "bcryptjs";

const saltRounds = 10;

function generateSaltAsync() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      }
      resolve(salt);
    });
  });
}

function hashPasswordAsync(password) {
  const hashPasswordWithSalt = (pw, salt) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pw, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  };

  return generateSaltAsync().then(salt => {
    return hashPasswordWithSalt(password, salt);
  });
}

function checkPasswordAsync(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

function getPasswordRules() {
  return [
    "Must be at least 8 characters long",
    "Must have a number",
    "Must have an uppercase letter"
  ];
}

function isPasswordStrong(password) {
  const containsUppercase = /[A-Z]+/;
  const containsNumber = /[\d]+/;

  var isStrong = true;
  isStrong &= !!password;
  isStrong &= password.length >= 8;
  isStrong &= containsUppercase.test(password);
  isStrong &= containsNumber.test(password);

  return isStrong;
}

export default {
  hashPasswordAsync,
  checkPasswordAsync,
  isPasswordStrong,
  getPasswordRules
};
