import { useFile } from './help'

const inputs = useFile('6.txt').trim().split(',').map(Number)

const school = new Array(9).fill(0)

inputs.forEach((input) => school[input]++)

for (let i = 0; i < 256; i++) {
	let toAdd = 0
	for (let n = 0; n < school.length; n++) {
		if (n === 0) {
			toAdd = school[n]
			school[n] = 0
		} else {
			school[n - 1] += school[n]
			school[n] = 0

			if (n === 6 || n === 8) {
				school[n] += toAdd
			}
		}
	}
}

const totalFish = school.reduce((total, value) => total + value)
console.log(totalFish)
