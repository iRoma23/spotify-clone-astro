import { useRef } from "react"
import { usePlayerStore } from "@/store/playerStore"

import { Mute, LowVolume, MediumVolume, HighVolume } from "@/icons/ReactIcons"
import { Slider } from "./Slider"

const VolumeControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previousVolumeRef = useRef<number>(volume)

  const isVolumeSilenced = volume === 0

  const handleClickVolume = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current)
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
    }
  }

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolume}>
        {volume <= 0 ? <Mute />
          : volume <= 0.33 ? <LowVolume />
          : volume <= 0.66 ? <MediumVolume />
          : <HighVolume />
        }
      </button>
      <Slider
        // defaultValue={[100]}
        value={[volume*100]}
        max={100}
        min={0}
        className="w-24"
        onValueChange={value => {
          const newVolume = value[0]/100
          setVolume(newVolume)
        }}
      />
    </div>
  )
}

export default VolumeControl