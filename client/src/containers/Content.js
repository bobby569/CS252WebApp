import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ScoreBoard from '../components/ScoreBoard';
import Board from '../components/Board';

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maxScore: 0,
			personalMaxScore: 0,
			currScore: 0
		};

		this.handleReset = this.handleReset.bind(this);
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
			.catch(err => console.log(err));
	}

	handleReset() {
		const currScore = 0;
		this.setState({ currScore });
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
					<ScoreBoard name="Highest Score" score={maxScore} />
					<ScoreBoard name="Personal Record" score={auth ? personalMaxScore : '--'} />
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

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Content);
