import React, { Component } from 'react';
import Header from './Header';
import ActionInfo from './ActionInfo';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<Header />
				<ActionInfo />
				<h2>Loading</h2>
			</div>
		);
	}
}
