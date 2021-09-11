import Konva from 'konva'
import { stages } from 'konva/lib/Stage'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Layer, Stage } from 'react-konva'

const AnimatedDotGrid = ({
  num,
  fill,
  animated = false,
  animateLines = false,
  simpleAnim = false,
}) => {
  const { inView, ref } = useInView({
    threshold: 0.05,
  })
  const [rendered, setRendered] = useState(false)
  const layerRef = useRef<Konva.Layer>()
  const wh = Math.ceil(Math.sqrt(num))
  const dotsRef = useRef([])

  const canvasSize = wh * 8 + 8

  useEffect(() => {
    if (inView) setRendered(true)
  }, [inView])

  const addDot = () => {
    for (let row = 0; row < (animateLines ? wh : 1); row++) {
      const dotInd = dotsRef.current.length

      if (dotInd === num) return true // end loop when the right number of dots is added

      const col = Math.floor(dotInd / wh) + 1
      const targetX =
        col % 2 ? ((dotInd % wh) + 1) * 8 : canvasSize - ((dotInd % wh) + 1) * 8
      const targetY = col * 8

      const initial = {
        x: targetX,
        y: targetY + 100,
        radius: 2,
        fill,
        opacity: 0,
      }

      const target = {
        x: targetX,
        y: targetY,
        opacity: 1,
      }

      const circle = new Konva.Circle(
        Object.assign(initial, animated ? {} : target)
      )
      layerRef.current.add(circle)

      if (animated) {
        const tween = new Konva.Tween({
          node: circle,
          duration: 1,
          easing: Konva.Easings.StrongEaseOut,
          ...target,
        })
        tween.play()
      }

      dotsRef.current.push({})
    }
  }

  useEffect(() => {
    if (!rendered) return
    if (animated || simpleAnim) {
      const animInterval = setInterval(
        () => {
          if (addDot()) clearInterval(animInterval)
        },
        animateLines ? 50 : 10
      )

      return () => {
        clearInterval(animInterval)
      }
    } else {
      let adding = true
      while (adding) {
        if (addDot()) adding = false
      }
    }
  }, [rendered])

  return (
    <div ref={ref as any}>
      <Stage width={canvasSize} height={canvasSize}>
        <Layer ref={layerRef}>
          {/* {dots.map((_, i) => (
          <Circle x={(i % wh + 1) * 8} y={Math.floor(i / wh + 1) * 8} key={i} width={4} height={4} fill="blue" />
        ))} */}
        </Layer>
      </Stage>
    </div>
  )
}

export default AnimatedDotGrid
