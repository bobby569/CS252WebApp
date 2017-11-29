const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model(
	'records',
	new Schema({
		score: Number
	})
);
