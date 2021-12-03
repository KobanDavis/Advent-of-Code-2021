import { useFile } from './help'

const inputs = useFile('1.txt').split('\n').map(Number)

let last = null
let increments = 0
for (const input of inputs) {
	if (last && input > last) {
		increments++
	}
	last = input
}
console.log(increments)
