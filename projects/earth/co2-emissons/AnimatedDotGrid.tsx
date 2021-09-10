import Konva from "konva"
import { stages } from "konva/lib/Stage"
import { useEffect, useRef, useState } from "react"
import { Layer, Stage } from "react-konva"

const AnimatedDotGrid = ({ num, fill }) => {
  const layerRef = useRef<Konva.Layer>()
  const wh = Math.ceil(Math.sqrt(num))
  const dotsRef = useRef([])

  const canvasSize = wh * 8 + 8

  useEffect(() => {
    const animInterval = setInterval(() => {
      const i = dotsRef.current.length

      const col = Math.floor(i / wh + 1)
      const targetX = (col % 2) ? (i % wh + 1) * 8 : canvasSize - (i % wh + 1) * 8
      const targetY = col * 8

      const circle = new Konva.Circle({
        x: targetX,
        y: targetY + 100,
        radius: 2,
        fill,
        opacity: 0
      })

      const tween = new Konva.Tween({
        node: circle,
        duration: 1,
        x: targetX,
        y: targetY,
        opacity: 1,
        easing: Konva.Easings.StrongEaseOut
      })
  
      layerRef.current.add(circle)
      tween.play()

      dotsRef.current.push({})
    }, 5)

    return () => {
      clearInterval(animInterval)
    }
  }, []) 

  return <Stage width={canvasSize} height={canvasSize} >
    <Layer ref={layerRef}>
      {/* {dots.map((_, i) => (
          <Circle x={(i % wh + 1) * 8} y={Math.floor(i / wh + 1) * 8} key={i} width={4} height={4} fill="blue" />
        ))} */}
    </Layer>
  </Stage>
}

export default AnimatedDotGrid
