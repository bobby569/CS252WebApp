import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

export class Login extends Component {
	static muiName = 'FlatButton';

	render() {
		return <FlatButton {...this.props} label="Login" />;
	}
}

export class Logged extends Component {
	static muiName = 'IconMenu';

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
				<MenuItem primaryText="Scoreboard" />
				<MenuItem primaryText="Logout" />
			</IconMenu>
		);
	}
}
