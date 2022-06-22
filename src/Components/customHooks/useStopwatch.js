import { useState, useRef, useEffect } from "react"

function useStopwatch() {

    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [processedTimer, setProcessedTimer] = useState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0
    })
    const countRef = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(false)
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  useEffect(() => {
    let auxTimer = timer  
    setProcessedTimer({
        minutes: Math.trunc(auxTimer / 60),
        seconds: auxTimer % 60,
    })
  }, [timer])

  return [processedTimer, handleStart, handlePause, handleReset]
}

export default useStopwatch
