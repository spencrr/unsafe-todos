const sqlite3 = require("sqlite3");
// const sha256 = require("js-sha256").sha256;
const uuid = require("uuid");

const express = require("express");

const router = express.Router();

module.exports = router;

let db = new sqlite3.Database("./data/data.db");

db.run(
  "CREATE TABLE IF NOT EXISTS Items(name TEXT, desc TEXT, id TEXT, done BOOL)",
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
      res.status(200).send(todos);
    }
  });
});

router.post("/", (req, res) => {
  let name = req.body.name;
  let desc = req.body.desc;
  console.log(`Posting ${name}, ${desc}`);
  if (name !== undefined && desc !== undefined) {
    let item = { name, desc };
    // let id = sha256(JSON.stringify(item));
    let id = uuid();
    item.id = id;
    item.done = false;
    db.run(
      `INSERT INTO Items VALUES ('${name}', '${desc}', '${id}', 'false')`,
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

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  if (typeof id !== "undefined") {
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

router.patch("/:id/", (req, res) => {
  let id = req.params.id;
  let setName = req.body.name !== undefined ? `name='${req.body.name}',` : "";
  let setDesc = req.body.desc !== undefined ? `desc='${req.body.desc}',` : "";
  let setDone = req.body.done !== undefined ? `done='${req.body.done}'` : "";
  if (typeof id !== "undefined") {
    db.run(
      `UPDATE Items SET ${setName} ${setDesc} ${setDone} WHERE id='${id}'`,
      err => {
        if (err) {
          console.log(
            err,
            `UPDATE Items SET ${setName} ${setDesc} ${setDone} WHERE id='${id}'`
          );
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  } else {
    res.sendStatus(400);
    console.log(id, setDone);
  }
});
