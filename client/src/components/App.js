import './App.css';
import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<Header />
				<Content />
			</div>
		);
	}
}
