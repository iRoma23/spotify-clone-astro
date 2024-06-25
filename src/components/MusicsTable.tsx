import { usePlayerStore } from "@/store/playerStore"
import type { Song } from "@/lib/data"

import { Time } from "@/icons/ReactIcons"

interface MusicTableProps {
  songs: Song[]
}

interface MusicTableRowProps {
  song: Song
  index: number
}

const MusicTableRow = ({song, index}: MusicTableRowProps) => {
  const { currentMusic, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state)

  const titleColor = currentMusic.song?.id === song.id ? 'text-green-500' : 'text-white'
  const currentSongBg = currentMusic.song?.id === song.id ? 'bg-white/10' : ''

  const handleClick = () => {
    const {songs, playlist} = currentMusic
    const newSong = songs.find(s => s.id === song.id)

    if (newSong) {
      setIsPlaying(false)
      setCurrentMusic({songs, playlist, song: newSong})
      setIsPlaying(true)
    }
  }

  return (
    <tr
      key={song.id}
      onClick={handleClick}
      className={`text-gray-300 text-sm font-light hover:bg-white/10 transition duration-300 ${currentSongBg}`}>
      <td className="px-4 py-2 rounded-l-lg w-5">{index + 1}</td>
      <td className="px-4 py-2 flex gap-3">
        <picture>
          <img src={song.image} alt={song.title} className="w-10 h-10" />
        </picture>
        <div className="flex flex-col">
          <h3 className={`${titleColor} text-base font-normal`}>{song.title}</h3>
          <span>{song.artists.join(", ")}</span>
        </div>
      </td>
      <td className="px-4 py-2">{song.album}</td>
      <td className="px-4 py-2 rounded-r-lg">{song.duration}</td>
    </tr>
  )
}

function MusicsTable({ songs }: MusicTableProps) {
  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/30 border-separate border-spacing-y-1">
      <thead>
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Título</th>
          <th className="px-4 py-2 font-light">Álbum</th>
          <th className="px-4 py-2 font-light"><Time /> </th>
        </tr>
      </thead>
      <tbody>
      {
        songs.map((song, index) => (
          <MusicTableRow key={song.id} song={song} index={index} />
        ))
      }
      </tbody>
    </table>
  )
}

export default MusicsTable
