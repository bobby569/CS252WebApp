const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const passport = require('passport');
const keys = require('./app/config/keys');
require('./app/models/User');
require('./app/services/passport');

mongoose.Promise = require('bluebird');
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 7 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./app/routes/auth')(app);
require('./app/routes/api')(app);

if (process.env.NODE_ENV == 'production') {
	const path = require('path');
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8888;
app.listen(PORT);
