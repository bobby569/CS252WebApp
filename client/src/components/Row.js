import React, { Component } from 'react';
import Cell from './Cell';

export default class Row extends Component {
	render() {
		const { row } = this.props;
		return <tr>{row.map((num, idx) => <Cell num={num} key={idx} />)}</tr>;
	}
}
