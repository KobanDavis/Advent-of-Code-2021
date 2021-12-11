import { useFile } from './help'

const inputs = useFile('9.txt')
	.split('\r\n')
	.map((row) => row.split('').map(Number))

const searched = {}

Array(inputs.length)
	.fill(0)
	.forEach((_, i) => (searched[i] = {}))

const lowPoints = []

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
				lowPoints.push(currentPoint)
				neighbourPoints.forEach((point) => {
					const { x, y } = point
					searched[y][x] = true
				})
			}
		}
	}
}

const total = lowPoints.reduce((total, value) => total + value, 0) + lowPoints.length
console.log(total)
