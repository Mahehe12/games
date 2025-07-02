# 🕹️ Assembly: Endgame

Welcome to **Assembly: Endgame**, a fun twist on the classic **Hangman** game built using **React**!

In this game, you must guess the hidden word in less than 8 wrong attempts. For each wrong guess, one programming language is lost. Can you save them all before Assembly takes over?

🔗 **Live Demo:** [Play here](https://assembly-rules.netlify.app/)

---

## 🧠 How to Play

- A hidden word is chosen from a list of common terms.
- You must guess the word one letter at a time using the on-screen keyboard.
- If your guess is correct, the letter is revealed.
- If your guess is wrong, a programming language "dies" and disappears.
- You have **8 wrong attempts**. After that, it's game over.
- Guess the full word correctly to win and celebrate with confetti!

---

## ✨ Key Features

✅ **Interactive Keyboard** – Clickable A-Z keys for smooth guessing  
✅ **Dynamic Word Display** – Letters appear as you guess them  
✅ **Farewell System** – Each wrong guess bids goodbye to a language with a skull overlay  
✅ **Game Status Messages** – Friendly updates on win, loss, or incorrect guesses  
✅ **Confetti Celebration** – Win the game and get rewarded with a blast of confetti  
✅ **Responsive Design** – Works well on desktop and tablet sizes  
✅ **Accessible** – Screen-reader-friendly live updates for guesses

---

## 📁 Folder Structure

src/
│
├── components/ # Reusable UI components (Keyboard, Status, Header, etc.)
├── hooks/ # Custom hook for game logic (useGameLogic)
├── data/ # Language data and word list
├── utils.js # Utility functions like random word selection
├── App.jsx # Main component that stitches everything together
├── App.css # Stylesheet
└── main.jsx # Entry point


## 🧩 Credits

Created with ❤️ by Mahi 