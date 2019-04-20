var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require('./config/keys').mongoURI;
const loginRouter = require("./routes/login");
const authChek = require("./authCheck");
var app = express();

//Book Management
const bookRouter = require('./routes/bookroutes');

// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use("api/admin",authChek("admin"));
app.use("api/lib",authChek("lib"));
loginRouter.use("/login",loginRouter);

//Books Management
app.use('/books', bookRouter);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, ()=>console.log("Server is running on port 3000"));
  }).catch(err => console.log(err));




module.exports = app;
