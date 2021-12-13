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
const findPaths = (node: string, path: string[], searched: Set<string>) => {
	path.push(node)
	if (node == 'end') {
		paths.push(path)
	}

	Object.keys(nodes[node]).forEach((newNode) => {
		if (searched.has(newNode)) return
		if (isSmallCave(node)) {
			searched.add(node)
		}

		findPaths(newNode, path.slice(), new Set(searched))
	})
}

findPaths('start', [], new Set())

console.log(paths.length)
