// imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database/connect.js");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cookieParser = require("cookie-parser");

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

// log routes and their methods that are called
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// bypass CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "crossdomain", "credentials"],
    credentials: true,
  })
);

// session object
const sess = {
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: oneDay, sameSite: false },
  store: new pgSession({
    pool: db,
    tableName: "user_sessions",
  }),
};

// check if app is in production, if so set the cookie to secure
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// use the session
app.use(session(sess));

// root
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the SteamAchiev API!");
});

// routes
app.use("/users", usersRoute);
app.use("/games", gamesRouter);
app.use("/achievements", achievementsRouter);
app.use("/steam", steamRouter);

// starting server on port
app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
