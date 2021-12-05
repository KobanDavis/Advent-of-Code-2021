import { useFile } from './help'

const inputs = useFile('5.txt').split('\r\n')

const coords = inputs.map((input) => input.split(' -> ').flatMap((coords) => coords.split(',').map(Number)))

let maxX = 0
let maxY = 0

for (let i = 0; i < coords.length; i++) {
	for (let j = 0; j < coords[i].length; j++) {
		const coord = coords[i][j]
		if (coord % 2 === 0 && coord > maxX) {
			maxX = coord
		} else if (coord > maxY) {
			maxY = coord
		}
	}
}

const matrix = new Array(maxY + 1).fill(0).map((_) => new Array(maxX + 1).fill(0))

const addLineX = (x1: number, x2, y: number) => {
	const diffIsNegative = x1 < x2

	for (let x = x1; x !== (diffIsNegative ? x2 + 1 : x2 - 1); diffIsNegative ? x++ : x--) {
		matrix[y][x]++
	}
}

const addLineY = (y1: number, y2, x: number) => {
	const diffIsNegative = y1 < y2

	for (let y = y1; y !== (diffIsNegative ? y2 + 1 : y2 - 1); diffIsNegative ? y++ : y--) {
		matrix[y][x]++
	}
}

for (const coord of coords) {
	const [x1, y1, x2, y2] = coord
	if (x1 === x2) {
		addLineY(y1, y2, x1)
	} else if (y1 === y2) {
		addLineX(x1, x2, y1)
	}
}

console.log(matrix.flatMap((row) => row.filter((num) => num >= 2)).length)
