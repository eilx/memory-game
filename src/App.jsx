import { useState, useRef } from 'react'
import MemoryGame from './components/MemoryGame'
import './App.css'

const colors = {
	default: 'slategray',
	win: 'green',
	lose: 'red',
}

export default function App() {
	const [ score, setScore ] = useState(0)
	const [ high_score, setHighScore ] = useState(localStorage.getItem('high_score'))
	// Resets the MemoryGame state upon change
	const [ memory_key, setMemoryKey ] = useState(false)
	const headerRef = useRef(null)

	function handleGameOver (won) {
		// Update highscore
		const new_highest = Math.max(high_score, score)
		setHighScore(new_highest)
		localStorage.setItem('high_score', new_highest)

		// Inform player
		const header = headerRef.current
		header.style.color = won ? colors.win : colors.lose
		header.addEventListener('transitionend', () => {
			header.style.color = colors.default
		}, { once: true })

		// Reset
		setScore(0)
		setMemoryKey(!memory_key)
	}

	return <>
		<header ref={ headerRef }>
			<h1>Memory Game</h1>

			<h2>Current Score: { score }</h2>

			<h2>High Score: { high_score | 0 }</h2>
		</header>

		<MemoryGame
			key={ memory_key }
			score={ score }
			updateScore={ () => setScore(score + 1) }
			handleGameOver={ handleGameOver }
		/>

		<footer>
			<a href='https://icons8.com'>Icons by <span>Icons8</span></a>
		</footer>
	</>
}
