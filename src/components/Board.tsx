import React from 'react'
import Row from './Row'
import { Word } from '../types'

interface Props {
  guesses: Word[][],
  currentGuess: string,
  turn: number
}

const Board: React.FC<Props> = ({ guesses, currentGuess, turn }) => {
  const formatCurrentGuess = currentGuess.split("").map((letter) => ({ key: letter, color: 'filled' }))
  
  return (
    <div className='board'>
      <div>
        {guesses.map((guess, i) => {
          if (turn === i) {
            return <Row key={i} guess={formatCurrentGuess} isCurrent/>
          }
          return <Row key={i} guess={guess}/>
        })}
      </div>
    </div>
  )
}

export default Board