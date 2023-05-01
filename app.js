const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const passport = require("passport");
const PORT = process.env.PORT || 3000;
const app = express();
const sessionRouter = require("./src/routers/sessionsRouter");
const adminRouter = require("./src/routers/adminRouter");
const authRouter = require("./src/routers/authRouter");

const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "globaomantics" }));

require("./src/config/passport.js")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.render("index", { title: "Globalmantics", data: ["a", "b", "c"] });
});

app.listen(PORT, () => {
  console.log(`listening on port + ${chalk.green(PORT)}`);
});
