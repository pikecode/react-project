import React, { useEffect, useMemo, useState } from 'react'
import PhoneVideoPlayer from '../components/PhoneVideoPlayer'
import './PhoneVideoPlayerShowcase.css'

const VIDEO_PRESETS = [
  {
    id: 'drama',
    label: '剧情演示',
    src: '/music.mp4',
    subtitle: '',
    title: '',
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
  const [bottomBarPosition, setBottomBarPosition] = useState('below')
  const [edgeToEdge, setEdgeToEdge] = useState(true)
  const [showNotch, setShowNotch] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(true)
  const [playButtonVariant, setPlayButtonVariant] = useState('glass')

  // 进度条颜色控制（支持使用 CSS 变量覆盖）
  const [playedColor, setPlayedColor] = useState('#ffffff')
  const [bufferedColor, setBufferedColor] = useState('#ffffff')
  const [bufferedAlpha, setBufferedAlpha] = useState(0.38)
  const [trackColor, setTrackColor] = useState('#ffffff')
  const [trackAlpha, setTrackAlpha] = useState(0.14)
  const [thumbWidth, setThumbWidth] = useState(6)
  const [thumbHeight, setThumbHeight] = useState(20)
  const [thumbRadius, setThumbRadius] = useState(3)

  const hexToRgba = (hex, alpha = 1) => {
    try {
      let h = (hex || '').replace('#', '')
      if (h.length === 3) {
        h = h
          .split('')
          .map((c) => c + c)
          .join('')
      }
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      const a = Math.min(1, Math.max(0, Number(alpha)))
      return `rgba(${r}, ${g}, ${b}, ${isNaN(a) ? 1 : a})`
    } catch {
      return `rgba(255, 255, 255, ${alpha})`
    }
  }

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
            bottomBarPosition={bottomBarPosition}
            edgeToEdge={edgeToEdge}
            showNotch={showNotch}
            showBottomBar={showBottomBar}
            playButtonVariant={playButtonVariant}
            progressPlayedColor={playedColor}
            progressBufferedColor={hexToRgba(bufferedColor, bufferedAlpha)}
            progressTrackColor={hexToRgba(trackColor, trackAlpha)}
            progressThumbWidth={`${thumbWidth}px`}
            progressThumbHeight={`${thumbHeight}px`}
            progressThumbRadius={`${thumbRadius}px`}
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
            <label className="switch">
              <input
                type="checkbox"
                checked={edgeToEdge}
                onChange={(event) => setEdgeToEdge(event.target.checked)}
              />
              贴边全屏（edgeToEdge）
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={showNotch}
                onChange={(event) => setShowNotch(event.target.checked)}
              />
              显示刘海（showNotch）
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={showBottomBar}
                onChange={(event) => setShowBottomBar(event.target.checked)}
              />
              显示底部栏（showBottomBar）
            </label>
          </div>

          <div className="control-group">
            <label htmlFor="bottomBarPosition">底部栏位置</label>
            <select
              id="bottomBarPosition"
              value={bottomBarPosition}
              onChange={(event) => setBottomBarPosition(event.target.value)}
            >
              <option value="below">视频下面（占位）</option>
              <option value="overlay">悬浮覆盖（贴底）</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="playButtonVariant">播放按钮样式</label>
            <select
              id="playButtonVariant"
              value={playButtonVariant}
              onChange={(event) => setPlayButtonVariant(event.target.value)}
            >
              <option value="glass">玻璃圆形</option>
              <option value="icon">纯图标</option>
            </select>
          </div>

          {/* 进度条方向（竖向）支持已移除，统一使用横向样式 */}

          <div className="control-group">
            <label>进度条颜色（已播放/缓冲/未播放）</label>
            <div className="color-row">
              <div className="color-item">
                <span>已播放</span>
                <input
                  type="color"
                  value={playedColor}
                  onChange={(e) => setPlayedColor(e.target.value)}
                  aria-label="已播放颜色"
                />
              </div>
              <div className="color-item">
                <span>缓冲</span>
                <input
                  type="color"
                  value={bufferedColor}
                  onChange={(e) => setBufferedColor(e.target.value)}
                  aria-label="缓冲颜色"
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={bufferedAlpha}
                  onChange={(e) => setBufferedAlpha(parseFloat(e.target.value))}
                  aria-label="缓冲透明度"
                />
              </div>
              <div className="color-item">
                <span>未播放</span>
                <input
                  type="color"
                  value={trackColor}
                  onChange={(e) => setTrackColor(e.target.value)}
                  aria-label="未播放颜色"
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={trackAlpha}
                  onChange={(e) => setTrackAlpha(parseFloat(e.target.value))}
                  aria-label="未播放透明度"
                />
              </div>
            </div>
          </div>

          <div className="control-group">
            <label>拖动按钮（拇指）形状</label>
            <div className="color-row">
              <div className="color-item">
                <span>宽度(px)</span>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={thumbWidth}
                  onChange={(e) => setThumbWidth(parseInt(e.target.value, 10) || 6)}
                  aria-label="拇指宽度"
                />
              </div>
              <div className="color-item">
                <span>高度(px)</span>
                <input
                  type="range"
                  min="12"
                  max="32"
                  step="1"
                  value={thumbHeight}
                  onChange={(e) => setThumbHeight(parseInt(e.target.value, 10) || 20)}
                  aria-label="拇指高度"
                />
              </div>
              <div className="color-item">
                <span>圆角(px)</span>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={thumbRadius}
                  onChange={(e) => setThumbRadius(parseInt(e.target.value, 10) || 3)}
                  aria-label="拇指圆角"
                />
              </div>
            </div>
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
        <pre>{`import PhoneVideoPlayer from '@/components/PhoneVideoPlayer'

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
          <code>src/components/PhoneVideoPlayer/PhoneVideoPlayer.jsx</code>
        </p>
      </footer>
    </div>
  )
}

export default PhoneVideoPlayerShowcase
