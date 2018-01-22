const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
	app.get('/api/getMaxScore', async (req, res) => {
		const user = await User.find()
			.sort({ score: -1 })
			.limit(3);
		res.send(user);
	});

	app.post('/api/saveScore', (req, res) => {
		const { body: { score }, user: { googleID } } = req;
		User.updateOne({ googleID }, { $max: { score } }).then(stat => res.send('Success'));
	});
};
