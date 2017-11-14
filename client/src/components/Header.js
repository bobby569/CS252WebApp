import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a className="center brand-logo">2048, Purdue CS Version</a>
				</div>
			</nav>
		);
	}
}

export default Header;
