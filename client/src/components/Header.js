import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Login, Logged } from './NavButton';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			logged: false
		};
	}

	render() {
		return (
			<MuiThemeProvider>
				<AppBar
					title="2048 - Purdue CS Version"
					iconElementRight={this.state.logged ? <Logged /> : <Login />}
				/>
			</MuiThemeProvider>
		);
	}
}

export default Header;
