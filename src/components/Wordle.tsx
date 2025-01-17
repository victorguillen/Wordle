import React, { useState, useEffect } from 'react'
import useGameLogic from '../hooks/useGameLogic'
import Board from './Board'
import Keypad from './Keypad'
import Modal from './Modals/Modal'
import Toolbar from './Toolbar'
import EndGameContent from './Modals/EndGameContent'

interface Props {
  solution: string,
  handleReset: () => void
}

const Wordle: React.FC<Props> = ({ solution, handleReset }) => {
  const [showModal, setShowModal] = useState(false)
  const [isHardMode, setIsHardMode] = useState(false)
  const { turn, currentGuess, guesses, usedKeys, isCorrect, handleOnChange } = useGameLogic(solution, isHardMode)

  useEffect(() => {
    window.addEventListener('keyup', handleOnChange)

    if ((isCorrect || turn > 5) && solution) {
      setTimeout(() => {
        setShowModal(true)
      }, 1000)
      window.removeEventListener('keyup', handleOnChange)
    }

    return () => window.removeEventListener('keyup', handleOnChange)
  }, [handleOnChange, isCorrect, turn, solution])

  const handleEndGame = () => {
    setShowModal(false)
    handleReset()
  }

  return (
    <>
      <Toolbar handleMode={() => setIsHardMode(!isHardMode)}/>
      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleOnChange={handleOnChange} />
      <Modal open={showModal} onClose={handleEndGame}>
        <EndGameContent isCorrect={isCorrect} solution={solution} />
      </Modal>
    </>
  )
}

export default Wordle