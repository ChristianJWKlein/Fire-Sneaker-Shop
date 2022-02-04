const { connectToFirestore } = require("./connectToFirestore.js");

const getUserCollection = (db) => {
  const col = db.collection("users");
  return col;
};

const getUsers = async () => {
  const col = getUserCollection();
  const users = await col.find({}).toArray();
  return users;
};

const insertUser = async (user) => {
  const db = connectToFirestore();
  const col = getUserCollection(db);
  const res = await col.add(user);
  console.log("User Inserted by user!");
  return res;
};

module.exports = { getUserCollection, getUsers, insertUser };
