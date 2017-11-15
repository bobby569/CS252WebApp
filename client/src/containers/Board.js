import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Board extends Component {
	render() {
		return <div className="class-name">content</div>;
	}
}

// function mapStateToProps({reducer}) {
//   return{reducer}
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({reducer},dispatch)
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Board)
