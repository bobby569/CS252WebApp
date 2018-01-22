import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import GameOverAlert from './GameOverAlert';
import Graduation from './Graduation';
import Row from './Row';

import { DIM, hasMoved, isGraduate, getRandomFrom, mergeCell } from './util';

export default class Board extends Component {
	constructor(props) {
		super(props);

		this.state = {
			matrix: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
			tempMatrix: null,
			gameOver: false,
			graduate: false
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

	shiftRight() {
		const { tempMatrix } = this.state;
		let val,
			score = 0,
			newMatrix = [];

		for (let row = 0; row < DIM; row++) {
			let newRow = [];
			for (let col = 0; col < DIM; col++) {
				val = tempMatrix[row][col];
				val === 0 ? newRow.unshift(val) : newRow.push(val);
			}
			const [add, newArr] = mergeCell(newRow);
			score += add;
			newMatrix.push(newArr);
		}
		this.props.updateScore(score);
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
		if (isGraduate(matrix)) return this.setState({ graduate: true });
		this.randomGenerate();
		this.setState({ gameOver: this.isGameOver() });
	}

	handleReset() {
		this.props.handleReset();
		let { matrix } = this.state;
		matrix.forEach((r, ridx) => r.forEach((c, cidx) => (matrix[ridx][cidx] = 0)));
		this.setState({ matrix, gameOver: false, graduate: false });
		this.randomGenerate();
	}

	render() {
		const { matrix, gameOver, graduate } = this.state;
		return (
			<div className="row">
				<div className="col s12 m10 board">
					<div tabIndex="0" onKeyDown={this.onKeyPress}>
						<table className="table table-bordered table-responsive">
							<tbody>{matrix.map((row, idx) => <Row row={row} key={idx} />)}</tbody>
						</table>
					</div>
				</div>

				<div className="col s12 m2 board">
					<MuiThemeProvider>
						<RaisedButton
							className="button"
							label="Restart"
							primary={true}
							onClick={this.handleReset}
						/>
					</MuiThemeProvider>
				</div>

				<GameOverAlert
					open={gameOver}
					onYes={this.handleReset}
					onNo={() => this.setState({ gameOver: false })}
				/>

				<Graduation open={graduate} onOk={this.handleReset} />
			</div>
		);
	}
}
