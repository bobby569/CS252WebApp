import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Login, Logged } from '../components/NavButton';

class Header extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<AppBar
					title="2048 - Purdue CS Version"
					iconElementRight={this.props.auth ? <Logged /> : <Login />}
				/>
			</MuiThemeProvider>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
