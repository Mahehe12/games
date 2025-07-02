import { clsx } from "clsx";

export default function KeyBoard({ guessedLetters, currentWord, onClick, isGameOver }) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    return (
        <section className="keyboard">
            {alphabet.split("").map(letter => (
                <button
                    className={clsx(
                        guessedLetters.includes(letter)
                            ? (currentWord.includes(letter) ? "right" : "wrong")
                            : ""
                    )}
                    disabled={isGameOver}
                    aria-disabled={guessedLetters.includes(letter)}
                    aria-label={`Letter ${letter}`}
                    onClick={() => onClick(letter)}
                    key={letter}
                >
                    {letter.toUpperCase()}
                </button>
            ))}
        </section>
    );
}
