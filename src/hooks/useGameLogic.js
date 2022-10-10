import { useState, useEffect } from "react";

const useGameLogic = (solution) => {
  const [currentGuess, setCurrentGuess] = useState('')

  const [turn, setTurn] = useState(() => {
    const saved = localStorage.getItem('turn');
    const initialValue = JSON.parse(saved);
    return initialValue || 0
  })

  const [guesses, setGuesses] = useState(() => {
    const saved = localStorage.getItem('guesses');
    const initialValue = JSON.parse(saved);
    return initialValue || [...Array(6)]
  })

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    const initialValue = JSON.parse(saved);
    return initialValue || []
  })

  const [isCorrect, setIsCorrect] = useState(() => {
    const saved = localStorage.getItem('isCorrect');
    const initialValue = JSON.parse(saved);
    return initialValue || false
  })

  const [usedKeys, setUsedKeys] = useState(() => {
    const saved = localStorage.getItem('usedKeys');
    const initialValue = JSON.parse(saved);
    return initialValue || {}
  })

  useEffect(() => {
    localStorage.setItem('turn', JSON.stringify(turn));
    localStorage.setItem('guesses', JSON.stringify(guesses));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('isCorrect', JSON.stringify(isCorrect));
    localStorage.setItem('usedKeys', JSON.stringify(usedKeys));
  }, [turn, guesses, history, isCorrect, usedKeys]);

  const checkForWin = () => {
    if (solution === currentGuess) {
      setIsCorrect(true)
    }
  }

  const updateKeyboard = (tempGuesses) => {
    setUsedKeys((previousKeys) => {
      let newKeys = { ...previousKeys }

      tempGuesses.forEach((letter) => {
        const currentColor = newKeys[letter.key]
        if (letter.color === 'green') {
          newKeys[letter.key] = 'green'
          return
        } else if (letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow'
          return
        } else if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[letter.key] = 'grey'
          return
        }
      })

      return newKeys
    })
  }

  const addWord = () => {
    let coloredLetters = []
    let tempGuesses = [...guesses]
    let newWord = [...currentGuess].map((letter, i) => {
      let word = { key: letter }
      if (solution[i] === letter) {
        word['color'] = 'green'
        coloredLetters.push(letter)
      } else {
        word['color'] = 'grey'
      }
      return word
    })

    newWord.forEach((word) => {
      if(!coloredLetters.includes(word.key) && solution.includes(word.key)) {
        word.color = 'yellow'
        coloredLetters.push(word.key)
      }
    })

    tempGuesses[turn] = newWord

    updateKeyboard(newWord)
    setGuesses(tempGuesses)
    setHistory([...history, currentGuess])
    setCurrentGuess('')
    setTurn(turn + 1)
    checkForWin()
  }

  const shakeRow = () => {
    const currentRow = document.getElementsByClassName('row')[turn]
    currentRow.classList.add('shake-row')
    setTimeout(() => {
      currentRow.classList.remove('shake-row')
    }, 500)
  }

  const handleOnChange = ({ key }) => {
    switch (true) {
      case key === 'Enter' && !isCorrect:
        if (turn > 5 || history.includes(currentGuess) || currentGuess.length !== 5) {
          shakeRow()
          break;
        }
        addWord()
        break;
      case key === 'Backspace':
        setCurrentGuess(currentGuess.slice(0, -1))
        break;
    
      case /^[A-Za-z]$/.test(key) && currentGuess.length < 5 && !isCorrect:
        setCurrentGuess(currentGuess + key)
        break;
    
      default:
        break;
    }
  }

  return { turn, currentGuess, guesses, usedKeys, isCorrect, handleOnChange }
}

export default useGameLogic