import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../containers/Header';
import Content from '../containers/Content';
import { fetchUser } from '../actions';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<Header />
				<Content />
			</div>
		);
	}
}

export default connect(null, { fetchUser })(App);
