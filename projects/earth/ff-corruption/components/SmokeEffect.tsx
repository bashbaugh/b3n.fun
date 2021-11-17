import { useEffect, useRef } from 'react'
import SmokeMachine from '../lib/SmokeMachine'

const SmokeEffect = () => {
  const smokeCanvas = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const el = smokeCanvas.current
    const ctx = el.getContext('2d')

    el.width = el.offsetWidth
    el.height = el.offsetHeight

    const smoke = SmokeMachine(ctx)
    smoke.start()
    setTimeout(() => {
      smoke.addSmoke(window.innerWidth / 4, window.innerHeight, 25)
      smoke.addSmoke(window.innerWidth / 2, window.innerHeight, 25)
      smoke.addSmoke((3 * window.innerWidth) / 4, window.innerHeight, 25)
    })

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
    <canvas
      ref={smokeCanvas}
      className="absolute w-full h-[200%] left-0 top-0 "
    />
  )
}

export default SmokeEffect
