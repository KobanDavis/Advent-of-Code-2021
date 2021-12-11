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
	return stack
}

const pointsMap = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4,
}

const stacks = []
for (const input of inputs) {
	try {
		const stack = checkInput(input)
		stacks.push(stack)
	} catch {}
}

const scores = stacks.map((stack) => stack.reverse().reduce((total, char) => total * 5 + pointsMap[char], 0)).sort((a, b) => (a < b ? 1 : -1))

console.log(scores[(scores.length - 1) / 2])
