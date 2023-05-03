// imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// globals
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE", "OPTIONS", "HEAD"],
  })
);

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
