import { useFile } from './help'

const file = useFile('13.txt').split('\r\n\r\n')

const getInput = (): [{ x: number; y: number }[], Record<string, number>[]] => {
	const points = file
	const folds = points
		.pop()
		.split('\r\n')
		.map((fold) => {
			const [axis, i] = fold.split('fold along ')[1].split('=')
			return { [axis]: Number(i) }
		})

	return [
		points
			.join('')
			.split('\r\n')
			.map((pair) => {
				const [x, y] = pair.split(',').map(Number)
				return { x, y }
			}) as any,
		folds,
	]
}

const [points, folds] = getInput()

const maxX = points.reduce((max, { x }) => (x > max ? x : max), 0)
const maxY = points.reduce((max, { y }) => (y > max ? y : max), 0)

const matrix = new Array(maxY + 1).fill(0).map((_) => new Array(maxX + 1).fill(0))

for (const { x, y } of points) {
	matrix[y][x] = 1
}

const foldY = (matrix: number[][], i: number) => {
	const top = matrix.slice(0, i).map((row) => row.slice())
	const bottom = matrix.slice(i + 1).map((row) => row.slice())

	for (let y = 0; y < i; y++) {
		const topRow = top[y]
		const bottomRow = bottom[i - 1 - y]
		bottomRow.forEach((n, x) => {
			if (n === 1 && topRow[x] === 0) {
				topRow[x] = 1
			}
		})
	}
	return top
}

const foldX = (matrix: number[][], i: number) => {
	const left = matrix.map((row) => row.slice(0, i))
	const right = matrix.map((row) => row.slice(i + 1))
	const overlap = Math.min(left[0].length, right[0].length)

	right.forEach((rightRow, y) => {
		const leftRow = left[y]
		for (let x = 0; x < overlap; x++) {
			if (rightRow[x] && leftRow[overlap - 1 - x] === 0) {
				leftRow[overlap - 1 - x] = 1
			}
		}
	})
	return left
}

let foldedMatrix = matrix
while (folds.length) {
	const [axis, index] = Object.entries(folds.shift())[0]
	foldedMatrix = (axis === 'y' ? foldY : foldX)(foldedMatrix, index)
}

console.log()
console.log(
	foldedMatrix
		.map((r) => r.join(''))
		.join('\n')
		.replaceAll('0', ' ')
		.replaceAll('1', '█')
)
