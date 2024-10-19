import { useState } from 'react'
import pawpalLogo from './assets/pawpal.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={pawpalLogo} className="logo" alt="PawPal Logo" style={{ width: '300px', height: '300px' }} />
      <h1>PawPal</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          ❤️ is {count}
        </button>
      </div>
    </>
  )
}

export default App
