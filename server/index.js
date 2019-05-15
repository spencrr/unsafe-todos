const express = require("express");
const auth = require("./auth");

const app = express();

app.use(express.static("static"));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["key"]
//   })
// );

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.use("/auth", auth);
