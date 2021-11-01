const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoute = require("./route.js");

mongoose
  .connect(
    "mongodb+srv://user:1234@nestcluster.zalkj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/product", productRoute);

app.use((err, req, res, next) => {
  res.status(500).json({ msg: "server error" });
});

app.listen(8000);
console.log("server is started");

module.exports = app;
