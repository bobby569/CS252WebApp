import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { dialogStyle } from './util';

export default class Graduation extends Component {
	render() {
		const { open, onOK } = this.props;
		const actions = [<FlatButton label="Cheer!" primary={true} onClick={onOK} />];

		return (
			<MuiThemeProvider>
				<Dialog
					title="Congratulation!"
					actions={actions}
					contentStyle={dialogStyle}
					open={open}
				>
					Congratulation! You have successfully passed the challenge of college and earn
					the degree of Bachelor of Science in Computer Science!
				</Dialog>
			</MuiThemeProvider>
		);
	}
}
