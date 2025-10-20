import React, { useRef, useState } from 'react'
import './AudioDemo.css'

export function NativeAudioDemo() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current && !isSeeking) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
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
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(false)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  return (
    <div className="audio-container">
      <h2>HTML5 Audio 播放器</h2>
      <div className="audio-description">
        <p>✅ 无需依赖，原生支持</p>
        <p>✅ 轻量级，性能最优</p>
        <p>✅ 支持自定义进度条和控制</p>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/m.mp3" type="audio/mpeg" />
        你的浏览器不支持HTML5 Audio标签
      </audio>

      <div className="audio-progress-container">
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

      <div className="volume-control-container">
        <button onClick={handleMuteToggle} className="mute-btn">
          {isMuted ? '🔇 静音' : '🔊 音量'}
        </button>
        <div className="volume-slider-wrapper">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <span className="volume-value">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
      </div>

      <div className="info">
        <p>m.mp3 - 使用浏览器原生audio标签 + 自定义进度条</p>
      </div>
    </div>
  )
}
