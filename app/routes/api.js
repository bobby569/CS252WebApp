const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
	app.get('/api/getMaxScore', async (req, res) => {
		const user = await User.find()
			.sort({ score: -1 })
			.limit(3);
		res.send(user);
	});

	app.post('/api/saveScore', async (req, res) => {
		const { body: { score }, user: { googleID } } = req;

		const user = await User.find({ googleID }).limit(1);
		const prevScore = user[0].score;
		if (score > prevScore) {
			await User.updateOne({ googleID }, { $set: { score } });
		}
	});
};
