const express = require("express");
const { MongoClient } = require("mongodb");
const sessions = require("../data/sessions.json");
const mongoose = require("mongoose");

const adminRouter = express.Router();

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://dbUser:1a9EkolN3Kgyl1BL@globomantics.fjzclei.mongodb.net/test";
  const dbName = "globalmantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the mongo DB");

      const db = client.db(dbName);
      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      console.log("Mongo db err", error);
    }
    client.close();
  })();
});

module.exports = adminRouter;
