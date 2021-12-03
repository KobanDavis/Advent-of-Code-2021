import { useFile } from './help'

const inputs = useFile('3.txt').split('\r\n')

const length = inputs[0].length

const occurrences = []

for (let i = 0; i < length; i++) {
	occurrences[i] = [0, 0]
}

for (let i = 0; i < length; i++) {
	for (const input of inputs) {
		const bit = Number(input.charAt(i)) as 0 | 1
		occurrences[i][bit]++
	}
}

const gammaBinary = occurrences.map(([zero, one]) => Number(one > zero)).join('')
const epsilonBinary = occurrences.map(([zero, one]) => Number(one < zero)).join('')

const gammaDecimal = parseInt(gammaBinary, 2)
const epsilonDecimal = parseInt(epsilonBinary, 2)

console.log(gammaDecimal * epsilonDecimal)
