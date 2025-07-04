export default function Die({ value, isHeld, hold }) {
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }
    return (
        <button
            onClick={hold}
            style={styles}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value}, 
            ${isHeld ? "held" : "not held"}`}
        >
            {value}
        </button>
    )
}