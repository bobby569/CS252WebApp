const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model(
	'users',
	new Schema({
		googleID: String,
		name: String,
		score: Number,
		date: Date
	})
);
