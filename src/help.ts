import * as fs from 'fs'
import * as path from 'path'

export const useFile = (input: string) => {
	const inputFile = fs.readFileSync(path.join(process.cwd(), `./src/inputs/${input}`))
	return inputFile.toString()
}
