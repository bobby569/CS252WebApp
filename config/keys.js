// key.js
if (process.env.NODE_ENV == 'production') {
	module.exports = {
		mongoURI: process.env.MONGO_URI
	};
} else {
	module.exports = {
		mongoURI: 'mongodb://user:password@ds251985.mlab.com:51985/cs252lab6'
	};
}
