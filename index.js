const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const keys = require('./config/keys');
require('./models/Record');

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

require('./routes/saveRecord')(app);

const PORT = process.env.PORT || 8888;
app.listen(PORT);
