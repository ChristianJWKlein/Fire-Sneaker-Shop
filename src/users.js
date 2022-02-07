const { connectToFirestore } = require("./connectToFirestore.js");

const db = connectToFirestore();
usersRef = db.collection("users");

const getUserCollection = (db) => {
  const col = usersRef;
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

module.exports = { usersRef, getUserCollection, getUsers, insertUser };
