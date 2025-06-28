import { useState, useEffect, useRef } from "react"
import Die from "./Components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState([])
  const [timer, setTimer] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const buttonRef = useRef(null)

  // When dice change, check if game is won
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSame = dice.every(die => die.value === dice[0].value)

    if (allHeld && allSame && dice.length > 0) {
      setGameWon(true)
      buttonRef.current?.focus()
    }
  }, [dice])

  // Timer logic
  useEffect(() => {
    let interval
    if (gameStarted && !gameWon) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameWon])

  // Countdown logic
  useEffect(() => {
    let countdownInterval
    if (countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (countdown === 0 && !gameStarted) {
      setDice(generateAllNewDice())
      setGameStarted(true)
    }

    return () => clearInterval(countdownInterval)
  }, [countdown, gameStarted])

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(generateDie)
  }

  function startCountdown() {
    setCountdown(3)
    setGameWon(false)
    setTimer(0)
  }

  function rollDice() {
    if (gameWon) {
      setGameStarted(false)
      startCountdown()
    } else {
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ? die : generateDie()
      ))
    }
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ))

  return (
    <main>
      {gameWon && <Confetti />}
      
      {/* Countdown screen */}
      {!gameStarted && countdown > 0 && (
        <div className="countdown-overlay">
          <h1>{countdown === 0 ? "Go!" : countdown}</h1>
        </div>
      )}

      {/* Initial Start Button */}
      {!gameStarted && countdown === 3 && (
        <>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Click Start to begin the countdown. Roll until all dice match. Hold dice between rolls.</p>
          <button className="roll-dice" onClick={startCountdown}>Start Game</button>
        </>
      )}

      {/* Actual Game */}
      {gameStarted && (
        <>
          <div aria-live="polite" className="sr-only">
            {gameWon && <p>Congratulations! You won! Press "New Game" to play again.</p>}
          </div>

          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <p className="timer">⏱️ Time: {timer} sec</p>
          <div className="dice-container">{diceElements}</div>

          <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
            {gameWon ? "New Game" : "Roll"}
          </button>
        </>
      )}
    </main>
  )
}
