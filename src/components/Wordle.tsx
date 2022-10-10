import React, { useState, useEffect } from 'react'
import useGameLogic from '../hooks/useGameLogic'
import Board from './Board'
import Keypad from './Keypad'
import Modal from './Modal'

interface Props {
  solution: string
}

const Wordle: React.FC<Props> = ({ solution }) => {
  const [showModal, setShowModal] = useState(false)
  const { turn, currentGuess, guesses, usedKeys, isCorrect, handleOnChange } = useGameLogic(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleOnChange)

    if (isCorrect || turn > 5) {
      setTimeout(() => {
        setShowModal(true)
      }, 1000)
      window.removeEventListener('keyup', handleOnChange)
    }

    return () => window.removeEventListener('keyup', handleOnChange)
  }, [handleOnChange, isCorrect, turn])

  return (
    <>
      <h1>Wordle</h1>
      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleOnChange={handleOnChange} />
      {showModal && <Modal isCorrect={isCorrect} solution={solution} />}
    </>
  )
}

export default Wordle
