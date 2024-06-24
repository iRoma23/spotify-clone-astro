import { usePlayerStore } from "@/store/playerStore"

const Time = () => (
  <svg
  role="img"
  height="16"
  width="16"
  aria-hidden="true"
  viewBox="0 0 16 16"
  fill="currentColor"
  >
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
  </svg>
)

const MusicTableRow = ({song, index}) => {
  const { currentMusic } = usePlayerStore(state => state)

  const titleColor = currentMusic.song?.id === song.id ? 'text-green-500' : 'text-white'

  return (
    <tr key={song.id} className="text-gray-300 text-sm font-light hover:bg-white/10 transition duration-300">
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

function MusicsTable({ songs }) {
  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/30">
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
