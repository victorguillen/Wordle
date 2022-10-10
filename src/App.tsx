import React, { useState, useEffect } from 'react'
import './App.css'
import Wordle from './components/Wordle'

const App = () => {
  const [solution, setSolution] = useState(() => {
    const saved = localStorage.getItem('solution')
    return saved || ''
  })

  useEffect(() => {
    localStorage.setItem('solution', solution)

    const saved = localStorage.getItem('date')
    const savedDate = saved ? JSON.parse(saved) : null
    const currentDate = new Date()
    
    if (savedDate !== currentDate.getUTCDay()) {
      window.localStorage.clear()

      fetch('https://thatwordleapi.azurewebsites.net/get/')
        .then((res) => res.json())
        .then((word) => {
          setSolution((prev: string) => {
            if (prev) {
              return prev
            } else {
              const newDate = new Date()
              const date = JSON.stringify(newDate.getUTCDay())
              localStorage.setItem('date', date);
              localStorage.setItem('solution', word.Response)
              return word.Response
            }
          })
        })
    } 
  }, [setSolution, solution])

  return (
    <div className="App">
      <Wordle solution={solution} />
    </div>
  )
}

export default App