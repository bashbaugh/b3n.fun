import { useEffect, useRef, useState } from 'react'
import Paper from 'paper'
import { randomInt } from 'lib/random'
import Link from 'next/link'
import Meta from 'components/Meta'

const tool = new Paper.Tool()

const DROP_WIDTH = 3
const DROP_INITIAL_HEIGHT = 25
const DROP_FINAL_HEIGHT = 35
const SPAWN_RATE_COEFF = 30000
const INITIAL_VELOCITY = 10
// Rain obviously actually falls at terminal velocity by the time it reaches earth but it's fun to have a bit of gravity
const GRAVITY = 2

// TODO CLEANUP OLD DROPS
class Drop {
  path: paper.Path.Rectangle

  velocity: number = INITIAL_VELOCITY

  public canDestroy

  constructor() {
    this.path = new Paper.Path.Rectangle({
      x: randomInt(0, window.innerWidth),
      y: -100,
      width: DROP_WIDTH,
      height: DROP_INITIAL_HEIGHT,
      fillColor: '#4444ff',
    })
  }

  update(delta: number) {
    this.velocity += (GRAVITY / 2) * delta
    this.path.position.y += this.velocity

    const windowProgress = Math.max(
      0,
      this.path.position.y / window.innerHeight
    )

    const dropBottomPos =
      this.path.position.y +
      DROP_INITIAL_HEIGHT +
      (DROP_FINAL_HEIGHT - DROP_INITIAL_HEIGHT) * windowProgress ** 2

    this.path.segments[0].point.y = dropBottomPos // Lower left
    this.path.segments[3].point.y = dropBottomPos // Lower right

    if (this.path.position.y > window.innerHeight) {
      this.path.remove()
      this.canDestroy = true
    }
  }
}

function draw() {
  const drops: Drop[] = []

  const spawnInterval = setInterval(() => {
    drops.push(new Drop())
  }, SPAWN_RATE_COEFF / window.innerWidth)

  Paper.view.onFrame = (e) => {
    for (const [i, drop] of drops.entries()) {
      drop.update(e.delta)
      if (drop.canDestroy) drops.splice(i, 1)
    }
  }
}

const Rain: React.FC = () => {
  const ref = useRef()
  const [started, setStarted] = useState(true)

  useEffect(() => {
    if (started) {
      Paper.setup(ref.current)

      draw()

      const rainSound = new Audio('/media/rain_on_glass_loop1.mp3')
      rainSound.addEventListener(
        'ended',
        () => {
          rainSound.currentTime = 0
          rainSound.play()
        },
        false
      )

      try {
        rainSound.play()
        rainSound.volume = 1
      } catch {}

      if (rainSound.paused) setStarted(false)

      return () => {
        Paper.view.remove()
        rainSound.pause()
      }
    }
  }, [started])

  return (
    <div className="bg-[#000080] w-full h-screen">
      <Meta title='Rain' description="Who doesn't love the rain?" />
      {!started && (
        <div
          onClick={() => setStarted(true)}
          className="flex w-full h-full items-center justify-center"
        >
          <p className="text-white opacity-80 text-2xl">Click anywhere</p>
        </div>
      )}
      {started && <canvas className="w-screen h-screen" ref={ref} />}
      <Link href="/">
        <a className="p-3 absolute top-0 left-0 text-white opacity-60 text-lg hover:scale-125 transition-all origin-top-left">
          b3n.fun
        </a>
      </Link>

      <div className="p-3 absolute left-0 bottom-0 text-white opacity-50 hover:opacity-80 group text-[0.5rem] hover:scale-[200%] transition-all origin-bottom-left">
        credits
        <div className="h-0 group-hover:h-full overflow-hidden">
          <p>Sounds: zapsplat.com</p>
          <p>Made by Benjamin Ashbaugh</p>
        </div>
      </div>
    </div>
  )
}

export default Rain
