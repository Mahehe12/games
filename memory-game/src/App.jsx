import { useState, useEffect } from 'react'
import Form from './Components/Form'
import MemoryCard from './Components/MemoryCard'
import AssistiveTechInfo from './Components/AssistiveTechInfo'
import GameOver from './Components/GameOver'
import ErrorCard from './Components/ErrorCard'

export default function App() {
  const initialFormData = {
    category: "animals-and-nature",
    number: 10
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
    }
  }, [selectedCards])

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true)
    }
  }, [matchedCards])

  async function startGame(e) {
    e.preventDefault()

    try {
      const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)

      if (!response.ok) {
        throw new Error("Could not fetch data from API")
      }

      const data = await response.json()
      const dataSlice = await getDataSlice(data)
      const emojisArray = await getEmojisArray(dataSlice)

      setEmojisData(emojisArray)
      setIsGameOn(true)
      setIsFirstRender(false)
    } catch (err) {
      console.error(err);
      setIsError(true);
      setIsFirstRender(false)
    } finally {
      setIsFirstRender(false)
    }
  }

  async function getDataSlice(data) {
    const randomIndices = getRandomIndices(data)

    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index])
      return array
    }, [])

    return dataSlice
  }

  function getRandomIndices(data) {
    const randomIndicesArray = []

    for (let i = 0; i < formData.number / 2; i++) {
      const randomNum = Math.floor(Math.random() * data.length)
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum)
      } else {
        i--
      }
    }

    return randomIndicesArray
  }

  async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data]

    // Start from the last element and swap 
    // one by one. We don't need to run for 
    // the first element that's why i > 0 

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {

      // Pick a random index from 0 to i inclusive

      const j = Math.floor(Math.random() * (i + 1))

      // Swap arr[i] with the element 
      // at random index 

      const temp = pairedEmojisArray[i]
      pairedEmojisArray[i] = pairedEmojisArray[j]
      pairedEmojisArray[j] = temp
    }

    return pairedEmojisArray
  }

  function turnCard(name, index) {

    if (selectedCards.length < 2) {
      setSelectedCards(prevSelectedCards => [...prevSelectedCards, { name, index }])
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }])
    }
  }

  function resetGame() {
    // Back to initial
    setIsGameOn(false)
    setSelectedCards([])
    setMatchedCards([])
    setAreAllCardsMatched(false)
  }

  function resetError() {
    setIsError(false);
  }

  function handleFormChange(e) {
    setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && !isError && <Form handleSubmit={startGame} handleChange={handleFormChange} isFirstRender={isFirstRender} />}
      {isGameOn && !areAllCardsMatched &&
        <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} />}
      {areAllCardsMatched && <GameOver handleClick={resetGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} selectedCards={selectedCards} matchedCards={matchedCards} />}
      {isError && <ErrorCard handleClick={resetError} />}
    </main>
  )
}