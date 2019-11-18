const defaultUser = {
  username: null,
  hash: null
};

const startupData = [];

var data = [...startupData];

function getUserAsync(username) {
  return Promise.resolve(data.find(user => user.username === username));
}

function addUserAsync(username, hash) {
  return getUserAsync(username).then(user => {
    if (user) {
      return false;
    }
    data.push(
      Object.assign({}, defaultUser, {
        username: username,
        hash: hash
      })
    );
    return true;
  });
}

export default {
  getUserAsync,
  addUserAsync
};
