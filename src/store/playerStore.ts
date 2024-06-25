import { create } from "zustand";
import type { CurrentMusic } from "@/types"
interface PlayerStore {
  isPlaying: boolean
  currentMusic: CurrentMusic
  volume: number
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentMusic: (currentMusic: CurrentMusic) => void
  setVolume: (volume: number) => void
}

export const usePlayerStore = create<PlayerStore>() ((set) =>({
  isPlaying: false,
  currentMusic: {
    playlist: null,
    song: null,
    songs: []
  },
  volume: 0.5,
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
  setCurrentMusic: (currentMusic) => set(() => ({ currentMusic })),
  setVolume: (volume) => set(() => ({ volume }))
}))