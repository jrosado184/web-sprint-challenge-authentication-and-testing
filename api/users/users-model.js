const db = require("../../data/dbConfig");

const findAll = () => {
  return db("users").select("id", "username");
};

const findById = (id) => {
  return db("users").where("id", id).select("id", "username").first();
};

const insert = async (user) => {
  const [id] = await db("users").insert(user);
  return findById(id);
};

module.exports = {
  findAll,
  insert,
};
