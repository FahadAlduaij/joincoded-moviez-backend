//REQUIREMENTS AND DEPENDENCIES
require("dotenv").config();
const path = require("path")
const express = require("express");
//DEPENDECY PACKAGES AND MODULES
const morgan = require('morgan');
const cors = require('cors');

//DB AND ERRORHANDLING MIDDLEWARE
const connectDB = require("./database");
const { errorHandler } =require('./middleware/errorHandler');

//ROUTE IMPORTS
const userRoutes = require("./apis/users/user.routes");


const app = express();
connectDB();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));


//ROUTES
app.use("/api/user", userRoutes)

app.use(errorHandler);

//SERVER ACTIVATION
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Server Running on Port ${PORT}`));