import { useFile } from './help'

const inputs = useFile('7.txt').trim().split(',').map(Number)

const sortedInputs = inputs.sort((a, b) => (a > b ? 1 : -1))

// this is bad, but it works
const medianIndex = inputs.length / 2 - 1
const medianH = sortedInputs[medianIndex]

const consumption = inputs.reduce((consumption, h) => consumption + Math.abs(h - medianH), 0)

console.log(consumption)
