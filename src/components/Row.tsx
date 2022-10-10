import React from 'react'
import { Word } from '../types'

interface Props {
  guess: Word[],
  isCurrent?: boolean
}

const Row: React.FC<Props> = ({ guess, isCurrent }) => {

  if (guess) {
    return (
      <div className={`row ${isCurrent ? 'current' : 'past'}`}>
        {guess.map((letter, i) => (
          <div key={i} className={letter.color}>{letter.key}</div>
        ))}
        {[...Array(5 - guess.length)].map((_, i) => <div key={i}></div>)}
      </div>
    )
  }

  return (
    <div className='row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Row