const sqlite3 = require("sqlite3");
// const sha256 = require("js-sha256").sha256;
const uuid = require("uuid");

const express = require("express");

const router = express.Router();

module.exports = router;

let db = new sqlite3.Database("./data/data.db");

db.run(
  "CREATE TABLE IF NOT EXISTS Items(name TEXT, description TEXT, id TEXT, complete BOOL)",
  err => {
    if (err) {
      console.log(err);
    }
  }
);

router.get("/", (req, res) => {
  db.all("SELECT * FROM Items", (err, todos) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(todos);
    }
  });
});

router.post("/", (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  if (name && description) {
    let item = { name, description };
    // let id = sha256(JSON.stringify(item));
    let id = uuid();
    item.id = id;
    item.complete = false;
    db.run(
      `INSERT INTO Items VALUES ('${name}', '${description}', '${id}', 'false')`,
      err => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.status(201).send(item);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
});

router.delete("/", (req, res) => {
  let id = req.body.id;
  if (id) {
    db.run(`DELETE FROM Items WHERE id='${id}'`, err => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

router.patch("/", (req, res) => {
  let id = req.body.id;
  let complete = req.body.complete;
  if (id !== undefined && complete !== undefined) {
    db.run(`UPDATE Items SET complete='${complete}' WHERE id='${id}'`, err => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(400);
  }
});
