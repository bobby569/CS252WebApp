import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import ScoreBoard from '../components/ScoreBoard';
import SavePrompt from '../components/SavePrompt';
import TextField from 'material-ui/TextField';

export default class ActionInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			maxScore: 0,
			currScore: 0,
			dialogOpen: false,
			promptOpen: false,
			promptMsg: '',
			name: ''
		};

		this.getMaxScore();
		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	getMaxScore() {
		axios
			.get('/api/getMaxScore')
			.then(res => this.setState({ maxScore: res.data.score }))
			.catch(err => console.log(err));
	}

	handleClose() {
		this.setState({ dialogOpen: false });
	}

	async handleSave(e) {
		e.preventDefault();
		const { name, currScore } = this.state;
		if (name.length === 0) {
			this.setState({ promptOpen: true, promptMsg: 'Name is required' });
			setTimeout(() => this.setState({ promptOpen: false }), 1000);
			return;
		}

		const { data } = await axios.post('/api/save', {
			name: name,
			score: currScore
		});

		this.handleClose();
		this.setState({
			promptOpen: true,
			promptMsg: data,
			name: ''
		});
	}

	render() {
		const { maxScore, currScore, dialogOpen, promptOpen, promptMsg, name } = this.state;
		const buttonStyle = {
			margin: '50px'
		};
		const actions = [
			<MuiThemeProvider>
				<div>
					<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />
					<FlatButton label="Save" primary={true} onClick={this.handleSave} />
				</div>
			</MuiThemeProvider>
		];
		return (
			<div className="row">
				<div className="col s12 m6">
					<ScoreBoard maxScore={maxScore} currScore={currScore} />
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
								onClick={() => this.setState({ dialogOpen: true })}
							/>
						</MuiThemeProvider>

						<MuiThemeProvider>
							<Dialog
								title="Your Name, please"
								contentStyle={{ width: '25%' }}
								open={dialogOpen}
								actions={actions}
							>
								<TextField
									hintText="Name"
									value={name}
									onChange={e => this.setState({ name: e.target.value })}
								/>
							</Dialog>
						</MuiThemeProvider>

						<MuiThemeProvider>
							<SavePrompt open={promptOpen} msg={promptMsg} />
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
