import React, { useRef, useState, useEffect } from 'react'
import './styles/VideoPlayer.css'

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
 * @param {string} props.title - Video title (optional, displayed above progress bar)
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onPlay - Callback when video plays
 * @param {function} props.onPause - Callback when video pauses
 * @param {function} props.onEnded - Callback when video ends
 * @param {boolean} props.autoplay - Auto play on mount (mobile通常需静音)
 * @param {boolean} props.showControls - Show play/pause button (default: true)
 * @param {boolean} props.loop - Loop the video
 * @param {boolean} props.muted - Mute the video (若未显式传入且开启 autoplay，将自动静音)
 * @param {boolean} props.playsInline - iOS/Safari 内联播放，避免强制全屏（默认 true）
 * @param {('glass'|'icon')} props.playButtonVariant - 播放按钮样式：'glass' 半透明玻璃（默认），'icon' 纯图标
 * @param {string} props.progressPlayedColor - 进度条“已播放”颜色（CSS 颜色字符串）
 * @param {string} props.progressBufferedColor - 进度条“已缓冲未播放”颜色（CSS 颜色字符串）
 * @param {string} props.progressTrackColor - 进度条“未播放轨道”颜色（CSS 颜色字符串）
 * @param {string} props.progressThumbWidth - 进度条拇指宽度（CSS 长度，如 '6px'）
 * @param {string} props.progressThumbHeight - 进度条拇指高度（CSS 长度，如 '20px'）
 * @param {string} props.progressThumbRadius - 进度条拇指圆角（CSS 长度或百分比，如 '3px' 或 '50%'）
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
  title,
  className = '',
  onPlay,
  onPause,
  onEnded,
  autoplay = false,
  showControls = true,
  loop = false,
  muted = false,
  playsInline = true,
  playButtonVariant = 'glass',
  progressPlayedColor,
  progressBufferedColor,
  progressTrackColor,
  progressThumbWidth,
  progressThumbHeight,
  progressThumbRadius,

}) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  // 初始为未播放，由实际 video 事件驱动，以避免 autoplay 失败时 UI 与实际不一致
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [bufferedEnd, setBufferedEnd] = useState(0)

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
  const bufferedPercent = duration ? (Math.min(bufferedEnd, duration) / duration) * 100 : 0

  // Play/Pause handler
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        // 确保在尝试播放前应用静音策略
        videoRef.current.muted = muted || autoplay
        videoRef.current.play().catch(() => {
          // 忽略策略导致的拒绝，交给用户点击再播
        })
      }
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

  // Update buffered range
  const updateBuffered = () => {
    const v = videoRef.current
    if (!v) return
    try {
      const { buffered } = v
      if (buffered && buffered.length > 0) {
        // 取最后一段缓冲的 end 值，常用于线性媒体
        const end = buffered.end(buffered.length - 1)
        setBufferedEnd(end)
      } else {
        setBufferedEnd(0)
      }
    } catch (_) {
      // 忽略个别浏览器的读取异常
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

  // Seeking start/end
  const handleProgressMouseDown = () => {
    setIsSeeking(true)
  }
  const handleProgressMouseUp = () => {
    setIsSeeking(false)
  }

  // Video events: 将播放器状态与回调同步到 React
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onVideoPlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }
    const onVideoPause = () => {
      setIsPlaying(false)
      onPause?.()
    }
    const onVideoEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }

    v.addEventListener('play', onVideoPlay)
    v.addEventListener('pause', onVideoPause)
    v.addEventListener('ended', onVideoEnded)
    v.addEventListener('progress', updateBuffered)
    v.addEventListener('loadedmetadata', updateBuffered)
    v.addEventListener('durationchange', updateBuffered)

    return () => {
      v.removeEventListener('play', onVideoPlay)
      v.removeEventListener('pause', onVideoPause)
      v.removeEventListener('ended', onVideoEnded)
      v.removeEventListener('progress', updateBuffered)
      v.removeEventListener('loadedmetadata', updateBuffered)
      v.removeEventListener('durationchange', updateBuffered)
    }
  }, [onPlay, onPause, onEnded])

  // Autoplay：在挂载或切换时尝试自动播放（受浏览器策略影响）
  useEffect(() => {
    const v = videoRef.current
    if (!v || !autoplay) return
    v.muted = muted || autoplay
    const tryPlay = () => {
      v.play().catch(() => {
        // 静默失败，等待用户交互
      })
    }
    if (v.readyState >= 2) {
      tryPlay()
    } else {
      v.addEventListener('canplay', tryPlay, { once: true })
    }
  }, [autoplay, muted])

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

  // 允许通过 props 覆盖 CSS 变量，定制进度条与拇指
  const cssVarStyle = {
    ...(progressPlayedColor ? { ['--vp-played']: progressPlayedColor } : {}),
    ...(progressBufferedColor ? { ['--vp-buffered']: progressBufferedColor } : {}),
    ...(progressTrackColor ? { ['--vp-track']: progressTrackColor } : {}),
    ...(progressThumbWidth ? { ['--vp-thumb-width']: progressThumbWidth } : {}),
    ...(progressThumbHeight ? { ['--vp-thumb-height']: progressThumbHeight } : {}),
    ...(progressThumbRadius ? { ['--vp-thumb-radius']: progressThumbRadius } : {}),
  }

  return (
    <div
      className={`video-player ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={cssVarStyle}
    >
      <div className="video-player-wrapper">
        <video
          ref={videoRef}
          className="video-player-video"
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          // 事件统一在 effect 内处理
          loop={loop}
          autoPlay={autoplay}
          playsInline={playsInline}
          muted={muted || autoplay}
          preload="metadata"
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
        <div
          className={`video-player-overlay ${
            isHovering || !isPlaying ? 'visible' : ''
          } ${playButtonVariant === 'icon' ? 'icon-variant' : ''}`}
        >
          {showControls && (
            <button
              className={`video-player-play-btn ${playButtonVariant}`}
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg
                  className="video-player-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect x="5" y="4" width="5" height="16" rx="1.5" />
                  <rect x="14" y="4" width="5" height="16" rx="1.5" />
                </svg>
              ) : (
                <svg
                  className="video-player-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Optional Title */}
      {title && <div className="video-player-title" aria-live="polite">{title}</div>}

      {/* Progress Bar */}
      <div className={`video-player-progress-container`}>
        {/* Time Display */}
        <div className="video-player-time-display">
          <span className="video-player-current-time">{formatTime(currentTime)}</span>
          <span className="video-player-separator">/</span>
          <span className="video-player-duration">{formatTime(duration)}</span>
        </div>

        <div className="video-player-progress-bar-wrapper">
          <div
            className="video-player-buffered-fill"
            style={{ width: `${bufferedPercent}%` }}
          />
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

