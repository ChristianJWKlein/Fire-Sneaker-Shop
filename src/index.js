const express = require("express");
const { connectToFirestore } = require("./connectToFirestore.js");
const { getUserCollection, getUsers, insertUser } = require("./users.js");
const {
  getProductCollection,
  getProducts,
  insertProduct,
} = require("./products.js");

const app = express();
app.use(express.json());

//const userRef = db.collection("users");
//const prodRef = db.collection("products");

app.get("/user", (req, res) => {
  const db = connectToFirestore();
  db.collection("users")
    .get()
    .then((snapshot) => {
      const users = snapshot.docs.map((doc) => {
        let user = doc.data();
        user.id = doc.id;
        return user;
      });
      res.status(200).send(users);
    })
    .catch(console.error);
});

app.post("/insertuser", async (req, res) => {
  const db = connectToFirestore();
  const user = req.body;
  db.collection("users");
  if (!user.name || !user.phone || !user.address || !user.email) {
    res.send("Name, phone, address and/or email not entered");
    return;
  }
  await insertUser(user);
  res.send(`succesfully inserted user: ${JSON.stringify(user)}`);
});

// app.post("/insertuser", (req, res) => {
//   const db = connectToFirestore();
//   const user = req.body;
//   db.collection("users")
//     .add(user)
//     .then(() => res.send(`Here is what you put in: ${user}`))
//     .catch(console.error);
// });

app.get("/products", async (req, res) => {
  const db = connectToFirestore();
  const snapshot = await db.collection("products").get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/insertproduct", async (req, res) => {
  const db = connectToFirestore();
  const product = req.body;
  db.collection("products");
  if (
    !product.sku ||
    !product.title ||
    !product.description ||
    !product.vendor
  ) {
    res.send("sku, title, description and/or vendor not entered");
    return;
  } //IF RETURN NOT THERE YOU DOnt prevent from happeniing
  await insertProduct(product);
  res.send(`succesfully inserted product: ${JSON.stringify(product)}`);
});

//Below, we post an update to the objects within a product id...  We delete the specified products in that id.  Not sure if ID is delted then replaced with specified id in post.  In postman, you specify the object with id, and whatever other attributes you want to update.  Reflections shown in firestore.

app.post("/updateproduct", async (req, res) => {
  const db = connectToFirestore();
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await db.collection("products").doc(id).update(data);
  res.send("succesfully updated product");
});

app.listen(3000, () => {
  console.log("Im here");
});
