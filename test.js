require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const db = require("./db/db");
const services = require("./services");
const { Profile } = require("./models");
const { deletePhoneById } = require("./services/phone");
const { auth } = require("./app/firebase");

async function main() {
  const conn = await db("mongodb://127.0.0.1:27017/ams");
  try {
    const users = await auth.listUsers();
    const uids = users.users.map((u) => u.uid);
    const dusers = await auth.deleteUsers(uids);
    console.log(dusers);
  } catch (error) {
    console.log(error);
    console.log("Got error.", error.message);
  }
  conn.connection.close();
}

main();
