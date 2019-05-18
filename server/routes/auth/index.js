const sqlite3 = require("sqlite3");
const sha256 = require("js-sha256").sha256;
const express = require("express");

const router = express.Router();

module.exports = router;

let db = new sqlite3.Database("./data/data.db");

db.run("CREATE TABLE IF NOT EXISTS User(username TEXT, password TEXT)", err => {
  if (err) {
    console.log("erorr is ", err);
  }
});

router.post("/login", (req, res) => {
  let { username, password } = getCredentialsFromRequest(req);
  searchForUser(username, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      if (!row) {
        registerUser(username, password, err => {
          if (err) {
            console.log(err);
            res.send(500);
          }
        });
        res.sendStatus(201);
      } else {
        if (password == row.password) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      }
    }
  });
});

const getCredentialsFromRequest = req => {
  let username = req.body.username;
  let password = sha256(req.body.password);
  return { username, password };
};

const searchForUser = (username, callback) => {
  db.get(`SELECT * FROM User WHERE username='${username}'`, callback);
};

const registerUser = (username, password, callback) => {
  db.run(`INSERT INTO User VALUES ('${username}', '${password}')`, callback);
};

router.get("/users", (req, res) => {
  db.all("SELECT * FROM User", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});
