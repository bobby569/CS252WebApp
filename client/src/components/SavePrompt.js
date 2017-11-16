import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default props => {
	return (
		<div>
			<Snackbar open={props.open} message={props.msg} autoHideDuration={1000} />
		</div>
	);
};
