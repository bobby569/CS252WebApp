import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';

export default class ScoreBoard extends Component {
	renderRank() {
		const { ranks } = this.props;
		if (!ranks) {
			return;
		}
		return ranks.map((rank, idx) => {
			return (
				<TableRow key={rank._id}>
					<TableRowColumn>{idx + 1}</TableRowColumn>
					<TableRowColumn>{rank.name}</TableRowColumn>
					<TableRowColumn>{rank.score}</TableRowColumn>
				</TableRow>
			);
		});
	}

	render() {
		const { open, onOK } = this.props;
		const actions = [
			<FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={onOK} />
		];

		return (
			<div>
				<Dialog title="Score Board (Top 3)" actions={actions} open={open}>
					<Table>
						<TableHeader displaySelectAll={false}>
							<TableRow>
								<TableHeaderColumn>Rank</TableHeaderColumn>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Score</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>{this.renderRank()}</TableBody>
					</Table>
				</Dialog>
			</div>
		);
	}
}
