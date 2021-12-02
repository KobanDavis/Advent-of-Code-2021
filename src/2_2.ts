import * as fs from 'fs'
import * as path from 'path'

const inputFile = fs.readFileSync(path.join(process.cwd(), './src/inputs/2.txt'))
const inputs = inputFile.toString().split('\n')

let aim = 0
const position = { y: 0, z: 0 }
for (const input of inputs) {
	const [direction, valueString] = input.split(' ')
	const value = Number(valueString)
	switch (direction) {
		case 'forward':
			position.z += value
			position.y += value * aim
			break
		case 'down':
			aim += value
			break
		case 'up':
			aim -= value
			break
	}
}

console.log(position.y * position.z)
