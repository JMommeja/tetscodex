import { cache } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import { Album, Artist, Comment, Track, Version } from '@/lib/types';

export const getArtistBySlug = cache(async (slug: string): Promise<Artist | null> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('artists').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
});

export const getAlbumsByArtist = cache(async (artistId: number): Promise<Album[]> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('artist_id', artistId)
    .order('release_year', { ascending: true });
  if (error) throw error;
  return data ?? [];
});

export const getAlbumBySlug = cache(async (slug: string): Promise<Album | null> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('albums').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
});

export const getTracksByAlbum = cache(async (albumId: number): Promise<Track[]> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('album_id', albumId)
    .order('track_number', { ascending: true });
  if (error) throw error;
  return data ?? [];
});


export const getAlbumById = cache(async (id: number): Promise<Album | null> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('albums').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
});

export const getTrackBySlug = cache(async (slug: string): Promise<Track | null> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('tracks').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
});

export const getVersionsByTrack = cache(async (trackId: number): Promise<Array<Version & { vote_count: number; comment_count: number; tags: string[] }>> => {
  const supabase = getSupabaseClient();

  const { data: baseVersions, error } = await supabase
    .from('versions')
    .select('*')
    .eq('track_id', trackId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!baseVersions?.length) return [];

  const versionIds = baseVersions.map((v) => v.id);

  const [{ data: votes }, { data: comments }, { data: vt }] = await Promise.all([
    supabase.from('votes').select('version_id').in('version_id', versionIds),
    supabase.from('comments').select('version_id').in('version_id', versionIds),
    supabase
      .from('version_tags')
      .select('version_id, tags(name)')
      .in('version_id', versionIds)
  ]);

  const voteMap = new Map<number, number>();
  for (const row of votes ?? []) {
    voteMap.set(row.version_id, (voteMap.get(row.version_id) ?? 0) + 1);
  }

  const commentMap = new Map<number, number>();
  for (const row of comments ?? []) {
    commentMap.set(row.version_id, (commentMap.get(row.version_id) ?? 0) + 1);
  }

  const tagMap = new Map<number, string[]>();
  for (const row of vt ?? []) {
    const current = tagMap.get(row.version_id) ?? [];
    const name = (row.tags as { name?: string } | null)?.name;
    if (name) current.push(name);
    tagMap.set(row.version_id, current);
  }

  return baseVersions
    .map((v) => ({
      ...v,
      vote_count: voteMap.get(v.id) ?? 0,
      comment_count: commentMap.get(v.id) ?? 0,
      tags: tagMap.get(v.id) ?? []
    }))
    .sort((a, b) => b.vote_count - a.vote_count);
});

export const getVersionBySlug = cache(async (slug: string): Promise<(Version & { vote_count: number; tags: string[] }) | null> => {
  const supabase = getSupabaseClient();
  const { data: version, error } = await supabase.from('versions').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  if (!version) return null;

  const [{ count }, { data: vt }] = await Promise.all([
    supabase.from('votes').select('*', { count: 'exact', head: true }).eq('version_id', version.id),
    supabase.from('version_tags').select('tags(name)').eq('version_id', version.id)
  ]);

  return {
    ...version,
    vote_count: count ?? 0,
    tags: (vt ?? []).flatMap((row) => {
      const name = (row.tags as { name?: string } | null)?.name;
      return name ? [name] : [];
    })
  };
});

export const getCommentsByVersion = cache(async (versionId: number): Promise<Array<Comment & { username: string }>> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('comments')
    .select('id, version_id, user_id, content, created_at, users(username)')
    .eq('version_id', versionId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    version_id: row.version_id,
    user_id: row.user_id,
    content: row.content,
    created_at: row.created_at,
    username: (row.users as { username?: string } | null)?.username ?? 'user'
  }));
});

export const getHomeFeed = cache(async () => {
  const supabase = getSupabaseClient();

  const [{ data: albums }, { data: tracks }, { data: versions }] = await Promise.all([
    supabase.from('albums').select('*').order('release_year', { ascending: true }).limit(6),
    supabase.from('tracks').select('*').limit(8),
    supabase.from('versions').select('*').order('created_at', { ascending: false }).limit(12)
  ]);

  const versionIds = (versions ?? []).map((v) => v.id);
  const voteRows =
    versionIds.length > 0
      ? (await supabase.from('votes').select('version_id').in('version_id', versionIds)).data
      : [];

  const voteMap = new Map<number, number>();
  for (const row of voteRows ?? []) {
    voteMap.set(row.version_id, (voteMap.get(row.version_id) ?? 0) + 1);
  }

  const trending = (versions ?? [])
    .map((v) => ({ ...v, vote_count: voteMap.get(v.id) ?? 0 }))
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 5);

  return {
    albums: (albums ?? []) as Album[],
    tracks: (tracks ?? []) as Track[],
    trending,
    latest: (versions ?? []) as Version[]
  };
});

export const getArtistStats = cache(async (artistId: number) => {
  const supabase = getSupabaseClient();
  const { data: albums } = await supabase.from('albums').select('id').eq('artist_id', artistId);
  const albumIds = (albums ?? []).map((a) => a.id);

  if (!albumIds.length) return { tracksCount: 0, versionsCount: 0, commentsCount: 0 };

  const { data: tracks } = await supabase.from('tracks').select('id').in('album_id', albumIds);
  const trackIds = (tracks ?? []).map((t) => t.id);

  if (!trackIds.length) return { tracksCount: 0, versionsCount: 0, commentsCount: 0 };

  const { data: versions } = await supabase.from('versions').select('id').in('track_id', trackIds);
  const versionIds = (versions ?? []).map((v) => v.id);

  const commentsCount = versionIds.length
    ? (await supabase.from('comments').select('*', { count: 'exact', head: true }).in('version_id', versionIds)).count ?? 0
    : 0;

  return {
    tracksCount: trackIds.length,
    versionsCount: versionIds.length,
    commentsCount
  };
});

export const getAllTracks = cache(async (): Promise<Track[]> => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('tracks').select('*').order('title');
  if (error) throw error;
  return data ?? [];
});
