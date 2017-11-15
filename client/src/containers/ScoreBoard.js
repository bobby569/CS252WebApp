import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class ScoreBoard extends Component {
	render() {
		return (
			<div className="row">
				<div className="col s12 m6">
					<div className="card white darken-1">
						<div className="card-content black-text">
							<span className="card-title">Highest Score</span>
							<p>200</p>
						</div>
					</div>
				</div>
				<div className="col s12 m6">
					<div className="card white darken-1">
						<div className="card-content black-text">
							<span className="card-title">Current Score</span>
							<p>10</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// function mapStateToProps({ reducer }) {
// 	return { reducer };
// }
//
// export default connect(mapStateToProps)(ScoreBoard);
