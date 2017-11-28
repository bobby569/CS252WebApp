import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Row from '../components/Row';

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matrix: [[0, 4, 0, 2], [0, 0, 8, 0], [16, 0, 0, 0], [0, 0, 0, 0]]
		};

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.onKeyPress, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeyPress, false);
	}

	onKeyPress(e) {
		e.preventDefault();
		console.log(e.keyCode);
	}

	render() {
		const { matrix } = this.state;

		return (
			<div tabIndex="0" onKeyDown={this.onKeyPress}>
				<table className="table table-bordered table-responsive">
					<tbody>{matrix.map((row, idx) => <Row row={row} key={idx} />)}</tbody>
				</table>
			</div>
		);
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
