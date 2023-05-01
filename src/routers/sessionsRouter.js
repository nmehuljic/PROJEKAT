const express = require("express");
const sessions = require("../data/sessions.json");
const { MongoClient, ObjectId } = require("mongodb");
const sessionRouter = express.Router();

sessionRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://dbUser:1a9EkolN3Kgyl1BL@globomantics.fjzclei.mongodb.net/test";
  const dbName = "globalmantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the mongo DB");

      const db = client.db(dbName);
      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", { sessions });
    } catch (error) {
      console.log("Mongo db err", error);
    }
    client.close();
  })();
});

sessionRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const url =
    "mongodb+srv://dbUser:1a9EkolN3Kgyl1BL@globomantics.fjzclei.mongodb.net/test";
  const dbName = "globalmantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the mongo DB");

      const db = client.db(dbName);
      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(id) });
      res.render("session", {
        session,
      });
    } catch (error) {
      console.log("Mongo db err", error);
    }
    client.close();
  })();
});

module.exports = sessionRouter;
