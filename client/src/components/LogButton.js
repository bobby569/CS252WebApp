import React, { Component } from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ScoreBoard from './ScoreBoard';

export class Login extends Component {
	static muiName = 'FlatButton';

	render() {
		return <FlatButton {...this.props} label="Login" href="/auth/google" />;
	}
}

export class Logged extends Component {
	static muiName = 'IconMenu';

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			ranks: null
		};

		this.getScoreBoard = this.getScoreBoard.bind(this);
		this.closeScoreBoard = this.closeScoreBoard.bind(this);
	}

	componentDidMount() {
		axios
			.get('/api/getMaxScore')
			.then(res => this.setState({ ranks: res.data }))
			.catch(err => console.error(err));
	}

	getScoreBoard() {
		this.setState({ open: true });
	}

	closeScoreBoard() {
		this.setState({ open: false });
	}

	render() {
		const style = { horizontal: 'right', vertical: 'top' };
		const { open, ranks } = this.state;
		return (
			<div>
				<IconMenu
					{...this.props}
					iconButtonElement={
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					}
					targetOrigin={style}
					anchorOrigin={style}
				>
					<MenuItem primaryText="Leaderboard" onClick={this.getScoreBoard} />
					<MenuItem primaryText="Logout" href="/api/logout" />
				</IconMenu>
				<ScoreBoard open={open} ranks={ranks} onOK={this.closeScoreBoard} />
			</div>
		);
	}
}
