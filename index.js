const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Record');

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

const PORT = process.env.PORT || 8888;
app.listen(PORT);
