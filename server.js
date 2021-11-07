//REQUIREMENTS AND DEPENDENCIES
require("dotenv").config();
const path = require("path")
const express = require("express");
//DEPENDECY PACKAGES AND MODULES
const morgan = require('morgan');
const cors = require('cors');
const passport = require("passport")
const {localStrategy, JWTStrategy} = require('./middleware/passport')
//DB AND ERRORHANDLING MIDDLEWARE
const connectDB = require("./database");
const { errorHandler } =require('./middleware/errorHandler');


const app = express();
connectDB();
app.use(morgan("dev"));
app.use(express.json());

//PASSPORT
app.use(passport.initialize())
passport.use(localStrategy)
passport.use(JWTStrategy)

//CORS && MULTER
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));

//ROUTE IMPORTS
const userRoutes = require("./apis/users/user.routes");
const moviesRoutes = require("./apis/movies/movies.routes");

//ROUTES
app.use("/api/user", userRoutes)
app.use("/api/movies", moviesRoutes)

app.use(errorHandler);

//SERVER ACTIVATION
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Server Running on Port ${PORT}`));