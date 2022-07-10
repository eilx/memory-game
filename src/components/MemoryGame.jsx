import { useState } from 'react'
import { shuffle } from '../utils.js'
import initial_flags from '../assets/flags'
import { useEffect } from 'react'

// The amount of flags to start with, - 1
const start = 3

// TODO: Refactor this into the actual flags
const flagName = flag => flag
	.split(/[./]/g)
	.at(-2)
	.replace(/-/g, ' ')
	.replace('flag', '')

export default function MemoryGame ({ score, updateScore, goal, handleGameOver }) {
	const [ memory, setMemory ] = useState([])
	const [ flags ] = useState(shuffle(initial_flags))

	const displayed_flags = shuffle(flags.slice(0, start + !score + score))

	function consumeTurn (flag) {
		// Game lost
		if (memory.includes(flag)) {
			handleGameOver(false)
		}
		// Game won
		else if (memory.length + 1 == flags.length) {
			handleGameOver(true)
		}
		// Game continues
		else {
			setMemory([...memory, flag])
			updateScore()
		}
	}

	return (
		<main>
			{ displayed_flags.map(flag =>
				<button key={ flag } className='flag' onClick={ () => consumeTurn(flag) }>
					<figure>
						<img src={ flag } />
						<figcaption>{ flagName(flag) }</figcaption>
					</figure>
				</button>
			)}
		</main>
	)
}
