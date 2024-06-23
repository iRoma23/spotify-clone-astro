import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef, useState } from "react"
import { Slider } from "./Slider"

import { formatTime } from "@/utils"

export const Pause = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)

export const Play = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
)

const Prev = () => (
  <svg fill="currentColor" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z">
    </path>
  </svg>
)

const Next = () => (
  <svg fill="currentColor" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z">
    </path>
  </svg>
)

const HighVolume = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="High volume" id="volume-icon" viewBox="0 0 16 16">
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z">
    </path>
  </svg>
)

const MediumVolume = () => (
  <svg fill="currentColor" height="16" width="16" aria-hidden="true" aria-label="Medium volume" viewBox="0 0 16 16" >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z">
    </path>
  </svg>
)

const LowVolume = () => (
  <svg fill="currentColor" height="16" width="16" aria-hidden="true" aria-label="Low volume" viewBox="0 0 16 16">
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z">
    </path>
  </svg>
)

const Mute = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Mute" viewBox="0 0 16 16" >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z">
    </path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z">
    </path>
  </svg>
) 

const CurrentSong = ({image, title, artists}) => {
  return (
    <div className="flex imtes-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>

    <div className="flex flex-col">
      <h3 className="font-semibold text-sm block">
        {title}
      </h3>
      <span className="text-sm opacity-80">
        {artists?.join(', ')}
      </span>
    </div>
    </div>
  )
}

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const handleTimeUpdate = () => {
    console.log('dentro del handleTimeUpdate')
    setCurrentTime(audio.current.currentTime)
  }

  const duration = audio?.current?.duration ?? 0

  // console.log('currentTime: ', currentTime)

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
          // console.log('Slider - value[0]: ', value[0])
          // audio.current.currentTime= value[0]
          const [newCurrentTime] = value
          audio.current.currentTime = newCurrentTime
          console.log('Slider - value[0]: ', newCurrentTime)
          console.log('Slider - audio.current.currentTime: ', audio.current.currentTime)
        }}
      />

      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}

const VolumeControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previousVolumeRef = useRef(volume)

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

export function Player () {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic ,volume } = usePlayerStore(state => state)
  const audioRef = useRef(null)

  useEffect(()=> {
    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const {song, playlist, songs} = currentMusic
    
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volume
      audioRef.current.play()
    }
  }, [currentMusic])

  const handleClick = () => {
    if (currentMusic.song) setIsPlaying(!isPlaying)
  }

  const handleNextSong = () => {
    const {songs, playlist, song} = currentMusic
    const indexSong = currentMusic.songs.findIndex(s => s.id === song.id) ?? -1

    if (indexSong > -1) {
      setIsPlaying(false)

      if (indexSong === (currentMusic.songs.length - 1)) {
        setCurrentMusic({ songs, playlist, song: songs[0] })
      } else {
        setCurrentMusic({ songs, playlist, song: songs[indexSong + 1] })
      }

      setIsPlaying(true)
    }
  }

  const handlePrevSong = () => {
    const {songs, playlist, song} = currentMusic
    const indexSong = currentMusic.songs.findIndex(s => s.id === song.id) ?? -1

    if (indexSong > -1) {
      setIsPlaying(false)

      if (indexSong === 0) {
        setCurrentMusic({ songs, playlist, song: songs[currentMusic.songs.length - 1] })
      } else {
        setCurrentMusic({ songs, playlist, song: songs[indexSong - 1] })
      }

      setIsPlaying(true)
    }
  }

  console.log(audioRef)

  return (
    <div
      className="fixed h-20 bottom-0 left-2 right-2 z-10 bg-[#010101] flex items-center"
      style={{viewTransitionName: 'media-player'}}
    >
      <div
        className="flex flex-row justify-between w-full px-1"
      >
        <section className="w-[200px]">
          <CurrentSong {...currentMusic.song} />
        </section>

        <section className="grid place-content-center gap-4 flex-1">
          <div className="flex justify-center flex-col items-center">
            <div className="flex gap-4">
              <button onClick={handlePrevSong}>
                <Prev />
              </button>
              <button className="bg-white rounded-full p-2" onClick={handleClick}>
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <button onClick={handleNextSong}>
                <Next />
              </button>
            </div>

            <SongControl audio={audioRef} />

            <audio ref={audioRef} />
          </div>
        </section>

        <section className="grid place-content-center">
          <VolumeControl />
        </section>
      </div>
    </div>
  )
}