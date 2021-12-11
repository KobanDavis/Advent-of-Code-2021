import { useFile } from './help'

const inputs = useFile('10.txt').split('\r\n')

const map = {
	'<': '>',
	'{': '}',
	'(': ')',
	'[': ']',
}

const checkInput = (line: string) => {
	const stack: string[] = []
	for (const char of line) {
		const expected = stack.length ? stack[stack.length - 1] : null
		if (map[char] !== undefined) {
			stack.push(map[char])
		} else {
			if (char === expected) {
				stack.pop()
			} else {
				throw [expected, char]
			}
		}
	}
}

const pointsMap = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
}

let points = 0

for (const input of inputs) {
	try {
		checkInput(input)
	} catch ([expected, char]) {
		points += pointsMap[char]
	}
}

console.log(points)
