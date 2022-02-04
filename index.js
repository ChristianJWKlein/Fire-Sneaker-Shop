const express = require("express");
const { connectToFirestore } = require("./connectToFirestore.js");

const app = express();
app.use(express.json());

//const userRef = db.collection("users");
//const prodRef = db.collection("products");

app.get("/", (req, res) => {
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

// app.post("/insertuser", async (req, res) => {
//   const db = connectToFirestore();
//   const user = req.body;
//   if (!user.name || !user.phone || !user.address || !user.email) {
//     res.send("Name, phone, address and/or email not entered");
//     return; //IF RETURN NOT THERE YOU DOnt prevent from happeniing
//   }
//   await insertUser(user);
//   res.send(`succesfully inserted user: ${JSON.stringify(user)}`);
// });

app.post("/insertuser", (req, res) => {
  const db = connectToFirestore();
  const user = req.body;
  db.collection("users")
    .add(user)
    .then(() => res.send(`Here is what you put in: ${user}`))
    .catch(console.error);
});

app.listen(3000, () => {
  console.log("Im here");
});
