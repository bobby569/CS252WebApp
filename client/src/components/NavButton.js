import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

export class Login extends Component {
	static muiName = 'FlatButton';

	render() {
		return <FlatButton {...this.props} label="Login" href="/auth/google" />;
	}
}

export class Logged extends Component {
	static muiName = 'IconMenu';

	getScoreBoard(e) {
		console.log('Getting Board!');
	}

	render() {
		const style = { horizontal: 'right', vertical: 'top' };
		return (
			<IconMenu
				{...this.props}
				iconButtonElement={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				targetOrigin={style}
				anchorOrigin={style}
			>
				<MenuItem primaryText="Scoreboard" onClick={this.getScoreBoard} />
				<MenuItem primaryText="Logout" href="/api/logout" />
			</IconMenu>
		);
	}
}
