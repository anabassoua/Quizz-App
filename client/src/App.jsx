import { useState } from 'react'
import Quizz from './Quizz'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <Quizz />
  )
}

export default App
