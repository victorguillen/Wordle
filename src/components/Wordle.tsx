import React, { useState, useEffect } from 'react'
import useGameLogic from '../hooks/useGameLogic'
import Board from './Board'
import Keypad from './Keypad'
<<<<<<< Updated upstream
import Modal from './Modals/Modal'
import Toolbar from './Toolbar'
import EndGameContent from './Modals/EndGameContent'
=======
import Modal from './Modal'
import Title from './Title'
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      <Toolbar/>
=======
      <Title title="Wordle" />
>>>>>>> Stashed changes
      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleOnChange={handleOnChange} />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <EndGameContent isCorrect={isCorrect} solution={solution} />
      </Modal>
    </>
  )
}

export default Wordle