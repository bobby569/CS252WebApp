import React, { Component } from 'react';
import Header from './Header';
import ScoreBoard from './ScoreBoard';

const Landing = () => <h2>Landing</h2>;

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<Header />
				<ScoreBoard />
				<Landing />
			</div>
		);
	}
}
