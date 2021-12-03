import { useFile } from './help'

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
const inputs = useFile('2.txt').split('\n').map(inputTransformer)

const position = { y: 0, z: 0 }

inputs.forEach(([direction, value]) => (position[direction] += value))

console.log(position.y * position.z)
