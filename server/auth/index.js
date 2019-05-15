const url = require("url");
const sqlite3 = require("sqlite3");
const sha256 = require("js-sha256").sha256;
const express = require("express");

const router = express.Router();

module.exports = router;

let db = new sqlite3.Database("./data/site.db");

db.run("CREATE TABLE IF NOT EXISTS User(username TEXT, password TEXT)", err => {
  if (err) {
    console.log(err);
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
          }
        });
        res.redirect("/register");
      } else {
        const redirectURL = redirectWithUsername(username);
        if (password == row.password) {
          res.redirect(redirectURL("/success"));
        } else {
          res.redirect(redirectURL("/fail"));
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

const redirectWithUsername = username => {
  return base => {
    return url.format({ pathname: base, query: { username } });
  };
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
