const db = require("../../data/dbConfig");

const findAll = () => {
  return db("users").select("id", "username");
};

const findById = (id) => {
  return db("users").where("id", id).first();
};

const findBy = (filter) => {
  return db("users").where(filter);
};

const insert = async (user) => {
  const [id] = await db("users").insert(user);
  return findById(id);
};

module.exports = {
  findAll,
  findBy,
  insert,
};
