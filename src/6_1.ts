import { useFile } from './help'

const inputs = useFile('6.txt').trim().split(',').map(Number)

for (let i = 0; i < 80; i++) {
	let toAdd = 0
	for (let n = 0; n < inputs.length; n++) {
		if (--inputs[n] === -1) {
			toAdd++
			inputs[n] = 6
		}
	}
	for (let n = 0; n < toAdd; n++) {
		inputs.push(8)
	}
}

console.log(inputs.length)
