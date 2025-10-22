import React, { useEffect, useRef, useState } from 'react'
import './styles/AudioPlayer.css'

/**
 * 基于原生 HTML5 <audio> 的音频播放器（自定义控件）
 * - 播放/暂停
 * - 进度条（缓冲/已播放/拖动）
 * - 时间显示（当前/总时长）
 * - 静音与音量调节
 * - 键盘支持：空格播放/暂停，←/→ ±5s，Home/End 跳转
 */
export function AudioPlayer({
  src,
  title,
  className = '',
  autoplay = false,
  loop = false,
  muted = false,
  preload = 'metadata',
  onPlay,
  onPause,
  onEnded,
  onError,
  // 进度条颜色（可选）
  progressPlayedColor,
  progressBufferedColor,
  progressTrackColor,
  // 拇指（拖动按钮）形状（竖条）
  progressThumbWidth,
  progressThumbHeight,
  progressThumbRadius,
}) {
  const audioRef = useRef(null)
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [bufferedEnd, setBufferedEnd] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(10) // 1-10 档位

  // 统一 CSS 变量覆盖
  const cssVarStyle = {
    ...(progressPlayedColor ? { ['--ap-played']: progressPlayedColor } : {}),
    ...(progressBufferedColor ? { ['--ap-buffered']: progressBufferedColor } : {}),
    ...(progressTrackColor ? { ['--ap-track']: progressTrackColor } : {}),
    ...(progressThumbWidth ? { ['--ap-thumb-width']: progressThumbWidth } : {}),
    ...(progressThumbHeight ? { ['--ap-thumb-height']: progressThumbHeight } : {}),
    ...(progressThumbRadius ? { ['--ap-thumb-radius']: progressThumbRadius } : {}),
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0
  const bufferedPercent = duration ? (Math.min(bufferedEnd, duration) / duration) * 100 : 0

  const handlePlayPause = () => {
    const a = audioRef.current
    if (!a) return
    if (isPlaying) {
      a.pause()
    } else {
      a.muted = a.muted || muted || autoplay
      a.play().catch(() => {})
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current || isSeeking) return
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
      rafRef.current = null
    })
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const updateBuffered = () => {
    const a = audioRef.current
    if (!a) return
    try {
      const { buffered } = a
      if (buffered && buffered.length > 0) setBufferedEnd(buffered.end(buffered.length - 1))
      else setBufferedEnd(0)
    } catch (_) {}
  }

  const onRangeChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) audioRef.current.currentTime = newTime
  }
  const onRangeDown = () => setIsSeeking(true)
  const onRangeUp = () => setIsSeeking(false)

  const onRangeKeyDown = (e) => {
    const a = audioRef.current
    if (!a || !duration) return
    const step = 5
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const t = Math.max(0, a.currentTime - step)
      a.currentTime = t
      setCurrentTime(t)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      const t = Math.min(duration, a.currentTime + step)
      a.currentTime = t
      setCurrentTime(t)
    } else if (e.key === 'Home') {
      e.preventDefault()
      a.currentTime = 0
      setCurrentTime(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      a.currentTime = duration
      setCurrentTime(duration)
    }
  }

  // 事件绑定
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlayHandler = () => { setIsPlaying(true); onPlay?.() }
    const onPauseHandler = () => { setIsPlaying(false); onPause?.() }
    const onEndedHandler = () => { setIsPlaying(false); onEnded?.() }
    const onErrorHandler = (event) => { setIsPlaying(false); setHasError(true); onError?.(event?.target?.error || event) }

    a.addEventListener('play', onPlayHandler)
    a.addEventListener('pause', onPauseHandler)
    a.addEventListener('ended', onEndedHandler)
    a.addEventListener('error', onErrorHandler)
    a.addEventListener('progress', updateBuffered)
    a.addEventListener('loadedmetadata', updateBuffered)
    a.addEventListener('durationchange', updateBuffered)
    return () => {
      a.removeEventListener('play', onPlayHandler)
      a.removeEventListener('pause', onPauseHandler)
      a.removeEventListener('ended', onEndedHandler)
      a.removeEventListener('error', onErrorHandler)
      a.removeEventListener('progress', updateBuffered)
      a.removeEventListener('loadedmetadata', updateBuffered)
      a.removeEventListener('durationchange', updateBuffered)
    }
  }, [onPlay, onPause, onEnded, onError])

  // src 变化重新加载
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    setHasError(false)
    setDuration(0)
    setCurrentTime(0)
    setBufferedEnd(0)
    try {
      a.pause(); a.load();
      if (autoplay) {
        a.muted = muted || autoplay
        const tryPlay = () => a.play().catch(() => {})
        if (a.readyState >= 2) tryPlay(); else a.addEventListener('canplay', tryPlay, { once: true })
      }
    } catch (_) {}
  }, [src])

  // 空格播放/暂停
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault(); handlePlayPause()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isPlaying])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  // 初始设置音量为档位值（非静音）
  useEffect(() => {
    const a = audioRef.current
    if (a) a.volume = volumeLevel / 10
  }, [])

  return (
    <div className={`audio-player ${className}`} ref={containerRef} style={cssVarStyle}>
      <audio
        ref={audioRef}
        preload={preload}
        loop={loop}
        autoPlay={autoplay}
        muted={muted || autoplay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source key={src} src={src} />
        Your browser does not support the audio element.
      </audio>

      {/* 错误态 */}
      {hasError && (
        <div className="audio-error" role="alert">
          <div>音频播放出错，请重试</div>
          <button
            className="audio-retry-btn"
            onClick={() => {
              setHasError(false)
              const a = audioRef.current
              if (a) { try { a.load(); if (autoplay) { a.muted = muted || autoplay; a.play().catch(() => {}) } } catch (_) {} }
            }}
          >重试</button>
        </div>
      )}

      {/* 标题与时间 */}
      {(title || true) && (
        <div className="audio-header">
          {title && <div className="audio-title" title={title}>{title}</div>}
          <div className="audio-time">
            <span>{formatTime(currentTime)}</span>
            <span className="audio-time-sep">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* 控制区：播放按钮 + 进度条 + 音量 在一行 */}
      <div className="audio-controls">
        <div className="audio-progress-rail audio-progress-rail-inline">
          <div className="audio-progress-buffered" style={{ width: `${bufferedPercent}%` }} />
          <div className="audio-progress-played" style={{ width: `${progressPercent}%` }} />
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={onRangeChange}
            onMouseDown={onRangeDown}
            onMouseUp={onRangeUp}
            onTouchStart={onRangeDown}
            onTouchEnd={onRangeUp}
            onKeyDown={onRangeKeyDown}
            className="audio-progress-slider"
            aria-label="Audio progress"
            aria-valuemin={0}
            aria-valuemax={Math.floor(duration) || 0}
            aria-valuenow={Math.floor(currentTime) || 0}
          />
        </div>
        <div className="audio-volume">
          <div className="audio-volume-pill">
            <select
              className="audio-volume-select"
              value={volumeLevel}
              onChange={(e) => {
                const lvl = parseInt(e.target.value, 10) || 10
                setVolumeLevel(lvl)
                const a = audioRef.current
                if (a) { a.muted = false; a.volume = Math.min(1, Math.max(0, lvl / 10)) }
              }}
              aria-label="Volume Level"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span className="audio-pill-caret">▾</span>
          </div>
        </div>
        <button className="audio-btn audio-cta" onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <span className="audio-ico-wrap">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="audio-ico"><rect x="6" y="6" width="4" height="12" rx="1" /><rect x="14" y="6" width="4" height="12" rx="1" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="audio-ico"><polygon points="8,6 18,12 8,18" /></svg>
            )}
          </span>
          <span className="audio-cta-text">{isPlaying ? '暂停' : '播放'}</span>
        </button>
      </div>
    </div>
  )
}

export default AudioPlayer
