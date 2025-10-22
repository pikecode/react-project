import { useState } from 'react'
import { PhoneVideoPlayerPackDemo } from './pages/PhoneVideoPlayerPackDemo'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('phone-pack-demo')

  return (
    <div className="app">
      <nav className="app-nav">
        <button className={`nav-btn active`} onClick={() => setCurrentPage('phone-pack-demo')}>
          Phone Pack Demo
        </button>
      </nav>

      <main className="app-main">
        {currentPage === 'phone-pack-demo' && <PhoneVideoPlayerPackDemo />}
      </main>
    </div>
  )
}

export default App
