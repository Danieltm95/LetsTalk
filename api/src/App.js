const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const server = express();

server.use(morgan('dev'));
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  })
server.use("/", routes)


module.exports = server;