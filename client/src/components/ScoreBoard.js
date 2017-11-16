import React from 'react';

export default props => {
	return (
		<div className="row">
			<div className="col s12 m6">
				<div className="card white darken-1">
					<div className="card-content black-text">
						<span className="card-title">Highest Score</span>
						<p>{props.maxScore}</p>
					</div>
				</div>
			</div>
			<div className="col s12 m6">
				<div className="card white darken-1">
					<div className="card-content black-text">
						<span className="card-title">Current Score</span>
						<p>{props.currScore}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
