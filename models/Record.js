const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model(
	'record',
	new Schema({
    name: String,
    score: Number
	})
);
