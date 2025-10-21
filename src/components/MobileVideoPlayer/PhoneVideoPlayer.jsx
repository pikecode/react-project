import React from 'react'
import { PhoneFrame } from '../PhoneFrame/PhoneFrame'
import { VideoPlayer } from '../VideoPlayers/VideoPlayer'
import './PhoneVideoPlayer.css'

/**
 * PhoneVideoPlayer Component
 *
 * A complete mobile video player solution that combines PhoneFrame and VideoPlayer.
 * Displays video content within a realistic iPhone frame mockup.
 *
 * @param {Object} props - All VideoPlayer props plus additional options
 * @param {string} props.src - Video source URL (required)
 * @param {string} props.poster - Poster image URL
 * @param {string} props.subtitle - Subtitle or overlay text
 * @param {string} props.title - Video title
 * @param {function} props.onPlay - Callback when video plays
 * @param {function} props.onPause - Callback when video pauses
 * @param {function} props.onEnded - Callback when video ends
 * @param {boolean} props.autoplay - Auto play on mount (default: false)
 * @param {boolean} props.showControls - Show play/pause button (default: true)
 * @param {boolean} props.loop - Loop video playback (default: false)
 * @param {string} props.variant - Phone model: 'iphone14' (default)
 * @param {string} props.className - Additional CSS classes for wrapper
 *
 * @example
 * <PhoneVideoPlayer
 *   src="/music.mp4"
 *   subtitle="她前夫要是看到这个场景"
 *   title="Scene Description"
 * />
 */
export function PhoneVideoPlayer({
  src,
  poster,
  subtitle,
  title,
  onPlay,
  onPause,
  onEnded,
  autoplay = false,
  showControls = true,
  loop = false,
  variant = 'iphone14',
  className = '',
}) {
  return (
    <div className={`phone-video-player ${className}`}>
      <PhoneFrame variant={variant}>
        <div className="phone-video-inner">
          <VideoPlayer
            src={src}
            poster={poster}
            subtitle={subtitle}
            title={title}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            autoplay={autoplay}
            showControls={showControls}
            loop={loop}
            className="phone-video-player-core"
          />
          <div className="phone-video-bottom-bar" aria-hidden="true">
            <span className="phone-video-bottom-label active">叙梦</span>
            <span className="phone-video-bottom-label">我的</span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}

export default PhoneVideoPlayer
