import { media } from './media.js'
import { useEffect, useRef } from 'react'
import { useMediaQuery } from './useMediaQuery.js'

function HeroBackground() {
  const enabled = useMediaQuery('(min-width: 936px) and (prefers-reduced-motion: no-preference)')
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    const onVisibilityChange = () => {
      if (document.hidden) video.pause()
      else if (video.getBoundingClientRect().bottom > 0) video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      video.pause()
    }
  }, [enabled])

  return (
    <div className="hero-video" aria-hidden="true">
      {enabled && (
        <video ref={videoRef} autoPlay loop muted playsInline preload="none" poster={media.heroPoster}>
          <source src={media.heroVideo} type="video/mp4" />
        </video>
      )}
    </div>
  )
}

export default HeroBackground
