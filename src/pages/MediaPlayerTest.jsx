import React, { useState } from 'react'
import { ReactPlayerDemo } from '../components/VideoPlayers/ReactPlayerDemo'
import { VideoJsDemo } from '../components/VideoPlayers/VideoJsDemo'
import { NativeVideoDemo } from '../components/VideoPlayers/NativeVideoDemo'
import { ReactH5AudioPlayerDemo } from '../components/AudioPlayers/ReactH5AudioPlayerDemo'
import { NativeAudioDemo } from '../components/AudioPlayers/NativeAudioDemo'
import '../styles/MediaPlayerTest.css'

export function MediaPlayerTest() {
  const [activeTab, setActiveTab] = useState('video')

  return (
    <div className="media-test-container">
      <header className="test-header">
        <h1>🎬 媒体播放器组件测试</h1>
        <p>对比不同的视频和音频播放器组件，找到最适合你的解决方案</p>
      </header>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          📹 视频播放器
        </button>
        <button
          className={`tab-btn ${activeTab === 'audio' ? 'active' : ''}`}
          onClick={() => setActiveTab('audio')}
        >
          🔊 音频播放器
        </button>
        <button
          className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          📋 选择指南
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'video' && (
          <div className="video-section">
            <ReactPlayerDemo />
            <VideoJsDemo />
            <NativeVideoDemo />

            <div className="comparison-table">
              <h3>视频播放器对比</h3>
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>ReactPlayer</th>
                    <th>Video.js</th>
                    <th>原生Video</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>多平台支持</td>
                    <td>✅ 很好</td>
                    <td>✅ 很好</td>
                    <td>⚠️ 仅本地文件</td>
                  </tr>
                  <tr>
                    <td>学习难度</td>
                    <td>✅ 简单</td>
                    <td>⚠️ 中等</td>
                    <td>✅ 简单</td>
                  </tr>
                  <tr>
                    <td>功能完整性</td>
                    <td>✅ 很好</td>
                    <td>✅✅ 最完整</td>
                    <td>⚠️ 基础</td>
                  </tr>
                  <tr>
                    <td>HLS/DASH支持</td>
                    <td>✅ 有</td>
                    <td>✅ 有</td>
                    <td>⚠️ 需配置</td>
                  </tr>
                  <tr>
                    <td>自定义UI</td>
                    <td>✅ 简单</td>
                    <td>✅ 灵活</td>
                    <td>✅ 需自己实现</td>
                  </tr>
                  <tr>
                    <td>性能</td>
                    <td>✅ 好</td>
                    <td>✅ 好</td>
                    <td>✅✅ 最优</td>
                  </tr>
                  <tr>
                    <td>包体积</td>
                    <td>⚠️ 中</td>
                    <td>⚠️ 大</td>
                    <td>✅ 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'audio' && (
          <div className="audio-section">
            <ReactH5AudioPlayerDemo />
            <NativeAudioDemo />

            <div className="comparison-table">
              <h3>音频播放器对比</h3>
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>React H5 Audio</th>
                    <th>原生Audio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>美观UI</td>
                    <td>✅✅ 开箱即用</td>
                    <td>⚠️ 需自己设计</td>
                  </tr>
                  <tr>
                    <td>学习难度</td>
                    <td>✅ 简单</td>
                    <td>✅ 简单</td>
                  </tr>
                  <tr>
                    <td>功能完整性</td>
                    <td>✅✅ 很完整</td>
                    <td>⚠️ 基础功能</td>
                  </tr>
                  <tr>
                    <td>键盘支持</td>
                    <td>✅ 有</td>
                    <td>⚠️ 需自己实现</td>
                  </tr>
                  <tr>
                    <td>移动端友好</td>
                    <td>✅✅ 很好</td>
                    <td>✅ 可以</td>
                  </tr>
                  <tr>
                    <td>性能</td>
                    <td>✅ 好</td>
                    <td>✅✅ 最优</td>
                  </tr>
                  <tr>
                    <td>包体积</td>
                    <td>⚠️ 小</td>
                    <td>✅ 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="guide-section">
            <div className="guide-card">
              <h3>🎬 我应该选择哪个视频播放器？</h3>
              <div className="guide-item">
                <h4>✅ 选择 ReactPlayer 如果：</h4>
                <ul>
                  <li>需要支持多个视频源（本地、YouTube、Vimeo等）</li>
                  <li>想要简单易用的API</li>
                  <li>项目中已有其他多媒体需求</li>
                  <li>需要统一的控制接口</li>
                </ul>
              </div>

              <div className="guide-item">
                <h4>✅ 选择 Video.js 如果：</h4>
                <ul>
                  <li>构建专业的流媒体应用</li>
                  <li>需要支持HLS、DASH等自适应流格式</li>
                  <li>需要高级的分析和追踪功能</li>
                  <li>想要完整可定制的播放器</li>
                  <li>无障碍特性是必需的</li>
                </ul>
              </div>

              <div className="guide-item">
                <h4>✅ 选择原生 HTML5 Video 如果：</h4>
                <ul>
                  <li>只需要播放本地MP4/WebM文件</li>
                  <li>追求最小的包体积</li>
                  <li>追求最优的性能</li>
                  <li>不需要复杂的控制功能</li>
                  <li>简洁的浏览器默认UI可以接受</li>
                </ul>
              </div>
            </div>

            <div className="guide-card">
              <h3>🔊 我应该选择哪个音频播放器？</h3>
              <div className="guide-item">
                <h4>✅ 选择 React H5 Audio Player 如果：</h4>
                <ul>
                  <li>需要美观的、现代化的播放器UI</li>
                  <li>需要完整的播放功能（播放列表、音量控制等）</li>
                  <li>需要键盘快捷键支持</li>
                  <li>移动端兼容性很重要</li>
                  <li>想要开箱即用的解决方案</li>
                </ul>
              </div>

              <div className="guide-item">
                <h4>✅ 选择原生 HTML5 Audio 如果：</h4>
                <ul>
                  <li>只需要基础的播放/暂停功能</li>
                  <li>追求最小的依赖</li>
                  <li>追求最优的性能</li>
                  <li>可以自己实现UI和功能</li>
                  <li>希望完全控制播放器的样式</li>
                </ul>
              </div>
            </div>

            <div className="recommendations">
              <h3>💡 推荐方案</h3>
              <div className="rec-item">
                <span className="rec-label">通用项目</span>
                <span className="rec-value">ReactPlayer + React H5 Audio Player</span>
              </div>
              <div className="rec-item">
                <span className="rec-label">专业流媒体应用</span>
                <span className="rec-value">Video.js + React H5 Audio Player</span>
              </div>
              <div className="rec-item">
                <span className="rec-label">性能优先</span>
                <span className="rec-value">原生 Video + 原生 Audio</span>
              </div>
              <div className="rec-item">
                <span className="rec-label">快速原型开发</span>
                <span className="rec-value">ReactPlayer + React H5 Audio Player</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
