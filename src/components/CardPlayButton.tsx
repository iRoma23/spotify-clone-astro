import { Play, Pause } from "@/icons/ReactIcons";
import { usePlayerStore } from "@/store/playerStore";

interface Props {
  id?: string,
  size?: 'small' | 'large'
}

export function CardPlayButton ({id, size = 'small'}: Props) {
  const {
    isPlaying,
    currentMusic,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)
  
  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    if (currentMusic.song?.albumId.toString() === id) {
      setIsPlaying(true)
    } else {
      fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res => res.json())
        .then(data => {
          const { songs , playlist } = data
          setIsPlaying(true)
          setCurrentMusic({ songs, playlist, song: songs[0] })
        })
    }
  }

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6'

  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  )
}