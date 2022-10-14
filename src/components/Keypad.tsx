import React from 'react'
import { KEYBOARD_LETTERS } from '../utils'
import { Keys } from '../types'
import { MdOutlineBackspace } from 'react-icons/md'
import { AiOutlineEnter } from 'react-icons/ai'

interface Props {
  usedKeys: Keys,
  handleOnChange: ({ key }: { key: any }) => void
}

const Keypad: React.FC<Props> = ({ usedKeys, handleOnChange }) => {

  const getKey = (letter: string) => {
    if (letter === 'Backspace') {
      return <MdOutlineBackspace/>
    } else if (letter === 'Enter') {
      return <AiOutlineEnter/>
    }
    return letter
  }

  const getClassName = (letter: string, color: string) =>
    (letter === 'Backspace' || letter === 'Enter')
      ? 'large'
      : color
  
  return (
    <div className='keypad'>
      {KEYBOARD_LETTERS.map((letter) => {
        const color = usedKeys[letter.key as keyof Keys]
        return (
          <button
            key={letter.key}
            className={getClassName(letter.key, color)}
            onClick={() => handleOnChange({ key: letter.key })}
          >
            {getKey(letter.key)}
          </button>
        )
      })}
    </div>
  )
}

export default Keypad