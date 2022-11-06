import React, { useState, useEffect } from 'react'
import './App.css'
import Wordle from './components/Wordle'
import { styled } from '@mui/system';

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
    <Layout>
      <Wordle solution={solution} />
    </Layout>
  )
}

export default App