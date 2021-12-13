import { useFile } from './help'

const inputs = useFile('12.txt').split('\r\n')

const nodes = inputs.reduce((nodes, node) => {
	const [a, b] = node.split('-')
	if (!nodes[a]) nodes[a] = {}
	if (!nodes[b]) nodes[b] = {}
	nodes[a][b] = true
	nodes[b][a] = true
	return nodes
}, {} as any)

const isSmallCave = (node: string) => {
	if (node === 'start') return true
	return node.toLowerCase() === node
}

const paths = []

const findPaths = (node: string, path: string[], searched: Set<string>, smallCaveVisitedTwice: boolean) => {
	path.push(node)

	if (node === 'end') {
		paths.push(path)
		return
	}

	Object.keys(nodes[node]).forEach((newNode) => {
		let newSmallCaveVisitedTwice = smallCaveVisitedTwice
		if (newNode === 'start') return
		if (searched.has(newNode)) {
			if (newSmallCaveVisitedTwice) return
			newSmallCaveVisitedTwice = true
		}
		if (isSmallCave(node)) {
			searched.add(node)
		}
		findPaths(newNode, path.slice(), new Set(searched), newSmallCaveVisitedTwice)
	})
}

findPaths('start', [], new Set(), false)

console.log(paths.length)
