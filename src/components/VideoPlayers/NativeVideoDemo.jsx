import React, { useRef, useState } from 'react'
import './PlayerDemo.css'

export function NativeVideoDemo() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

  return (
    <div className="player-container">
      <h2>原生HTML5 Video 标签</h2>
      <div className="player-description">
        <p>✅ 无需依赖，原生支持</p>
        <p>✅ 轻量级，性能最优</p>
        <p>⚠️ 功能有限，UI定制复杂</p>
      </div>

      <video
        ref={videoRef}
        width="100%"
        height="auto"
        style={{ backgroundColor: '#000' }}
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        你的浏览器不支持HTML5 Video标签
      </video>

      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? '暂停' : '播放'}
        </button>
      </div>

      <div className="info">
        <p>使用浏览器原生video标签的简单实现</p>
      </div>
    </div>
  )
}
