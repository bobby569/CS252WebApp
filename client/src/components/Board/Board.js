import './styles/general.css';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import GameOverAlert from './GameOverAlert';
import Row from './Row';

const DIM = 4;

const hasMoved = function(mat1, mat2) {
	for (let i = 0; i < DIM; i++) {
		for (let j = 0; j < DIM; j++) {
			if (mat1[i][j] !== mat2[i][j]) {
				return true;
			}
		}
	}
	return false;
};

const getRandomFrom = function(arr) {
	return arr[~~(Math.random() * arr.length)];
};

export default class Board extends Component {
	constructor(props) {
		super(props);

		this.state = {
			matrix: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
			tempMatrix: null,
			gameOver: false
		};

		this.onKeyPress = this.onKeyPress.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	componentDidMount() {
		this.randomGenerate();
		document.addEventListener('keydown', this.onKeyPress, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeyPress, false);
	}

	getEmptyCells() {
		const { matrix } = this.state;
		const emptyCells = [];
		matrix.forEach((r, ridx) =>
			r.forEach((c, cidx) => {
				if (c === 0) emptyCells.push([ridx, cidx]);
			})
		);
		return emptyCells;
	}

	randomGenerate() {
		const { matrix } = this.state;
		const emptyCells = this.getEmptyCells();

		if (emptyCells.length === 0) return this.setState({ gameOver: true });

		const loc = getRandomFrom(emptyCells);
		matrix[loc[0]][loc[1]] = getRandomFrom([2, 4]);

		this.setState({ matrix });
	}

	isGameOver() {
		const { matrix, gameOver } = this.state;
		if (gameOver) return true;

		for (let row = 0; row < DIM - 1; row++) {
			for (let col = 0; col < DIM - 1; col++) {
				const val = matrix[row][col];
				if (val === 0 || val === matrix[row][col + 1] || val === matrix[row + 1][col]) {
					return false;
				}
			}
		}
		for (let i = 0; i < DIM - 1; i++) {
			if (matrix[i][3] === 0 || matrix[i][3] === matrix[i + 1][3]) return false;
			if (matrix[3][i] === 0 || matrix[3][i] === matrix[3][i + 1]) return false;
		}
		const val = matrix[3][3];
		if (val === 0 || val === matrix[2][3] || val === matrix[3][2]) return false;

		return true;
	}

	rotateRight() {
		const { tempMatrix } = this.state;
		const newMatrix = [];
		for (let col = 0; col < DIM; col++) {
			const newRow = [];
			for (let row = DIM - 1; row >= 0; row--) {
				newRow.push(tempMatrix[row][col]);
			}
			newMatrix.push(newRow);
		}
		this.setState({ tempMatrix: newMatrix });
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
	}

	mergeCell(arr) {
		let score = 0;
		for (let i = DIM - 1; i > 0; i--) {
			const val = arr[i];
			if (val === arr[i - 1]) {
				arr[i] *= 2;
				arr[i - 1] = 0;
				score += val;
			}
		}
		this.props.updateScore(score);
		const newArr = [];
		for (let i = 0; i < DIM; i++) {
			const val = arr[i];
			val === 0 ? newArr.unshift(val) : newArr.push(val);
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
	}

	moveLeft() {
		this.rotateRight();
		this.rotateRight();
		this.shiftRight();
		this.rotateLeft();
		this.rotateLeft();
	}

	moveUp() {
		this.rotateRight();
		this.shiftRight();
		this.rotateLeft();
	}

	moveRight() {
		this.shiftRight();
	}

	moveDown() {
		this.rotateLeft();
		this.shiftRight();
		this.rotateRight();
	}

	onKeyPress(e) {
		const { matrix, gameOver } = this.state;
		if (gameOver) return;

		this.setState({ tempMatrix: matrix.map(arr => arr.slice()) });

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
			default:
				return;
		}

		const { tempMatrix } = this.state;
		if (!hasMoved(matrix, tempMatrix)) return;

		this.setState({ matrix: tempMatrix });
		this.randomGenerate();
		this.setState({ gameOver: this.isGameOver() });
	}

	handleReset() {
		this.props.handleReset();
		const { matrix } = this.state;
		matrix.forEach((r, ridx) => r.forEach((c, cidx) => (matrix[ridx][cidx] = 0)));
		this.setState({ matrix, gameOver: false });
		this.randomGenerate();
	}

	render() {
		const { matrix, gameOver } = this.state;
		return (
			<div className="row">
				<div className="col s12 m10">
					<div tabIndex="0" onKeyDown={this.onKeyPress}>
						<table className="table table-bordered table-responsive">
							<tbody>{matrix.map((row, idx) => <Row row={row} key={idx} />)}</tbody>
						</table>
					</div>
				</div>

				<div className="col s12 m2">
					<MuiThemeProvider>
						<RaisedButton
							className="action-button"
							label="Restart"
							primary={true}
							onClick={this.handleReset}
						/>
					</MuiThemeProvider>
					{/* TODO: fix action call */}
					<MuiThemeProvider>
						<div>
							<RaisedButton
								className="action-button"
								onClick={() => console.log('Hello')}
							>
								UP
							</RaisedButton>
							<RaisedButton className="action-button">LEFT</RaisedButton>
							<RaisedButton className="action-button">DOWN</RaisedButton>
							<RaisedButton className="action-button">RIGHT</RaisedButton>
						</div>
					</MuiThemeProvider>
					<GameOverAlert
						open={gameOver}
						onYes={this.handleReset}
						onNo={() => this.setState({ gameOver: false })}
					/>
				</div>
			</div>
		);
	}
}
