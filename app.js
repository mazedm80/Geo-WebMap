const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('./database/mongoose');

var APIRouter = require('./routes/data');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/api', APIRouter);

// const port = 3000;
// app.listen(port, () => {
//     // eslint-disable-next-line
//     console.log(`Server running on port ${port}`);
// });
module.exports = app;