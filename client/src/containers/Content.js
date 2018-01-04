import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ScoreCard from '../components/ScoreCard';
import Board from '../components/Board/Board';

class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			maxScore: 0,
			personalMaxScore: 0,
			currScore: 0
		};
	}

	componentDidMount() {
		this.getMaxScore();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ personalMaxScore: nextProps.auth.score });
	}

	getMaxScore() {
		axios
			.get('/api/getMaxScore')
			.then(res => this.setState({ maxScore: res.data[0].score }))
			.catch(err => console.error(err));
	}

	updateScore(score) {
		const { personalMaxScore, currScore } = this.state;
		const newScore = currScore + score;
		this.setState({ currScore: newScore });

		if (this.props.auth && newScore > personalMaxScore) {
			this.setState({ personalMaxScore: newScore });
			axios.post('/api/saveScore', { score: newScore }).then(() => this.getMaxScore());
		}
	}

	render() {
		const { maxScore, personalMaxScore, currScore } = this.state;
		const { auth } = this.props;
		return (
			<div>
				<div className="row">
					<ScoreCard name="Highest Score" score={maxScore} />
					<ScoreCard name="Personal Record" score={auth ? personalMaxScore : '--'} />
					<ScoreCard name="Current Score" score={currScore} />
				</div>
				<Board
					handleReset={() => this.setState({ currScore: 0 })}
					updateScore={score => this.updateScore(score)}
				/>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Content);
