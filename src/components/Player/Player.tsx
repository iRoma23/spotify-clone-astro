import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef } from "react"

import CurrentSong from "./CurrentSong"
import SongControl from "./SongControl"
import VolumeControl from "./VolumeControl"

import { Play, Pause, Prev, Next } from "@/icons/ReactIcons"

export function Player () {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic ,volume } = usePlayerStore(state => state)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(()=> {
    if (audioRef.current) {
      isPlaying
        ? audioRef.current.play()
        : audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const {song, playlist} = currentMusic
    
    if (song && audioRef.current) {
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
    const indexSong = currentMusic.songs.findIndex(s => s.id === song?.id) ?? -1

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
    const indexSong = currentMusic.songs.findIndex(s => s.id === song?.id) ?? -1

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

  return (
    <div
      className="fixed h-20 bottom-0 left-2 right-2 z-10 bg-[#010101] flex items-center"
      style={{viewTransitionName: 'media-player'}}
    >
      <div
        className="flex flex-row justify-between w-full px-1"
      >
        <section className="basis-[21.375rem]">
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

        <section className="basis-[21.375rem] flex items-center justify-end">
          <VolumeControl />
        </section>
      </div>
    </div>
  )
}