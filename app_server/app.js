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
const librianManage = require("./routes/librianManage");
const validator = require("./routes/validator");
var app = express();

const readerRouter = require("./routes/reader");
//Book Management
const bookRouter = require('./routes/bookroutes');


// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//Books Management
app.use('/books', bookRouter);

app.use("/api/admin",authChek("admin"));
app.use("/api/lib",authChek("lib"));
app.use("/login",loginRouter);
app.use("/api/admin/librian",librianManage);
app.use("/reader", readerRouter);
app.use("/validate", validator);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send(err.message);
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000);
  }).catch(err => console.log(err));




module.exports = app;
