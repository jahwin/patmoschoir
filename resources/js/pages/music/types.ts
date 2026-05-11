export interface MusicItem {
  id: number;
  image: string | null;
  link: string | null;
  created_at: string;
  updated_at: string;
}

export interface VideoItem {
  id: number;
  image: string | null;
  youtube_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface MusicPageProps {
  music: MusicItem[];
  videos: VideoItem[];
}
