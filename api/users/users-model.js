const db = require("../../data/dbConfig");

const findAll = () => {
  return db("users");
};

const insert = (user) => {
  return db("users").insert(user);
};

module.exports = {
  findAll,
  insert,
};
