const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const keys = require('./config/keys');
require('./models/Record');

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

require('./routes/api')(app);

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8888;
app.listen(PORT);
