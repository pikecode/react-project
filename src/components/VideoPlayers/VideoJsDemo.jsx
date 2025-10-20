import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './PlayerDemo.css'

export function VideoJsDemo() {
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      responsive: true,
      fluid: true,
      sources: [
        {
          src: '/src/static/music.mp4',
          type: 'video/mp4',
        },
      ],
    })

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose()
      }
    }
  }, [])

  return (
    <div className="player-container">
      <h2>Video.js 测试</h2>
      <div className="player-description">
        <p>✅ 功能完整，支持HLS/DASH</p>
        <p>✅ 无障碍特性好，跨浏览器兼容</p>
        <p>✅ 适合专业应用</p>
      </div>

      <div className="video-js-wrapper">
        <video ref={videoRef} className="video-js vjs-default-skin" />
      </div>

      <div className="info">
        <p>music.mp4 - 本地MP4格式视频</p>
      </div>
    </div>
  )
}
