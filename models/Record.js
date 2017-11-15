const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model(
	'records',
	new Schema({
		name: String,
		score: Number
	})
);
