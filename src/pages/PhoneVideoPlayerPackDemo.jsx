import React, { useState } from 'react'
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

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>PhoneVideoPlayer Pack Demo</h1>
      <p style={{ marginTop: 0, color: '#7a8699' }}>来自 src/components/PhoneVideoPlayer/ 的一体化组件目录</p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div>
          <PhoneVideoPlayer
            src="/music.mp4"
            edgeToEdge={edgeToEdge}
            bottomBarPosition={bottomBarPosition}
            showNotch={showNotch}
            showBottomBar={showBottomBar}
            playButtonVariant={playButtonVariant}
            progressThumbWidth={`${thumbWidth}px`}
            progressThumbHeight={`${thumbHeight}px`}
            progressThumbRadius={`${thumbRadius}px`}
          />
        </div>

        <div style={{ minWidth: 320 }}>
          <h3>配置</h3>
          <div style={{ display: 'grid', gap: 10 }}>
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
        </div>
      </div>
    </div>
  )
}

export default PhoneVideoPlayerPackDemo

