import { useFile } from './help'

const inputs = useFile('8.txt')
	.split('\r\n')
	.flatMap((row) => row.split(' | ')[1].split(' '))

// [1,4,7,8]
const lengths = new Set([2, 4, 3, 7])
const occurrences = inputs.reduce((total, input) => (lengths.has(input.length) ? total + 1 : total), 0)
console.log(inputs, occurrences)
