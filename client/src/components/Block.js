import React, { Component } from 'react';

export default class Block extends Component {
	render() {
		return <div>{this.props.value}</div>;
	}
}
