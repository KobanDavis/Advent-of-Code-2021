import { useFile } from './help'

// const inputs = [2199943210, 3987894921, 9856789892, 8767896789, 9899965678].map((n) => n.toString().split('').map(Number))
const inputs = useFile('9.txt')
	.split('\r\n')
	.map((row) => row.split('').map(Number))

const searched = {}

Array(inputs.length)
	.fill(0)
	.forEach((_, i) => (searched[i] = {}))

const lowPoints = [] as { x: number; y: number }[]

const getNeighbourPoints = (x: number, y: number) => {
	const neighbours = [] as { x: number; y: number }[]
	if (x > 0) neighbours.push({ y, x: x - 1 })
	if (x < inputs[0].length - 1) neighbours.push({ y, x: x + 1 })
	if (y > 0) neighbours.push({ y: y - 1, x })
	if (y < inputs.length - 1) neighbours.push({ y: y + 1, x })
	return neighbours
}

for (let y = 0; y < inputs.length; y++) {
	const row = inputs[y]
	for (let x = 0; x < row.length; x++) {
		if (!searched[y][x]) {
			const currentPoint = row[x]
			const neighbourPoints = getNeighbourPoints(x, y)
			const isLowPoint = neighbourPoints.every((point) => {
				const { x, y } = point
				const value = inputs[y][x]
				return currentPoint < value
			})
			if (isLowPoint) {
				lowPoints.push({ x, y })
				neighbourPoints.forEach((point) => {
					const { x, y } = point
					searched[y][x] = true
				})
			}
		}
	}
}

const basins: number[] = Array(lowPoints.length).fill(0)

const searchedNeighbours = new Set()
const checkNeighbours = (x: number, y: number, i: number) => {
	if (searchedNeighbours.has(`${x}/${y}`)) return
	console.log(inputs[y][x])
	basins[i]++
	searchedNeighbours.add(`${x}/${y}`)
	const neighbours = getNeighbourPoints(x, y)
	const filtered = neighbours.filter(({ x, y }) => inputs[y][x] < 9 && !searchedNeighbours.has(`${x}/${y}`))
	filtered.forEach(({ x, y }) => {
		checkNeighbours(x, y, i)
	})
}

for (let i = 0; i < lowPoints.length; i++) {
	const { x, y } = lowPoints[i]

	checkNeighbours(x, y, i)
}

const answer = basins
	.sort((a, b) => (a < b ? 1 : -1))
	.slice(0, 3)
	.reduce((total, value) => total * value, 1)

console.log(lowPoints, basins, answer)
