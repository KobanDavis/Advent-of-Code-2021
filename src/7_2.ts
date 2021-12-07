// brute force always wins :)
import { useFile } from './help'

const inputs = useFile('7.txt').trim().split(',').map(Number)

const minInput = inputs.reduce((min, value) => (value < min ? value : min), Infinity)
const maxInput = inputs.reduce((max, value) => (value > max ? value : max), 0)

let num = minInput
let fuel = Infinity

const getFuelConsumption = (targetH: number) => {
	const getFuelForCrab = (h: number, tH: number) => {
		const dist = Math.abs(tH - h)
		let total = 0
		for (let i = 0; i < dist; i++) {
			total += i + 1
		}
		return total
	}
	return inputs.reduce((consumption, h) => consumption + getFuelForCrab(h, targetH), 0)
}

for (let i = minInput; i < maxInput; i++) {
	const consumption = getFuelConsumption(i)
	if (consumption < fuel) {
		fuel = consumption
		num = i
	}
}

console.log(fuel)
