// Creates the 'flags.js' file, automatically importing any pngs in this folder

import fs from 'fs'
import path from 'path'

// Path to the flag loader
const loader_path = '../flags.js'

// Deletes content of file and opens it for appending
fs.truncateSync(loader_path, 0)
const stream = fs.createWriteStream(loader_path, { flags: 'a' })

// Collect all flags
const files = await fs.promises.readdir('./')
files.shift()

const imports = []
files
.forEach(file => {
	const name = path.parse(file).name
		.replace(/-([a-z0-9])/g, match => match[1].toUpperCase())

	stream.write(`import ${name} from "./flags/${file}"\n`)
	imports.push(name)
})

stream.write(`
export default [${imports}]
`)

stream.end()
