import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './AudioDemo.css'

export function ReactH5AudioPlayerDemo() {
  const testAudios = [
    {
      name: '示例音乐 1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      name: '示例音乐 2',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
  ]

  return (
    <div className="audio-container">
      <h2>React H5 Audio Player 测试</h2>
      <div className="audio-description">
        <p>✅ TypeScript编写，类型安全</p>
        <p>✅ 移动端友好，键盘支持</p>
        <p>✅ 高度可定制，响应式设计</p>
        <p>✅ 开箱即用的美观UI</p>
      </div>

      <div className="audio-list">
        {testAudios.map((audio) => (
          <div key={audio.url} className="audio-item">
            <h3>🎵 {audio.name}</h3>
            <AudioPlayer
              src={audio.url}
              onPlay={() => console.log('Playing:', audio.name)}
              onEnded={() => console.log('Ended:', audio.name)}
              showSkipControls={true}
              showJumpControls={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
