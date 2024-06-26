import { useState, useEffect } from "react"

import { formatTime } from "@/utils"

import { Slider } from "./Slider"

interface Props {
  audio: React.RefObject<HTMLAudioElement>
}

const SongControl = ({ audio }: Props) => {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (audio.current) audio.current.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      if (audio.current) audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handleTimeUpdate = () => {
    if (audio.current) {
      setCurrentTime(audio.current.currentTime)
    }
  }

  const duration = audio?.current?.duration ?? 0

  return (
    <div className="flex gap-x-2 text-xs mt-2">
      <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>

      <Slider
        defaultValue={[0]}
        value={[currentTime]}
        max={duration}
        min={0}
        className="w-[25rem]"
        onValueChange={value => {
          const [newCurrentTime] = value
          if (audio.current) {
            audio.current.currentTime = newCurrentTime
          }
        }}
      />

      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}

export default SongControl