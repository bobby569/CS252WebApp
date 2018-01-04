const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model(
	'users',
	new Schema({
		googleID: String,
		name: String,
		score: { type: Number, default: 0 },
		photo: String,
		date: Date
	})
);
