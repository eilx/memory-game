import { useState } from 'react'
import { shuffle } from '../utils.js'
import initial_flags from "../assets/flags"

const start = 3 // The amount of flags to start with, - 1

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
				<a key={ flag } onClick={ () => consumeTurn(flag) }>
					<img src={ flag } />
				</a>
			)}
		</main>
	)
}
