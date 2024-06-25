import type { Playlist, Song } from "@/lib/data";

export interface CurrentMusic {
    playlist: Playlist[] | null,
    song: Song | null,
    songs: Song[]
}