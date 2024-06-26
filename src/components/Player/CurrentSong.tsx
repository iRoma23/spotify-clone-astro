import type { Song } from "@/lib/data"

interface Props {
  image?: Song['image']
  title?: Song['title']
  artists?: Song['artists']
}

const CurrentSong = ({ image, title, artists }: Props) => {
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

export default CurrentSong