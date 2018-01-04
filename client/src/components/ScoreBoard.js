import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
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

const styles = {
	col1: {
		paddingLeft: '80px'
	},
	col2: {
		margin: '5px'
	},
	col3: {
		paddingLeft: '42px'
	}
};

export default class ScoreBoard extends Component {
	renderRank() {
		const { ranks } = this.props;
		if (!ranks) return;
		return ranks.map((rank, idx) => {
			return (
				<TableRow key={rank._id}>
					<TableRowColumn style={styles.col1}>{idx + 1}</TableRowColumn>
					<TableRowColumn>
						<Avatar src={rank.photo} size={25} style={styles.col2} />
						{rank.name}
					</TableRowColumn>
					<TableRowColumn style={styles.col3}>{rank.score}</TableRowColumn>
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
				<Dialog title="Score Board - Top 3" actions={actions} open={open}>
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
