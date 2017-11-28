import './App.css';
import React, { Component } from 'react';
import Header from './Header';
import ActionInfo from '../containers/ActionInfo';
import Board from '../containers/Board';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<Header />
				<ActionInfo />
				<Board />
			</div>
		);
	}
}
