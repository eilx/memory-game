import { useState } from 'react'
import MemoryGame from './components/MemoryGame'
import './App.css'

export default function App() {
	const [ score, setScore ] = useState(0)
	const [ high_score, setHighScore ] = useState(localStorage.getItem('high_score'))
	// Resets the MemoryGame state upon change
	const [ memory_key, setMemoryKey ] = useState(false)

	function handleGameOver (won) {
		// Update highscore
		const new_highest = Math.max(high_score, score)
		setHighScore(new_highest)
		localStorage.setItem('high_score', new_highest)

		// Inform player
		if (won) { /* TODO: Graphical win state */ console.log('Win') }
		else { /* TODO: Graphical lose state */ console.log('Lose') }

		// Reset
		setScore(0)
		setMemoryKey(!memory_key)
	}

	return <>
		<header>
			<h1>Memory Game</h1>

			<div>
				<h2>High Score: { high_score }</h2>
				<h3>Current Score: { score }</h3>
			</div>
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
