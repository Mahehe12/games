export default function Status({ className, isGameWon, isGameLost, farewellText }) {
    // If the game is not over but the last guess was wrong, show farewell placeholder
    if (className.includes("farewell")) {
        return (
            <section className={className}>
                {farewellText}
            </section>
        );
    }

    // If the game is over, show final status
    const heading = isGameWon ? "You Win!" : isGameLost ? "Game Over!" : "";
    const subHeading = isGameWon
        ? "Well done! 🎉"
        : isGameLost
            ? "You lose! Better start learning Assembly 😭"
            : "";

    return (
        <section
            aria-live="polite"
            role="status"
            className={className}>
            <h2>{heading}</h2>
            <p>{subHeading}</p>
        </section>
    );
}
