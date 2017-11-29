const mongoose = require('mongoose');

const Records = mongoose.model('records');

module.exports = app => {
	app.get('/api/getMaxScore', (req, res) => {
		Records.find()
			.sort({ score: -1 })
			.limit(1)
			.then(obj => res.send(obj[0]));
	});

	app.post('/api/save', (req, res) => {
		const { score } = req.body;

		Records.find()
			.sort({ score: -1 })
			.limit(1)
			.then(obj => {
				const maxScore = obj[0];

				if (score > maxScore) {
					Records.updateOne({ score: maxScore }, { score })
						.then(item => res.send('Success'))
						.catch(err => res.send('Fail'));
				}
			});
	});
};
