export type VersionType =
  | 'Remix'
  | 'Edit'
  | 'Mashup'
  | 'Live'
  | 'Alt Version'
  | 'Reconstruction'
  | 'Leak Edit';

export type Artist = {
  id: number;
  name: string;
  slug: string;
};

export type Album = {
  id: number;
  artist_id: number;
  title: string;
  slug: string;
  cover_url: string | null;
  release_year: number | null;
};

export type Track = {
  id: number;
  album_id: number;
  title: string;
  slug: string;
  track_number: number | null;
  source_url: string | null;
};

export type Version = {
  id: number;
  track_id: number;
  user_id: number;
  title: string;
  slug: string;
  type: VersionType;
  source_url: string;
  creator_name: string;
  description: string | null;
  created_at: string;
};

export type Comment = {
  id: number;
  version_id: number;
  user_id: number;
  content: string;
  created_at: string;
};
