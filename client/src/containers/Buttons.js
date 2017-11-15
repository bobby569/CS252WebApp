import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Buttons extends Component {
	render() {
		const buttonStyle = {
			margin: '50px'
		};
		return (
			<div>
				<MuiThemeProvider>
					<RaisedButton style={buttonStyle} label="Restart" primary={true} />
				</MuiThemeProvider>
				<MuiThemeProvider>
					<RaisedButton style={buttonStyle} label="Save Score" primary={true} />
				</MuiThemeProvider>
			</div>
		);
	}
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({reducer},dispatch)
// }
//
// export default connect(null, mapDispatchToProps)(Buttons)
