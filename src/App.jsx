import { useState } from 'react'
import Converter from './Converter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Converter />
    </>
  )
}

export default App
