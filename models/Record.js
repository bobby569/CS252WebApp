const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model(
	'records',
	new Schema({
		userID: String,
		name: String,
		score: Number,
		date: Date
	})
);
