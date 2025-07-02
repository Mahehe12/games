import { clsx } from "clsx";

export default function WordDisplay({ currentWord, guessedLetters, isGameLost }) {
    // reavel letter only if it's correct or user has lost the game
    return currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )

        return (
            <span className={letterClassName} key={index}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        );
    });
}