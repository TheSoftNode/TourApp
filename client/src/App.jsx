import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './pages/Header'

function App()
{
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main>

      </main>
      <Footer />
    </>
  )
}

export default App
