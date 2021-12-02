import * as fs from 'fs'
import * as path from 'path'

const inputTransformer = (input: string): [string, number] => {
	const [direction, valueString] = input.split(' ')
	const value = Number(valueString)
	switch (direction) {
		case 'forward':
			return ['z', value]
		case 'down':
			return ['y', value]
		case 'up':
			return ['y', -value]
	}
}

const inputFile = fs.readFileSync(path.join(process.cwd(), './src/inputs/2.txt'))
const inputs = inputFile.toString().split('\n').map(inputTransformer)

const position = { y: 0, z: 0 }

inputs.forEach(([direction, value]) => (position[direction] += value))

console.log(position.y * position.z)
