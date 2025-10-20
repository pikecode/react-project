import React, { useRef } from 'react'
import VideoPlayer from 'react-video-js-player'
import './PlayerDemo.css'

export function VideoJsDemo() {
  const playerRef = useRef(null)

  const handleReady = (player) => {
    console.log('Video.js player is ready:', player)
    playerRef.current = player
  }

  const handlePlay = (player) => {
    console.log('Video started playing')
  }

  const handlePause = (player) => {
    console.log('Video paused')
  }

  const handleEnded = (player) => {
    console.log('Video ended')
  }

  const handleError = (error) => {
    console.log('Player error:', error)
  }

  return (
    <div className="player-container">
      <h2>Video.js - 使用 react-video-js-player</h2>
      <div className="player-description">
        <p>✅ 简单易用的React包装组件</p>
        <p>✅ 功能完整，支持HLS/DASH</p>
        <p>✅ 完整访问Video.js API</p>
        <p>✅ 内置事件系统</p>
      </div>

      <div className="video-js-wrapper">
        <VideoPlayer
          src="../../static/music.mp4"
          poster=""
          width="100%"
          height="auto"
          controls={true}
          autoplay={false}
          onReady={handleReady}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={handleError}
        />
      </div>

      <div className="info">
        <h4>react-video-js-player 方案</h4>
        <ul>
          <li>✅ 简洁的React组件API</li>
          <li>✅ 完全访问底层Video.js实例</li>
          <li>✅ 支持所有Video.js事件</li>
          <li>✅ 易于集成和定制</li>
          <li>✅ 开箱即用的UI</li>
        </ul>
      </div>
    </div>
  )
}
