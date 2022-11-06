import React from 'react'
import Title from './Title'

interface Props {
  isCorrect: boolean,
  solution: string
}

const EndGameContent: React.FC<Props> = ({ isCorrect, solution }) => {
  const title = isCorrect ? `You won!` : 'You lost!'
  const solutionClassName = isCorrect ? `won` : 'lost'
  return (
    <div className='modal'>
      <div>
        <Title title={title} />
        <p className={solutionClassName}>{solution}</p>
        <p className='try-again'>Try again tomorrow.</p>
      </div>
    </div>
  )
}

export default EndGameContent