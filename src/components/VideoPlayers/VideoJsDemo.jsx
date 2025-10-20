import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './PlayerDemo.css'

export function VideoJsDemo() {
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    // Video.js 配置
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      responsive: true,
      fluid: true,
    })

    playerRef.current = player

    // 设置视频源
    player.src({
      src: '../../static/music.mp4',
      type: 'video/mp4',
    })

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
      }
    }
  }, [])

  return (
    <div className="player-container">
      <h2>Video.js - 原生集成</h2>
      <div className="player-description">
        <p>✅ 功能完整，支持HLS/DASH自适应流</p>
        <p>✅ 无障碍特性好，跨浏览器兼容</p>
        <p>✅ 丰富的插件生态系统</p>
        <p>✅ 活跃维护，662K+周下载量</p>
      </div>

      <div className="video-js-wrapper">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          data-vjs-player="true"
        />
      </div>

      <div className="info">
        <h4>Video.js 原生集成</h4>
        <ul>
          <li>✅ 直接使用Video.js API，无额外依赖冲突</li>
          <li>✅ 完全的事件系统支持</li>
          <li>✅ 支持HLS.js、DASH.js等适配流插件</li>
          <li>✅ 完全可定制的控制条</li>
          <li>✅ React 19完全兼容</li>
          <li>✅ 官方推荐的集成方式</li>
        </ul>
      </div>
    </div>
  )
}
