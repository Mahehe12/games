import { useState } from "react";
import { chooseRandomWord } from "../utils";

export function useGameLogic(languages) {
    // state variables
    const [currentWord, setCurrentWord] = useState(() => chooseRandomWord())  // Word the player needs to guess
    const [guessedLetters, setGuessedLetters] = useState([]) // All letters guessed so far by the user

    //derived variables
    const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
    const isGameLost = (wrongGuessesCount >= (languages.length - 1));
    // WHATEVER MAY HAPPEN WE LOSE OR WIN GAME IS OVER
    const isGameOver = isGameWon || isGameLost;

    // Check last incorrect letter to bid farewell to the lost lang
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

    const numGuessesLeft = languages.length - 1; // for screen readers

    // Function to add a letter to guessedLetters only if it hasn't been guessed before
    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        )
    }

    function resetGame() {
        setGuessedLetters([]);
        setCurrentWord(chooseRandomWord());
    }

    return {
        currentWord,
        guessedLetters,
        addGuessedLetter,
        resetGame,
        wrongGuessesCount,
        isGameWon,
        isGameLost,
        isGameOver,
        lastGuessedLetter,
        isLastGuessIncorrect,
        numGuessesLeft
    };
}