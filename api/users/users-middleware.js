const Users = require("./users-model");

const checkBody = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ message: "username and password required" });
  } else {
    next();
  }
};

const checkExists = async (req, res, next) => {
  const { username } = req.body;
  const users = await Users.findAll();
  const exist = users.some((user) => user.username === username);
  if (exist) {
    res.status(401).json({ message: "username taken" });
  } else {
    next();
  }
};

module.exports = {
  checkBody,
  checkExists,
};
