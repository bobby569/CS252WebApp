import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class ActionInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'Bobby',
			maxScore: 0,
			currScore: 0
		};

		this.getMaxScore();
		this.handleSave = this.handleSave.bind(this);
	}

	getMaxScore() {
		axios
			.get('/api/getMaxScore')
			.then(res => this.setState({ maxScore: res.data.score }))
			.catch(err => console.log(err));
	}

	handleSave(e) {
		e.preventDefault();
		const { name, currScore } = this.state;
		axios
			.post('/api/save', {
				name: name,
				score: currScore
			})
			.then(res => console.log(res.data))
			.catch(err => console.log(err));
	}

	render() {
		const { maxScore } = this.state;
		const buttonStyle = {
			margin: '50px'
		};
		return (
			<div className="row">
				<div className="col s12 m6">
					<div className="row">
						<div className="col s12 m6">
							<div className="card white darken-1">
								<div className="card-content black-text">
									<span className="card-title">Highest Score</span>
									<p>{maxScore}</p>
								</div>
							</div>
						</div>
						<div className="col s12 m6">
							<div className="card white darken-1">
								<div className="card-content black-text">
									<span className="card-title">Current Score</span>
									<p>10</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col s12 m6">
					<div>
						<MuiThemeProvider>
							<RaisedButton
								style={buttonStyle}
								label="Restart"
								primary={true}
								onClick={this.props.handleReset}
							/>
						</MuiThemeProvider>
						<MuiThemeProvider>
							<RaisedButton
								style={buttonStyle}
								label="Save Score"
								primary={true}
								onClick={this.handleSave}
							/>
						</MuiThemeProvider>
					</div>
				</div>
			</div>
		);
	}
}

// function mapStateToProps({ reducer }) {
// 	return { reducer };
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({reducer},dispatch)
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);
