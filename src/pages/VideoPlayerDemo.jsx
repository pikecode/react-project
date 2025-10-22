import React, { useState } from 'react'
import { PhoneVideoPlayer } from '../components/MobileVideoPlayer/PhoneVideoPlayer'
import './VideoPlayerDemo.css'

/**
 * VideoPlayer Demo Page
 *
 * Demonstrates the PhoneVideoPlayer component - a complete mobile video player
 * that combines PhoneFrame and VideoPlayer for a realistic iPhone mockup.
 */
export function VideoPlayerDemo() {
  const [playbackState, setPlaybackState] = useState({
    playing: false,
  })

  const handlePlay = () => {
    console.log('Video started playing')
    setPlaybackState((prev) => ({ ...prev, playing: true }))
  }

  const handlePause = () => {
    console.log('Video paused')
    setPlaybackState((prev) => ({ ...prev, playing: false }))
  }

  const handleEnded = () => {
    console.log('Video ended')
    setPlaybackState((prev) => ({ ...prev, playing: false }))
  }

  return (
    <div className="video-player-demo-page">
      {/* Header */}
      <header className="demo-header">
        <h1>PhoneVideoPlayer Component</h1>
        <p>Mobile video player with realistic iPhone frame mockup</p>
      </header>

      {/* Main Demo */}
      <div className="demo-container">
        <section className="demo-section">
          <h2>Interactive Demo</h2>
          <div className="demo-phone-frame-wrapper">
            <PhoneVideoPlayer
              src="/music.mp4"
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
            />
          </div>
          <div className="demo-code">
            <pre>{`<PhoneVideoPlayer
  src="/music.mp4"
  onPlay={handlePlay}
  onPause={handlePause}
  onEnded={handleEnded}
/>`}</pre>
          </div>
        </section>

        {/* Features Section */}
        <section className="demo-section features">
          <h2>Features</h2>
          <ul className="features-list">
            <li>✅ Realistic iPhone 14 frame design</li>
            <li>✅ Notch (Dynamic Island) support</li>
            <li>✅ Home indicator for authentic feel</li>
            <li>✅ Custom progress bar with smooth seeking</li>
            <li>✅ Time display (current/duration)</li>
            <li>✅ Subtitle/overlay text support</li>
            <li>✅ Play/pause button with visual feedback</li>
            <li>✅ Touch-friendly controls</li>
            <li>✅ Responsive design for all screens</li>
            <li>✅ Keyboard controls (spacebar)</li>
            <li>✅ Accessibility features (ARIA labels)</li>
            <li>✅ No external dependencies (pure React)</li>
          </ul>
        </section>

        {/* Props Documentation */}
        <section className="demo-section documentation">
          <h2>Component Props</h2>
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="prop-name">src</td>
                <td>string</td>
                <td>required</td>
                <td>Video source URL</td>
              </tr>
              <tr>
                <td className="prop-name">subtitle</td>
                <td>string</td>
                <td>undefined</td>
                <td>Overlay subtitle text</td>
              </tr>
              <tr>
                <td className="prop-name">title</td>
                <td>string</td>
                <td>undefined</td>
                <td>Video title displayed below player</td>
              </tr>
              <tr>
                <td className="prop-name">poster</td>
                <td>string</td>
                <td>undefined</td>
                <td>Poster image URL</td>
              </tr>
              <tr>
                <td className="prop-name">onPlay</td>
                <td>function</td>
                <td>undefined</td>
                <td>Callback when video plays</td>
              </tr>
              <tr>
                <td className="prop-name">onPause</td>
                <td>function</td>
                <td>undefined</td>
                <td>Callback when video pauses</td>
              </tr>
              <tr>
                <td className="prop-name">onEnded</td>
                <td>function</td>
                <td>undefined</td>
                <td>Callback when video ends</td>
              </tr>
              <tr>
                <td className="prop-name">autoplay</td>
                <td>boolean</td>
                <td>false</td>
                <td>Auto play on mount</td>
              </tr>
              <tr>
                <td className="prop-name">showControls</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show play/pause button</td>
              </tr>
              <tr>
                <td className="prop-name">loop</td>
                <td>boolean</td>
                <td>false</td>
                <td>Loop video playback</td>
              </tr>
              <tr>
                <td className="prop-name">variant</td>
                <td>string</td>
                <td>'iphone14'</td>
                <td>Phone model type</td>
              </tr>
              <tr>
                <td className="prop-name">className</td>
                <td>string</td>
                <td>''</td>
                <td>Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Usage Examples */}
        <section className="demo-section usage">
          <h2>Usage Examples</h2>

          <div className="example-item">
            <h3>Basic Usage</h3>
            <div className="demo-code">
              <pre>{`import { PhoneVideoPlayer } from '@/components/MobileVideoPlayer'

export function App() {
  return (
    <PhoneVideoPlayer src="/video.mp4" />
  )
}`}</pre>
            </div>
          </div>

          <div className="example-item">
            <h3>With Subtitle and Callbacks</h3>
            <div className="demo-code">
              <pre>{`<PhoneVideoPlayer
  src="/video.mp4"
  subtitle="Video subtitle text"
  onPlay={() => console.log('Playing')}
  onPause={() => console.log('Paused')}
  onEnded={() => console.log('Ended')}
/>`}</pre>
            </div>
          </div>

          <div className="example-item">
            <h3>With All Options</h3>
            <div className="demo-code">
              <pre>{`<PhoneVideoPlayer
  src="/video.mp4"
  poster="/poster.jpg"
  subtitle="Overlay text"
  title="Video Title"
  autoplay={false}
  showControls={true}
  loop={false}
  variant="iphone14"
  onPlay={handlePlay}
  onPause={handlePause}
  onEnded={handleEnded}
/>`}</pre>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="demo-footer">
        <p>
          Located at <code>src/components/MobileVideoPlayer/PhoneVideoPlayer.jsx</code>
        </p>
      </footer>
    </div>
  )
}

export default VideoPlayerDemo
