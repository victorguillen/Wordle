import React, { useState, useEffect } from 'react'
import './App.css'
import Wordle from './components/Wordle'
import { styled } from '@mui/system';
import CONFIG from './config.js'

const Layout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100vh'
})

const App = () => {
  const [solution, setSolution] = useState(() => {
    const saved = localStorage.getItem('solution')
    return saved || ''
  })

  useEffect(() => {
    localStorage.setItem('solution', solution)

    // const saved = localStorage.getItem('date')
    // const savedDate = saved ? JSON.parse(saved) : null
    // const currentDate = new Date()
    // if (savedDate !== currentDate.getUTCDay()) {
      if (!solution) {
      window.localStorage.clear()
      
      fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5', 
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": CONFIG.apiKey,
          }
        }
      )
      .then((res) => res.json())
      .then((res) => {
        setSolution((prev: string) => {
          if (prev) {
              return prev
            } else {
              // const newDate = new Date()
              // const date = JSON.stringify(newDate.getUTCDay())
              // localStorage.setItem('date', date);
              localStorage.setItem('solution', res.word)
              return res.word
            }
          })
        })
    } 
  }, [setSolution, solution])

  const handleReset = () => setSolution('')

  return (
    <Layout>
      <Wordle solution={solution} handleReset={handleReset} />
    </Layout>
  )
}

export default App