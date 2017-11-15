import React from 'react';
import Buttons from '../containers/Buttons';
import ScoreBoard from '../containers/ScoreBoard';

export default () => {
	return (
		<div className="row">
			<div className="col s12 m6">
				<ScoreBoard />
			</div>
			<div className="col s12 m6">
				<Buttons />
			</div>
		</div>
	);
};
