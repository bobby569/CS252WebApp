import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

export default class Congrat extends Component {
	render() {
		const { open } = this.props;
		const actions = [
			<FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={onOK} />
		];

		return (
			<div>
				<Dialog title="Congratulation!" actions={actions} open={open} />
			</div>
		);
	}
}
