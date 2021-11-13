require("dotenv").config();
const path = require("path");
const express = require("express");
const connectDB = require("./database");

// DEPENDECY PACKAGES
const morgan = require("morgan");
const cors = require("cors");

// Passport
const passport = require("passport");
const { localStrategy, JWTStrategy } = require("./middleware/passport");

// Middleware
const { errorHandler } = require("./middleware/errorHandler");

// Routes Imports
const userRoutes = require("./apis/users/user.routes");
const moviesRoutes = require("./apis/movies/movies.routes");
const genreRoutes = require("./apis/genres/genres.routes");
const celebrityRoutes = require("./apis/celebrity/celebrity.routes");

const app = express();
connectDB();
app.use(morgan("dev"));
app.use(express.json());

// PASSPORT
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(JWTStrategy);

// CORS && Media Route
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));

// Routes
app.use("/api/", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/celebrities", celebrityRoutes);

// ErrorHandler
app.use(errorHandler);

// SERVER ACTIVATION
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
