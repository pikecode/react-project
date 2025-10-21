import React, { useEffect, useMemo, useState } from 'react'
import { PhoneVideoPlayer } from '../components/MobileVideoPlayer/PhoneVideoPlayer'
import './PhoneVideoPlayerShowcase.css'

const VIDEO_PRESETS = [
  {
    id: 'drama',
    label: '剧情演示',
    src: '/music.mp4',
    subtitle: '她前夫要是看到这个场景',
    title: '城市故事片段',
  },
  {
    id: 'loop',
    label: '循环播放测试',
    src: '/music.mp4',
    subtitle: '循环播放演练，适合动态背景',
    title: 'Loop Demo',
  },
  {
    id: 'minimal',
    label: '极简模式',
    src: '/music.mp4',
    subtitle: '',
    title: '',
  },
]

export function PhoneVideoPlayerShowcase() {
  const [presetId, setPresetId] = useState(VIDEO_PRESETS[0].id)
  const [subtitle, setSubtitle] = useState(VIDEO_PRESETS[0].subtitle)
  const [title, setTitle] = useState(VIDEO_PRESETS[0].title || '')
  const [showControls, setShowControls] = useState(true)
  const [autoplay, setAutoplay] = useState(false)
  const [loop, setLoop] = useState(false)

  const activePreset = useMemo(
    () => VIDEO_PRESETS.find((preset) => preset.id === presetId) ?? VIDEO_PRESETS[0],
    [presetId],
  )

  useEffect(() => {
    setSubtitle(activePreset.subtitle || '')
    setTitle(activePreset.title || '')
  }, [activePreset])

  return (
    <div className="phone-video-page">
      <header className="phone-video-header">
        <span className="header-kicker">Mobile Ready</span>
        <h1>PhoneVideoPlayer Showcase</h1>
        <p>独立页面演示 iPhone mockup + 自定义控件的视频播放体验。</p>
      </header>

      <section className="showcase-content">
        <div className="phone-preview">
          <PhoneVideoPlayer
            src={activePreset.src}
            subtitle={subtitle}
            title={title || undefined}
            autoplay={autoplay}
            showControls={showControls}
            loop={loop}
          />
          <div className="preview-meta">
            <h2>当前场景：{activePreset.label}</h2>
            <p>可输入字幕、切换选项，实时体验播放效果。</p>
          </div>
        </div>

        <aside className="control-panel">
          <h2>交互配置</h2>

          <div className="control-group">
            <label htmlFor="preset">预设场景</label>
            <select
              id="preset"
              value={presetId}
              onChange={(event) => setPresetId(event.target.value)}
            >
              {VIDEO_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="subtitle">字幕/Overlay</label>
            <input
              id="subtitle"
              type="text"
              placeholder="输入字幕"
              value={subtitle}
              onChange={(event) => setSubtitle(event.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="title">标题（可选）</label>
            <input
              id="title"
              type="text"
              placeholder="输入标题"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="control-switches">
            <label className="switch">
              <input
                type="checkbox"
                checked={showControls}
                onChange={(event) => setShowControls(event.target.checked)}
              />
              显示播放按钮
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={autoplay}
                onChange={(event) => setAutoplay(event.target.checked)}
              />
              自动播放
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={loop}
                onChange={(event) => setLoop(event.target.checked)}
              />
              循环播放
            </label>
          </div>

          <div className="control-note">
            <p>
              所有设置均直接传递给
              <code>PhoneVideoPlayer</code>
              ，便于快速预览效果。
            </p>
          </div>
        </aside>
      </section>

      <section className="feature-section">
        <h2>Why it works on mobile</h2>
        <ul>
          <li>拟物化 iPhone 边框 + Dynamic Island notch</li>
          <li>自定义字幕层，支持实时输入文本</li>
          <li>自带播放控件、进度条与键盘交互</li>
          <li>演示常用配置：自动播放、循环、控件开关</li>
        </ul>
      </section>

      <section className="code-sample">
        <h2>用法示例</h2>
        <pre>{`import { PhoneVideoPlayer } from '@/components/MobileVideoPlayer'

export function HeroPhonePreview() {
  return (
    <PhoneVideoPlayer
      src="/music.mp4"
      subtitle="她前夫要是看到这个场景"
      autoplay
      loop
    />
  )
}`}</pre>
      </section>

      <footer className="page-footer">
        <p>
          组件文件位置：
          <code>src/components/MobileVideoPlayer/PhoneVideoPlayer.jsx</code>
        </p>
      </footer>
    </div>
  )
}

export default PhoneVideoPlayerShowcase
