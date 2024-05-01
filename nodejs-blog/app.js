const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const connectDB = require("./config/database.js");
const session = require("express-session");
const { isActiveRoute } = require("./helpers/routeHelpers.js");

const app = express();
const PORT = process.env.PORT || 5000;

// body parser for json and form url-encode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and sessions
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
);

// method override
app.use(methodOverride("_method"));

// connect to database
connectDB();

app.use(express.static("public"));

// templating engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "resources/views"));
app.set("layout", "layouts/app");
app.set("view engine", "ejs");

app.use("/", require("./routes/main.js"));
app.use("/admin", require("./routes/admin.js"));

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
