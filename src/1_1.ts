import * as fs from 'fs'
import * as path from 'path'

const inputFile = fs.readFileSync(path.join(process.cwd(), './src/inputs/1.txt'))
const inputs = inputFile.toString().split('\n').map(Number)

let last = null
let increments = 0
for (const input of inputs) {
	if (last && input > last) {
		increments++
	}
	last = input
}
console.log(increments)
