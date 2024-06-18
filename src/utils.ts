export const formatTime = (time: number): string => {
  if (time == null) return '0:00'

  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time % 3600 / 60)

  if(time < 3600) return `${minutes}:${seconds.toString().padStart(2, '0')}`

  const hours = Math.floor(time/3600)
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
