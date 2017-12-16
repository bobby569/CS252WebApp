const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const passport = require('passport');
const path = require('path');
const keys = require('./config/keys');
require('./models/User');
// require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(
	cookieSession({
		maxAge: 7 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

// app.use(passport.initialize());
// app.use(passport.session());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/auth')(app);
require('./routes/api')(app);

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8888;
app.listen(PORT);
