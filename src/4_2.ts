import { useFile } from './help'

const inputs = useFile('4.txt').split('\r\n')

const [numbersString, ...boardsDirty] = inputs

const numbers = numbersString.split(',').map(Number)

let t = []
let boards = boardsDirty.filter(Boolean).reduce((a, rowString) => {
	const row = rowString.split(/\s+/).map(Number)
	if (t.push(row) === 5) {
		a.push(t)
		t = []
	}
	return a
}, [])

interface Board {
	index: number
	combos: Set<number>[]
}

const comboIsBingo = (bingoNums: Set<number>, combo: Set<number>) => {
	return Array.from(combo.values()).every((num) => bingoNums.has(num))
}

const getCombos = (board: number[][]) => {
	const size = 5
	const combos: Set<number>[] = []
	for (const row of board) {
		combos.push(new Set(row))
	}
	for (let i = 0; i < size; i++) {
		const combo = new Set<number>()
		for (let j = 0; j < size; j++) {
			combo.add(board[j][i])
		}
		combos.push(combo)
	}
	return combos
}

const combos = boards.map((board, i) => ({
	index: i,
	combos: getCombos(board),
})) as Board[]

let sliceIndex = 5
let boardIsSolved = false
while (!boardIsSolved) {
	const bingoNums = new Set(numbers.slice(0, sliceIndex))

	for (const board of combos) {
		if (board.combos.some((combo) => comboIsBingo(bingoNums, combo))) {
			if (combos.length > 1) {
				const i = combos.findIndex((combo) => combo.index === board.index)
				combos.splice(i, 1)
			} else {
				boardIsSolved = true
			}
		}
	}
	if (!boardIsSolved) {
		sliceIndex++
	}
}

const board = new Set(boards[combos[0].index].flat())
const bingoNums = numbers.slice(0, sliceIndex)

bingoNums.forEach((num) => board.delete(num))
const unmarkedTotal = Array.from(board.values()).reduce<number>((total, num: number) => total + num, 0)

const lastBingoNum = numbers[sliceIndex - 1]

console.log(lastBingoNum * unmarkedTotal)
