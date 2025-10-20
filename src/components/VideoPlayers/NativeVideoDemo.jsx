import React, { useRef, useState } from 'react'
import './PlayerDemo.css'

export function NativeVideoDemo() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && !isSeeking) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleProgressMouseDown = () => {
    setIsSeeking(true)
  }

  const handleProgressMouseUp = () => {
    setIsSeeking(false)
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="player-container">
      <h2>原生HTML5 Video 标签</h2>
      <div className="player-description">
        <p>✅ 无需依赖，原生支持</p>
        <p>✅ 轻量级，性能最优</p>
        <p>✅ 支持自定义进度条和控制</p>
      </div>

      <video
        ref={videoRef}
        width="100%"
        height="auto"
        style={{ backgroundColor: '#000' }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source
          src="/music.mp4"
          type="video/mp4"
        />
        你的浏览器不支持HTML5 Video标签
      </video>

      <div className="video-progress-container">
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
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
            className="progress-slider"
          />
        </div>
        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="separator">/</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="controls">
        <button onClick={handlePlayPause} className="play-pause-btn">
          {isPlaying ? '⏸ 暂停' : '▶️ 播放'}
        </button>
        <div className="progress-info">
          <span>{Math.round(progressPercent)}% 已加载</span>
        </div>
      </div>

      <div className="info">
        <p>music.mp4 - 使用浏览器原生video标签 + 自定义进度条</p>
      </div>
    </div>
  )
}
