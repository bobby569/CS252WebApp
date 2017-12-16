import React from 'react';

export default props => {
	return (
		<div className="col s12 m4">
			<div className="card white darken-1">
				<div className="card-content black-text">
					<span className="card-title">{props.name}</span>
					<p>{props.score}</p>
				</div>
			</div>
		</div>
	);
};
