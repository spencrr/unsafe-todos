const sqlite3 = require("sqlite3");

const express = require("express");

const router = express.Router();

module.exports = router;

let db = new sqlite3.Database("@/data/site.db");

db.run("CREATE TABLE IF NOT EXISTS Items(name TEXT, description TEXT)", err => {
  if (err) {
    console.log(err);
  }
});
