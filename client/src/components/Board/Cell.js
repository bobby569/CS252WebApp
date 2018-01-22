import React, { Component } from 'react';
import classnames from 'classnames';

const mapping = {
	2: 180,
	4: 182,
	8: 240,
	16: 250,
	32: 251,
	64: 252,
	128: 348,
	256: 373,
	512: 381,
	1024: 471,
	2048: 473,
	4096: 580
};

export default class Cell extends Component {
	render() {
		const { num } = this.props;
		const color = `color-${num}`;
		const numberStyle = {
			color: '#fdffea',
			fontSize: '2.5rem'
		};
		return (
			<td className={classnames({ [color]: !!num })}>
				<div style={numberStyle}>{mapping[num] || '000'}</div>
			</td>
		);
	}
}
