// imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const store = new session.MemoryStore();

const usersRoute = require("./routers/usersRouter.js");
const gamesRouter = require("./routers/gamesRouter.js");
const achievementsRouter = require("./routers/achievementsRouter.js");
const steamRouter = require("./routers/steamRouter.js");

// globals
const port = process.env.PORT;
const oneDay = 1000 * 60 * 60 * 24;

// initialising the server
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "crossdomain", "credentials"],
    credentials: true,
  })
);

app.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: oneDay, sameSite: false },
      store,
    })
  );

// root
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the SteamAchiev API!");
});

// routes
app.use("/users", usersRoute);
app.use('/games', gamesRouter);
app.use('/achievements', achievementsRouter);
app.use('/steam', steamRouter);

// starting server on port
app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
