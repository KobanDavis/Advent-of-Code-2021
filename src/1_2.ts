import * as fs from 'fs'
import * as path from 'path'

const inputFile = fs.readFileSync(path.join(process.cwd(), './src/inputs/1.txt'))
const inputs = inputFile.toString().split('\n').map(Number)
const triplets = []

for (let i = 0; i < inputs.length - 2; i++) {
	triplets.push(inputs[i] + inputs[i + 1] + inputs[i + 2])
}

let last = null
let increments = 0
for (const triplet of triplets) {
	if (last && triplet > last) {
		increments++
	}
	last = triplet
}
console.log(increments)
