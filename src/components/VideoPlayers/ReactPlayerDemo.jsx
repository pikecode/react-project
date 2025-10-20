import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import './PlayerDemo.css'

export function ReactPlayerDemo() {
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value)
    setProgress(newProgress)
    playerRef.current.seekTo(newProgress, 'fraction')
  }

  const testVideos = [
    {
      name: '本地视频 (music.mp4)',
      url: '/src/static/music.mp4',
    },
    {
      name: 'YouTube视频',
      url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    },
  ]

  return (
    <div className="player-container">
      <h2>ReactPlayer 测试</h2>
      <div className="player-description">
        <p>✅ 支持多平台（本地、YouTube、Vimeo等）</p>
        <p>✅ 统一API，简单易用</p>
        <p>✅ 社区活跃，文档完善</p>
      </div>

      <div className="test-videos">
        {testVideos.map((video) => (
          <div key={video.url} className="video-test">
            <h3>{video.name}</h3>
            <div className="react-player-wrapper">
              <ReactPlayer
                ref={playerRef}
                url={video.url}
                playing={playing}
                onProgress={(state) => setProgress(state.played)}
                onDuration={setDuration}
                onEnded={() => setPlaying(false)}
                controls
                width="100%"
                height="100%"
              />
            </div>

            <div className="controls">
              <button onClick={handlePlayPause}>
                {playing ? '暂停' : '播放'}
              </button>
              <div className="progress-bar">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={progress}
                  onChange={handleProgressChange}
                />
                <span>{Math.round(progress * 100)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
