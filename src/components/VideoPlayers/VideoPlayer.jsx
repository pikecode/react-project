import React, { useRef, useState, useEffect } from 'react'
import './VideoPlayer.css'

/**
 * Reusable VideoPlayer Component
 *
 * A clean, encapsulated video player component with:
 * - Custom play/pause controls
 * - Interactive progress bar with time scrubbing
 * - Time display (current/duration)
 * - Subtitle/overlay text support
 * - Mobile-responsive design
 * - Keyboard controls (spacebar to play/pause)
 *
 * @param {Object} props
 * @param {string} props.src - Video source URL (required)
 * @param {string} props.poster - Poster image URL
 * @param {string} props.subtitle - Subtitle or overlay text
 * @param {string} props.title - Video title (optional)
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onPlay - Callback when video plays
 * @param {function} props.onPause - Callback when video pauses
 * @param {function} props.onEnded - Callback when video ends
 * @param {boolean} props.autoplay - Auto play on mount
 * @param {boolean} props.showControls - Show play/pause button (default: true)
 * @param {boolean} props.loop - Loop the video
 *
 * @example
 * <VideoPlayer
 *   src="/music.mp4"
 *   poster="/poster.jpg"
 *   subtitle="Her ex-husband should see this scene"
 *   title="Scene Description"
 * />
 */
export function VideoPlayer({
  src,
  poster,
  subtitle,
  className = '',
  onPlay,
  onPause,
  onEnded,
  autoplay = false,
  showControls = true,
  loop = false,
}) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Format time to MM:SS or HH:MM:SS
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  // Play/Pause handler
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        onPause?.()
      } else {
        videoRef.current.play()
        onPlay?.()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current && !isSeeking) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  // Metadata loaded handler
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Progress bar change handler
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // Seeking start handler
  const handleProgressMouseDown = () => {
    setIsSeeking(true)
  }

  // Seeking end handler
  const handleProgressMouseUp = () => {
    setIsSeeking(false)
  }

  // Video ended handler
  const handleEnded = () => {
    setIsPlaying(false)
    onEnded?.()
  }

  // Keyboard controls (spacebar to play/pause)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault()
        handlePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying])

  return (
    <div
      className={`video-player ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="video-player-wrapper">
        <video
          ref={videoRef}
          className="video-player-video"
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          loop={loop}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Subtitle/Overlay Text */}
        {subtitle && (
          <div className="video-player-subtitle">
            <span>{subtitle}</span>
          </div>
        )}

        {/* Controls Overlay */}
        <div className={`video-player-overlay ${isHovering || !isPlaying ? 'visible' : ''}`}>
          {showControls && (
            <button
              className="video-player-play-btn"
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="video-player-progress-container">
        {/* Time Display */}
        <div className="video-player-time-display">
          <span className="video-player-current-time">{formatTime(currentTime)}</span>
          <span className="video-player-separator">/</span>
          <span className="video-player-duration">{formatTime(duration)}</span>
        </div>

        <div className="video-player-progress-bar-wrapper">
          <div
            className="video-player-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            onMouseDown={handleProgressMouseDown}
            onMouseUp={handleProgressMouseUp}
            onTouchStart={handleProgressMouseDown}
            onTouchEnd={handleProgressMouseUp}
            className="video-player-progress-slider"
            aria-label="Video progress"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
