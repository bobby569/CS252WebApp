import '../styles/color.css';
import React, { Component } from 'react';
import classnames from 'classnames';

export default class Cell extends Component {
	render() {
		const numberStyle = {
			color: '#fff',
			fontSize: '2rem'
		};
		const cellStyle = {
			width: '6vw',
			height: '6vw',
			display: 'flex',
			borderRadius: '5px',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#303030',
			boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.18), 0 1px 5px 0 rgba(0, 0, 0, 0.15)'
		};
		const { num } = this.props;
		const color = `color-${num}`;
		return (
			<td>
				<div className={classnames([cellStyle, { [color]: !!num }])}>
					{/* change to 'num || null' */}
					<div className={numberStyle}>{num}</div>
				</div>
			</td>
		);
	}
}
