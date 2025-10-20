import React from 'react'
import { NativeVideoDemo } from '../components/VideoPlayers/NativeVideoDemo'
import { NativeAudioDemo } from '../components/AudioPlayers/NativeAudioDemo'
import '../styles/MediaPlayerTest.css'

export function MediaPlayerTest() {
  return (
    <div className="media-test-container">
      <header className="test-header">
        <h1>🎬 HTML5 媒体播放器</h1>
        <p>使用原生HTML5 Video + Audio标签 + 自定义进度条</p>
      </header>

      <div className="tab-content">
        <div className="video-section">
          <NativeVideoDemo />
        </div>
        <div className="audio-section">
          <NativeAudioDemo />
        </div>
      </div>
    </div>
  )
}
