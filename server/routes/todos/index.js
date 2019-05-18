const sqlite3 = require("sqlite3");

const express = require("express");

const router = express.Router();

module.exports = router;

let db = new sqlite3.Database("./data/data.db");

db.run("CREATE TABLE IF NOT EXISTS Items(name TEXT, description TEXT)", err => {
  if (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM Items", (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send({ todos: rows });
    }
  });
});

router.post("/", (req, res) => {
  if (req.body.name && req.body.description) {
    console.log(
      `INSERT INTO Items VALUES ('${req.body.name}', '${req.body.description}')`
    );
    db.all(
      `INSERT INTO Items VALUES ('${req.body.name}', '${
        req.body.description
      }')`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.status(200).send(result);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
});
