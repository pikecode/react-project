import React, { useMemo, useState } from 'react'
import PhoneVideoPlayer from '../components/PhoneVideoPlayer'

export function PhoneVideoPlayerPackDemo() {
  const [edgeToEdge, setEdgeToEdge] = useState(true)
  const [bottomBarPosition, setBottomBarPosition] = useState('below')
  const [showNotch, setShowNotch] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(true)
  const [playButtonVariant, setPlayButtonVariant] = useState('glass')
  const [thumbWidth, setThumbWidth] = useState(6)
  const [thumbHeight, setThumbHeight] = useState(20)
  const [thumbRadius, setThumbRadius] = useState(3)
  const [showControls, setShowControls] = useState(true)
  const [autoplay, setAutoplay] = useState(false)
  const [loop, setLoop] = useState(false)
  const [muted, setMuted] = useState(false)
  const [playsInline, setPlaysInline] = useState(true)
  const [subtitle, setSubtitle] = useState('')
  const [title, setTitle] = useState('')
  const [bottomBarLabels, setBottomBarLabels] = useState(['叙梦', '我的'])
  const [bottomBarActiveIndex, setBottomBarActiveIndex] = useState(0)
  const [playedColor, setPlayedColor] = useState('#ffffff')
  const [bufferedColor, setBufferedColor] = useState('#ffffff')
  const [bufferedAlpha, setBufferedAlpha] = useState(0.38)
  const [trackColor, setTrackColor] = useState('#ffffff')
  const [trackAlpha, setTrackAlpha] = useState(0.14)

  const hexToRgba = (hex, alpha = 1) => {
    try {
      let h = (hex || '').replace('#', '')
      if (h.length === 3) h = h.split('').map((c) => c + c).join('')
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      const a = Math.min(1, Math.max(0, Number(alpha)))
      return `rgba(${r}, ${g}, ${b}, ${isNaN(a) ? 1 : a})`
    } catch {
      return `rgba(255, 255, 255, ${alpha})`
    }
  }

  const bufferedRgba = useMemo(() => hexToRgba(bufferedColor, bufferedAlpha), [bufferedColor, bufferedAlpha])
  const trackRgba = useMemo(() => hexToRgba(trackColor, trackAlpha), [trackColor, trackAlpha])

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>PhoneVideoPlayer Pack Demo</h1>
      <p style={{ marginTop: 0, color: '#7a8699' }}>来自 src/components/PhoneVideoPlayer/ 的一体化组件目录</p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div>
          <PhoneVideoPlayer
            src="/music.mp4"
            subtitle={subtitle || undefined}
            title={title || undefined}
            autoplay={autoplay}
            showControls={showControls}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            edgeToEdge={edgeToEdge}
            bottomBarPosition={bottomBarPosition}
            showNotch={showNotch}
            showBottomBar={showBottomBar}
            playButtonVariant={playButtonVariant}
            bottomBarLabels={bottomBarLabels}
            bottomBarActiveIndex={bottomBarActiveIndex}
            progressThumbWidth={`${thumbWidth}px`}
            progressThumbHeight={`${thumbHeight}px`}
            progressThumbRadius={`${thumbRadius}px`}
            progressPlayedColor={playedColor}
            progressBufferedColor={bufferedRgba}
            progressTrackColor={trackRgba}
          />
        </div>

        <div style={{ minWidth: 320 }}>
          <h3>配置</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <label>
              字幕
              <input
                type="text"
                placeholder="输入字幕"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                style={{ marginLeft: 8, width: '100%' }}
              />
            </label>
            <label>
              标题
              <input
                type="text"
                placeholder="输入标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginLeft: 8, width: '100%' }}
              />
            </label>
            <label>
              <input type="checkbox" checked={showControls} onChange={(e) => setShowControls(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>显示播放按钮（showControls）</span>
            </label>
            <label>
              <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>自动播放（autoplay）</span>
            </label>
            <label>
              <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>循环播放（loop）</span>
            </label>
            <label>
              <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>静音（muted）</span>
            </label>
            <label>
              <input type="checkbox" checked={playsInline} onChange={(e) => setPlaysInline(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>内联播放（playsInline）</span>
            </label>
            <label>
              <input type="checkbox" checked={edgeToEdge} onChange={(e) => setEdgeToEdge(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>贴边全屏（edgeToEdge）</span>
            </label>
            <label>
              <input type="checkbox" checked={showNotch} onChange={(e) => setShowNotch(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>显示刘海（showNotch）</span>
            </label>
            <label>
              <input type="checkbox" checked={showBottomBar} onChange={(e) => setShowBottomBar(e.target.checked)} />
              <span style={{ marginLeft: 8 }}>显示底部栏（showBottomBar）</span>
            </label>
            <label>
              底部栏位置
              <select
                value={bottomBarPosition}
                onChange={(e) => setBottomBarPosition(e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="below">视频下面（占位）</option>
                <option value="overlay">悬浮覆盖（贴底）</option>
              </select>
            </label>
            <label>
              播放按钮
              <select
                value={playButtonVariant}
                onChange={(e) => setPlayButtonVariant(e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="glass">玻璃圆形</option>
                <option value="icon">纯图标</option>
              </select>
            </label>
            <div>
              <div style={{ fontWeight: 600, margin: '10px 0 6px' }}>底部栏文案</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label>
                  标签1
                  <input
                    type="text"
                    value={bottomBarLabels[0]}
                    onChange={(e) => setBottomBarLabels([e.target.value, bottomBarLabels[1]])}
                    style={{ marginLeft: 8, width: '100%' }}
                  />
                </label>
                <label>
                  标签2
                  <input
                    type="text"
                    value={bottomBarLabels[1]}
                    onChange={(e) => setBottomBarLabels([bottomBarLabels[0], e.target.value])}
                    style={{ marginLeft: 8, width: '100%' }}
                  />
                </label>
                <label>
                  激活索引
                  <select
                    value={bottomBarActiveIndex}
                    onChange={(e) => setBottomBarActiveIndex(parseInt(e.target.value, 10) || 0)}
                    style={{ marginLeft: 8 }}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <h4 style={{ marginTop: 18 }}>拇指（拖动按钮）</h4>
          <div style={{ display: 'grid', gap: 10 }}>
            <label>
              宽度: {thumbWidth}px
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={thumbWidth}
                onChange={(e) => setThumbWidth(parseInt(e.target.value, 10) || 6)}
                style={{ width: '100%' }}
              />
            </label>
            <label>
              高度: {thumbHeight}px
              <input
                type="range"
                min="12"
                max="32"
                step="1"
                value={thumbHeight}
                onChange={(e) => setThumbHeight(parseInt(e.target.value, 10) || 20)}
                style={{ width: '100%' }}
              />
            </label>
            <label>
              圆角: {thumbRadius}px
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={thumbRadius}
                onChange={(e) => setThumbRadius(parseInt(e.target.value, 10) || 3)}
                style={{ width: '100%' }}
              />
            </label>
          </div>

          <h4 style={{ marginTop: 18 }}>进度条颜色</h4>
          <div style={{ display: 'grid', gap: 10 }}>
            <label>
              已播放颜色
              <input type="color" value={playedColor} onChange={(e) => setPlayedColor(e.target.value)} style={{ marginLeft: 8 }} />
            </label>
            <label>
              缓冲颜色
              <input type="color" value={bufferedColor} onChange={(e) => setBufferedColor(e.target.value)} style={{ marginLeft: 8 }} />
              透明度
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={bufferedAlpha}
                onChange={(e) => setBufferedAlpha(parseFloat(e.target.value))}
                style={{ width: '100%', marginTop: 6 }}
              />
            </label>
            <label>
              未播放颜色
              <input type="color" value={trackColor} onChange={(e) => setTrackColor(e.target.value)} style={{ marginLeft: 8 }} />
              透明度
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={trackAlpha}
                onChange={(e) => setTrackAlpha(parseFloat(e.target.value))}
                style={{ width: '100%', marginTop: 6 }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneVideoPlayerPackDemo
