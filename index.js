const express = require("express");
const userRouter = require("./routes/users.router");

require('./conn');

const app = express();

app.use(express.json());

// app.get("/", (req, res) => res.send("Hello."));
app.use("/api/users", userRouter);

app.listen(80, () => console.log("started"));
