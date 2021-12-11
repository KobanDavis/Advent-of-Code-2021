import { useFile } from './help'

const inputs = useFile('11.txt')
	.split('\r\n')
	.map((row) => row.split('').map(Number))

const getNeighbourPoints = (x: number, y: number) => {
	const neighbours = [] as { x: number; y: number }[]
	if (x > 0) {
		neighbours.push({ x: x - 1, y })
		if (y > 0) neighbours.push({ x: x - 1, y: y - 1 })
		if (y < 9) neighbours.push({ x: x - 1, y: y + 1 })
	}
	if (x < 9) {
		neighbours.push({ x: x + 1, y })
		if (y > 0) neighbours.push({ x: x + 1, y: y - 1 })
		if (y < 9) neighbours.push({ x: x + 1, y: y + 1 })
	}
	if (y > 0) neighbours.push({ x, y: y - 1 })
	if (y < 9) neighbours.push({ x, y: y + 1 })

	return neighbours
}

const step = () => {
	inputs.forEach((_, y) => inputs[y].forEach((_, x) => inputs[y][x]++))
	const flashed = new Set()
	for (let y = 0; y < 10; y++) {
		for (let x = 0; x < 10; x++) {
			const point = inputs[y][x]
			if (point > 9) {
				const checkNeighbours = (x: number, y: number) => {
					if (flashed.has(`${x}/${y}`)) return

					flashed.add(`${x}/${y}`)

					const neighbours = getNeighbourPoints(x, y)
					neighbours.forEach(({ x, y }) => inputs[y][x]++)
					const filtered = neighbours.filter(({ x, y }) => inputs[y][x] > 9 && !flashed.has(`${x}/${y}`))
					filtered.forEach(({ x, y }) => {
						checkNeighbours(x, y)
					})
				}
				checkNeighbours(x, y)
			}
		}
	}

	inputs.forEach((_, y) =>
		inputs[y].forEach((_, x) => {
			if (inputs[y][x] > 9) inputs[y][x] = 0
		})
	)

	return flashed.size
}

let totalFlashed = 0
for (let i = 0; i < 100; i++) {
	const flashed = step()
	totalFlashed += flashed
}

console.log(totalFlashed)
