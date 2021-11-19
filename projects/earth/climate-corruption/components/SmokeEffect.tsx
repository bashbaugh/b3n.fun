import { useEffect, useRef } from 'react'
import SmokeMachine from '../../lib/SmokeMachine'

const SmokeEffect = () => {
  const smokeCanvas = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const el = smokeCanvas.current
    const ctx = el.getContext('2d')

    el.width = window.innerWidth
    el.height = el.offsetHeight

    const smoke = SmokeMachine(ctx)
    smoke.start()
    const initialSmoke = (offset = 0) => {
      const h = window.innerHeight + 100
      smoke.addSmoke(window.innerWidth / 4 + offset, h, 25)
      smoke.addSmoke(window.innerWidth / 2 + offset, h, 25)
      smoke.addSmoke((3 * window.innerWidth) / 4 + offset, h, 25)
      smoke.addSmoke(window.innerWidth + offset, h, 50)
      smoke.addSmoke(0, h, 50)
    }
    setTimeout(initialSmoke)
    setTimeout(() => initialSmoke(200), 500)
    setTimeout(() => initialSmoke(100), 2000)
    setTimeout(() => initialSmoke(50), 3000)

    let lastTriggeredSmoke: number = Date.now()

    const mListener = (e) => {
      if (Date.now() - lastTriggeredSmoke > 50) {
        lastTriggeredSmoke = Date.now()
        smoke.addSmoke(e.offsetX, e.offsetY, 5)
      }
    }

    document.addEventListener('mousemove', mListener)
    return () => {
      document.removeEventListener('mousemove', mListener)
      smoke.stop()
    }
  }, [])

  return (
    <canvas ref={smokeCanvas} className="absolute w-full h-[200vh] top-11" />
  )
}

export default SmokeEffect
