const { connectToFirestore } = require("./connectToFirestore.js");

const getProductCollection = (db) => {
  const col = db.collection("products");
  return col;
};

const getProducts = async () => {
  const col = getProductCollection();
  const products = await col.find({}).toArray();
  return products;
};

const insertProduct = async (product) => {
  const db = connectToFirestore();
  const col = getProductCollection(db);
  const res = await col.add(product);
  console.log("Product Inserted by user!");
  return res;
};

module.exports = { getProductCollection, getProducts, insertProduct };
