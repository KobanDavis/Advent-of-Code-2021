import { useFile } from './help'

let inputRows = useFile('8.txt').split('\r\n')

let inputs = inputRows.map((row) =>
	row
		.split(' | ')[0]
		.split(' ')
		.map((number) => number.split(''))
)
let outputs = inputRows.map((row) =>
	row
		.split(' | ')[1]
		.split(' ')
		.map((number) => number.split(''))
)

// len 2 -> 1
// len 3 -> 7
// len 4 -> 4
// len 5 -> 2, 3, 5
// len 6 -> 6, 9, 0
// len 7 -> 8

const solveSignals = (input: string[][]) => {
	const numberMap = new Map<number, string[]>()
	const sorted = input.sort((a, b) => (a.length > b.length ? 1 : -1))

	const len5 = sorted.slice(3, 6)
	const len6 = sorted.slice(6, 9)

	numberMap.set(1, sorted[0])
	numberMap.set(7, sorted[1])
	numberMap.set(4, sorted[2])
	numberMap.set(8, sorted[9])
	numberMap.set(
		3,
		len5.splice(
			len5.findIndex((input) => numberMap.get(1).every((v) => input.includes(v))),
			1
		)[0]
	)
	numberMap.set(
		5,
		len5.splice(
			len5.findIndex((input) => {
				const one = numberMap.get(1)
				const four = numberMap.get(4).slice()
				one.forEach((segment) =>
					four.splice(
						four.findIndex((v) => segment === v),
						1
					)
				)
				return four.every((v) => input.includes(v))
			}),
			1
		)[0]
	)
	numberMap.set(2, len5[0])
	numberMap.set(
		9,
		len6.splice(
			len6.findIndex((input) => [...numberMap.get(5), ...numberMap.get(1)].every((v) => input.includes(v))),
			1
		)[0]
	)
	numberMap.set(
		6,
		len6.splice(
			len6.findIndex((input) => numberMap.get(5).every((v) => input.includes(v))),
			1
		)[0]
	)
	numberMap.set(0, len6[0])
	return numberMap
}

let total = 0
for (let i = 0; i < inputs.length; i++) {
	const input = inputs[i]
	const output = outputs[i]

	const numberMap = solveSignals(input)
	const stringMap: Record<string, number> = {}
	for (const [number, segmentArr] of numberMap.entries()) {
		stringMap[segmentArr.sort().join('')] = number
	}

	const value = output
		.map((o) => o.sort().join(''))
		.reduce((total, string) => {
			// console.log(string, stringMap)
			return total + stringMap[string].toString()
		}, '')

	total += Number(value)
}

console.log(total)
