import { useFile } from './help'

const inputs = useFile('3.txt').split('\r\n')

const getOccurances = (inputs: string[], i: number): [number, number] => {
	const occurances: [number, number] = [0, 0]
	for (const input of inputs) {
		const bit = Number(input.charAt(i))
		occurances[bit]++
	}
	return occurances
}

const getByCriteria = (criteria: 'most' | 'least') => {
	let position = 0
	let filtered = inputs
	while (filtered.length > 1) {
		const [zero, one] = getOccurances(filtered, position)
		filtered = filtered.filter((input) => {
			const inputBit = Number(input.charAt(position))
			let criteriaBit: number
			if (criteria === 'most') {
				criteriaBit = Number(one >= zero)
			} else {
				criteriaBit = Number(!(zero <= one))
			}
			return inputBit === criteriaBit
		})
		position++
	}
	return filtered[0]
}

const o2 = parseInt(getByCriteria('most'), 2)
const co2 = parseInt(getByCriteria('least'), 2)

console.log(o2 * co2)
