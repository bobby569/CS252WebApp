import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import ScoreBoard from '../components/ScoreBoard';
import SavePrompt from '../components/SavePrompt';
import TextField from 'material-ui/TextField';
import { getMaxScore } from '../actions/index';

class ActionInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currScore: 0,
			dialogOpen: false,
			promptOpen: false,
			promptMsg: '',
			name: ''
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentWillMount() {
		this.props.getMaxScore();
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
		const { currScore, dialogOpen, promptOpen, promptMsg, name } = this.state;
		const { maxScore } = this.props;
		const buttonStyle = {
			margin: '50px'
		};
		const dialogStyle = {
			width: '25%'
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
							<div>
								<RaisedButton
									style={buttonStyle}
									label="Restart"
									primary={true}
									onClick={this.props.handleReset}
								/>
								<RaisedButton
									style={buttonStyle}
									label="Save Score"
									primary={true}
									onClick={() => this.setState({ dialogOpen: true })}
								/>
								<Dialog
									title="Your Name, please"
									contentStyle={dialogStyle}
									open={dialogOpen}
									actions={actions}
								>
									<TextField
										hintText="Name"
										value={name}
										onChange={e => this.setState({ name: e.target.value })}
									/>
								</Dialog>
								<SavePrompt open={promptOpen} msg={promptMsg} />
							</div>
						</MuiThemeProvider>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ maxScore }) {
	return { maxScore };
}

export default connect(mapStateToProps, { getMaxScore })(ActionInfo);
