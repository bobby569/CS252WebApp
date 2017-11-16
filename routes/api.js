const mongoose = require('mongoose');

const Records = mongoose.model('records');

module.exports = app => {
	app.get('/api/save', (req, res) => {
		res.send('Saved');
	});

	app.get('/api/getMaxScore', (req, res) => {
		Records.find()
			.sort({ score: -1 })
			.limit(1)
			.then(obj => res.send(obj[0]));
	});

	app.post('/api/save', (req, res) => {
		const { name, score } = req.body;
		Records.findOne({ name: name }).then(existName => {
			if (existName) {
				// TODO: update
				res.send('Success');
			} else {
				const record = new Records({
					name: name,
					score: score
				})
					.save()
					.then(item => {
						res.send('Success');
					})
					.catch(err => {
						res.status(400).send('Fail');
					});
			}
		});
	});
};
