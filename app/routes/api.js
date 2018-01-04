const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
	app.get('/api/getMaxScore', (req, res) => {
		User.find()
			.sort({ score: -1 })
			.limit(3)
			.then(obj => res.send(obj));
	});

	app.post('/api/saveScore', (req, res) => {
		const { score } = req.body;

		User.find()
			.limit(1)
			.then(obj => {
				const maxScore = obj[0].score;

				if (score > maxScore) {
					User.updateOne({ score: maxScore }, { score })
						.then(item => res.send('Success'))
						.catch(err => res.send('Fail'));
				}
			});
	});
};
