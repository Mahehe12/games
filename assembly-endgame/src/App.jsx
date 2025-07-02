import Header from "./components/Header";
import Status from "./components/Status";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/KeyBoard";
import LanguageChips from "./components/LanguageChips";

import { useGameLogic } from "./hooks/useGameLogic";
import { getFarewellText } from "./utils";
import { languages } from './data/languages.js'
import Confetti from "react-confetti";
import { clsx } from "clsx";

export default function App() {
  // importing state, derived variables from out custom hook useGameLogic 
  const {
    currentWord, guessedLetters, addGuessedLetter, resetGame,
    wrongGuessesCount, isGameWon, isGameLost, isGameOver,
    lastGuessedLetter, isLastGuessIncorrect, numGuessesLeft
  } = useGameLogic(languages);

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  const farewellText =
    wrongGuessesCount > 0
      ? getFarewellText(languages[wrongGuessesCount - 1].name)
      : "";

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}

      <Header />

      <Status
        className={gameStatusClass}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        farewellText={farewellText}
      />

      <section className="language-chips">
        <LanguageChips languages={languages} wrongGuessesCount={wrongGuessesCount} />
      </section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ?
            `Correct! The letter ${lastGuessedLetter} is in the word.` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter =>
          guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")}</p>
      </section>

      <section className="word">
        <WordDisplay
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          isGameLost={isGameLost}
        />
      </section>

      <Keyboard
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        onClick={addGuessedLetter}
        isGameOver={isGameOver}
      />

      {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}
    </main>

  )
}
