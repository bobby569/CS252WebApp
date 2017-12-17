import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const dialogStyle = {
	width: '50%',
	maxWidth: 'none'
};

export default class GameOverAlert extends React.Component {
	render() {
		const { open, onYes, onNo } = this.props;
		const actions = [
			<FlatButton label="Sure! Be the best!" primary={true} onClick={onYes} />,
			<FlatButton label="No! Need to work!" primary={true} onClick={onNo} />
		];

		return (
			<MuiThemeProvider>
				<Dialog
					title="Game Over!"
					actions={actions}
					contentStyle={dialogStyle}
					open={open}
				>
					Game over! You can definitely do better. Want a new game?
				</Dialog>
			</MuiThemeProvider>
		);
	}
}
