import React, { useRef, useState } from 'react'
import './AudioDemo.css'

export function NativeAudioDemo() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

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

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="audio-container">
      <h2>原生 HTML5 Audio 标签</h2>
      <div className="audio-description">
        <p>✅ 无需依赖，原生支持</p>
        <p>✅ 轻量级，性能最优</p>
        <p>⚠️ 需要自己实现完整的UI和功能</p>
      </div>

      <div className="audio-item">
        <h3>🎵 示例音乐</h3>
        <audio
          ref={audioRef}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime)
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration)
            }
          }}
          onEnded={() => setIsPlaying(false)}
        >
          <source
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            type="audio/mpeg"
          />
          你的浏览器不支持HTML5 Audio标签
        </audio>

        <div className="custom-controls">
          <button onClick={handlePlayPause} className="play-btn">
            {isPlaying ? '⏸ 暂停' : '▶️ 播放'}
          </button>

          <div className="progress-section">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleTimeChange}
              className="time-slider"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
