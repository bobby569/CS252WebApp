import React, { Component } from 'react';
import axios from 'axios';
import ScoreBoard from './ScoreBoard';
import Board from './Board';

export default class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maxScore: 0,
			currScore: 0
		};

		this.getMaxScore();
		this.handleReset = this.handleReset.bind(this);
	}

	getMaxScore() {
		axios
			.get('/api/getMaxScore')
			.then(res => this.setState({ maxScore: res.data.score }))
			.catch(err => console.log(err));
	}

	handleReset() {
		const currScore = 0;
		this.setState({ currScore });
	}

	updateScore(score) {
		const { currScore, maxScore } = this.state;
		const newScore = currScore + score;
		this.setState({ currScore: newScore });

		if (newScore > maxScore) {
			this.setState({ maxScore: newScore });
			axios.post('/api/save', { score: newScore });
		}
	}

	render() {
		const { maxScore, currScore } = this.state;
		return (
			<div>
				<div className="row">
					<ScoreBoard name="Highest Score" score={maxScore} />
					<ScoreBoard name="Personal Record" score={currScore} />
					<ScoreBoard name="Current Score" score={currScore} />
				</div>
				<Board
					handleReset={() => this.handleReset()}
					updateScore={score => this.updateScore(score)}
				/>
			</div>
		);
	}
}
