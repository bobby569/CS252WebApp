import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Row from '../components/Row';

const DIM = 4;

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matrix: [[0, 4, 0, 2], [0, 0, 8, 0], [16, 0, 0, 0], [0, 0, 0, 0]],
			tempMatrix: null,
			gameOver: false
		};

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.onKeyPress, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeyPress, false);
	}

	getEmptyCell() {
		const { matrix } = this.state;
		const emptyList = [];
		for (let row = 0; row < DIM; row++) {
			for (let col = 0; col < DIM; col++) {
				if (matrix[row][col] === 0) {
					emptyList.push([row, col]);
				}
			}
		}
		return emptyList;
	}

	getRandomCoord(list) {
		return list[Math.floor(Math.random() * list.length)];
	}

	checkGameOver() {
		const { matrix, gameOver } = this.state;
		if (gameOver) {
			return true;
		}
		for (let row = 0; row < DIM - 1; row++) {
			for (let col = 0; col < DIM - 1; col++) {
				const val = matrix[row][col];
				if (val === 0 || val === matrix[row][col + 1] || val === matrix[row + 1][col]) {
					return false;
				}
			}
		}
		const val = matrix[3][3];
		if (val === 0 || val === matrix[2][3] || val === matrix[3][2]) {
			return false;
		}
		this.setState({ gameOver: true });
		return true;
	}

	rotateRight() {
		const { tempMatrix } = this.state;
		const newMatrix = [];
		for (let col = 0; col < DIM; col++) {
			const newRow = [];
			for (let row = DIM - 1; row > -1; row--) {
				newRow.push(tempMatrix[row][col]);
			}
			newMatrix.push(newRow);
		}
		this.setState({ tempMatrix: newMatrix });
		return;
	}

	rotateLeft() {
		const { tempMatrix } = this.state;
		const newMatrix = [];
		for (let col = DIM - 1; col >= 0; col--) {
			const newRow = [];
			for (let row = DIM - 1; row >= 0; row--) {
				newRow.unshift(tempMatrix[row][col]);
			}
			newMatrix.push(newRow);
		}
		this.setState({ tempMatrix: newMatrix });
		return;
	}

	mergeCell(arr) {
		const newArr = [];

		for (let col = DIM - 1; col > 0; col--) {
			const val = arr[col];
			if (val === arr[col - 1]) {
				arr[col] *= 2;
				arr[col - 1] = 0;
				this.score += val;
			}
		}

		for (let col = 0; col < DIM; col++) {
			const val = arr[col];
			if (val === 0) newArr.unshift(val);
			else newArr.push(val);
		}

		return newArr;
	}

	shiftRight() {
		const { tempMatrix } = this.state;
		const newMatrix = [];

		for (let row = 0; row < DIM; row++) {
			var newRow = [];
			for (let col = 0; col < DIM; col++) {
				const val = tempMatrix[row][col];
				val === 0 ? newRow.unshift(val) : newRow.push(val);
			}
			newMatrix.push(this.mergeCell(newRow));
		}
		this.setState({ tempMatrix: newMatrix });
		return;
	}

	moveLeft() {
		this.rotateRight();
		this.rotateRight();
		this.shiftRight();
		this.rotateLeft();
		this.rotateLeft();
		return;
	}

	moveUp() {
		this.rotateRight();
		this.shiftRight();
		this.rotateLeft();
		return;
	}

	moveRight() {
		this.shiftRight();
		return;
	}

	moveDown() {
		this.rotateLeft();
		this.shiftRight();
		this.rotateRight();
		return;
	}

	onKeyPress(e) {
		e.preventDefault();
		const { matrix } = this.state;
		const tempMatrix = matrix.map(arr => arr.slice());
		this.setState({ tempMatrix });

		switch (e.keyCode) {
			case 37:
				this.moveLeft();
				break;
			case 38:
				this.moveUp();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveDown();
				break;
		}
		this.setState({ matrix: tempMatrix });
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
