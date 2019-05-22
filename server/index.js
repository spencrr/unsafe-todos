const express = require("express");
const Keygrip = require("keygrip");
const cookieSession = require("cookie-session");
const auth = require("./routes/auth");
const todos = require("./routes/todos");
const cors = require("cors");

const app = express();

app.use(express.static("static"));
app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: new Keygrip(["key1", "key2"], "SHA256")
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.use(express.static(__dirname));
app.use("/auth", auth);
app.use("/todos", todos);
