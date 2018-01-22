export const DIM = 4;

export const hasMoved = function(mat1, mat2) {
	for (let i = 0; i < DIM; i++) {
		for (let j = 0; j < DIM; j++) {
			if (mat1[i][j] !== mat2[i][j]) {
				return true;
			}
		}
	}
	return false;
};

export const getRandomFrom = function(arr) {
	return arr[~~(Math.random() * arr.length)];
};

export const mergeCell = function(arr) {
	let val,
		score = 0,
		newArr = [];
	for (let i = DIM - 1; i > 0; i--) {
		val = arr[i];
		if (val === arr[i - 1]) {
			arr[i] *= 2;
			arr[i - 1] = 0;
			score += val;
		}
	}
	for (let i = 0; i < DIM; i++) {
		val = arr[i];
		val === 0 ? newArr.unshift(val) : newArr.push(val);
	}
	return [score, newArr];
};
