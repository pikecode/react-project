import React, { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './PlayerDemo.css'

export function VideoJsDemo() {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
  })

  useEffect(() => {
    if (!videoRef.current) return

    // Video.js configuration
    const options = {
      controls: true,
      autoplay: false,
      preload: 'auto',
      responsive: true,
      fluid: true,
      controlBar: {
        // 自定义控制条
        children: [
          'playToggle',
          'currentTimeDisplay',
          'timeDivider',
          'durationDisplay',
          'progressControl',
          'volumePanel',
          'qualitySelector',
          'fullscreenToggle',
        ],
      },
      sources: [
        {
          src: '/src/static/music.mp4',
          type: 'video/mp4',
        },
      ],
    }

    // 初始化播放器
    const player = videojs(videoRef.current, options)

    // 设置播放器实例
    playerRef.current = player

    // 播放器事件监听
    const handlePlay = () => {
      setPlayerState((prev) => ({ ...prev, isPlaying: true }))
    }

    const handlePause = () => {
      setPlayerState((prev) => ({ ...prev, isPlaying: false }))
    }

    const handleTimeUpdate = () => {
      setPlayerState((prev) => ({
        ...prev,
        currentTime: player.currentTime(),
      }))
    }

    const handleDurationChange = () => {
      setPlayerState((prev) => ({
        ...prev,
        duration: player.duration(),
      }))
    }

    const handleVolumeChange = () => {
      setPlayerState((prev) => ({
        ...prev,
        volume: player.volume(),
      }))
    }

    // 绑定事件
    player.on('play', handlePlay)
    player.on('pause', handlePause)
    player.on('timeupdate', handleTimeUpdate)
    player.on('durationchange', handleDurationChange)
    player.on('volumechange', handleVolumeChange)

    // 清理函数
    return () => {
      player.off('play', handlePlay)
      player.off('pause', handlePause)
      player.off('timeupdate', handleTimeUpdate)
      player.off('durationchange', handleDurationChange)
      player.off('volumechange', handleVolumeChange)

      if (player && !player.isDisposed()) {
        player.dispose()
      }
    }
  }, [])

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="player-container">
      <h2>Video.js - 直接集成</h2>
      <div className="player-description">
        <p>✅ 功能完整，支持HLS/DASH自适应流</p>
        <p>✅ 无障碍特性好，跨浏览器完全兼容</p>
        <p>✅ 丰富的插件生态系统</p>
        <p>✅ 活跃的社区和官方支持</p>
      </div>

      <div className="video-js-wrapper">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          data-vjs-player="true"
        />
      </div>

      <div className="videojs-stats">
        <div className="stat-item">
          <span className="stat-label">状态:</span>
          <span className="stat-value">
            {playerState.isPlaying ? '▶️ 播放中' : '⏸ 已暂停'}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">进度:</span>
          <span className="stat-value">
            {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">音量:</span>
          <span className="stat-value">{Math.round(playerState.volume * 100)}%</span>
        </div>
      </div>

      <div className="info">
        <h4>Video.js 直接集成方案</h4>
        <ul>
          <li>✅ 直接使用Video.js API，无中间层</li>
          <li>✅ 完全的事件系统支持</li>
          <li>✅ 支持HLS.js、DASH.js等适配流插件</li>
          <li>✅ 完全可定制的控制条</li>
          <li>✅ React Hooks最佳实践实现</li>
          <li>✅ 活跃维护，662K+周下载量</li>
        </ul>
      </div>
    </div>
  )
}
