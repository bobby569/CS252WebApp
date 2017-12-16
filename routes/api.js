const mongoose = require('mongoose');
const User = mongoose.model('users');

function checkLogin(req, res, next) {
	if (!req.user) {
		return res.send('--');
	}
	next();
}

module.exports = app => {
	app.get('/api/getMaxScore', async (req, res) => {
		User.find()
			.sort({ score: -1 })
			.limit(1)
			.then(obj => res.send(obj[0]));
	});

	app.get('/api/getPersonalMaxScore', async (req, res) => {
		const { id, score } = req.body;
		// TODO: findOne
		User.find({ id })
			.limit(1)
			.then(obj => {
				const maxScore = obj[0].score;
				if (score > maxScore) {
					console.log('hello');
				}
			});
	});

	app.post('/api/save', (req, res) => {
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
