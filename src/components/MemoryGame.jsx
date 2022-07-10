import { useState } from 'react'
import { shuffle } from '../utils.js'
import initial_flags from '../assets/flags'

// The amount of flags to start with, - 1
const start = 3

export default function MemoryGame ({ score, updateScore, goal, handleGameOver }) {
	const [ memory, setMemory ] = useState([])
	const [ flags ] = useState(shuffle(initial_flags))

	const displayed_flags = shuffle(flags.slice(0, start + !score + score))

	function consumeTurn (flag_name) {
		// Game lost
		if (memory.includes(flag_name)) {
			handleGameOver(false)
		}
		// Game won
		else if (memory.length + 1 == flags.length) {
			handleGameOver(true)
		}
		// Game continues
		else {
			setMemory([...memory, flag_name])
			updateScore()
		}
	}

	return (
		<main>
			{ displayed_flags.map(flag =>
				<button key={ flag.url } className='flag' onClick={ () => consumeTurn(flag.name) }>
					<figure>
						<img src={ flag.url } />
						<figcaption>
							{ flag.name.replace(/[a-z](?=[A-Z])/g, x => `${x} `) }
						</figcaption>
					</figure>
				</button>
			)}
		</main>
	)
}
