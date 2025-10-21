import { useState } from 'react'
import { MediaPlayerTest } from './pages/MediaPlayerTest'
import { VideoPlayerDemo } from './pages/VideoPlayerDemo'
import { PhoneVideoPlayerShowcase } from './pages/PhoneVideoPlayerShowcase'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('phone-showcase')

  return (
    <div className="app">
      <nav className="app-nav">
        <button
          className={`nav-btn ${currentPage === 'phone-showcase' ? 'active' : ''}`}
          onClick={() => setCurrentPage('phone-showcase')}
        >
          Phone Showcase
        </button>
        <button
          className={`nav-btn ${currentPage === 'video-player' ? 'active' : ''}`}
          onClick={() => setCurrentPage('video-player')}
        >
          VideoPlayer Component
        </button>
        <button
          className={`nav-btn ${currentPage === 'media-test' ? 'active' : ''}`}
          onClick={() => setCurrentPage('media-test')}
        >
          Media Player Test
        </button>
      </nav>

      <main className="app-main">
        {currentPage === 'phone-showcase' && <PhoneVideoPlayerShowcase />}
        {currentPage === 'video-player' && <VideoPlayerDemo />}
        {currentPage === 'media-test' && <MediaPlayerTest />}
      </main>
    </div>
  )
}

export default App
