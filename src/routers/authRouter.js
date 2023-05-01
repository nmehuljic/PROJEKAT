const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  const url =
    "mongodb+srv://dbUser:1a9EkolN3Kgyl1BL@globomantics.fjzclei.mongodb.net/test";
  const dbName = "globalmantics";
  //CREATING USER
  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne();
      console.log(results);
      req.login(results.ops[0], () => {
        req.redirect("/auth/profile");
      });
    } catch (error) {
      console.log("Not connected", error);
    }
  });

  authRouter.route("/profile").get((req, res) => {
    res.json(req.user);
  });
});

module.exports = authRouter;
