import Layout from '@/components/Layout';
import Link from 'next/link';
import { getAlbumBySlug, getTracksByAlbum, getVersionsByTrack } from '@/lib/queries';

export default async function AlbumPage({ params }: { params: { slug: string } }) {
  const album = await getAlbumBySlug(params.slug);
  if (!album) {
    return (
      <Layout>
        <p>Album introuvable.</p>
      </Layout>
    );
  }

  const albumTracks = await getTracksByAlbum(album.id);
  const trackRows = await Promise.all(
    albumTracks.map(async (track) => {
      const trackVersions = await getVersionsByTrack(track.id);
      return {
        track,
        versionsCount: trackVersions.length,
        commentsCount: trackVersions.reduce((acc, v) => acc + v.comment_count, 0),
        score: trackVersions.reduce((acc, v) => acc + v.vote_count, 0)
      };
    })
  );

  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-2xl font-bold text-white">{album.title}</h1>
        <p className="text-gray-300">{album.release_year ?? 'N/A'}</p>
      </section>
      <section className="mt-6 rounded-xl border border-gray-700 bg-panel p-4">
        <h2 className="text-lg font-semibold text-white">Tracklist</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {trackRows.map(({ track, versionsCount, commentsCount, score }) => (
            <li key={track.id} className="rounded-md bg-gray-800 p-3">
              <Link href={`/track/${track.slug}`}>
                {track.track_number}. {track.title}
              </Link>
              <div className="mt-1 text-gray-300">
                {versionsCount} versions · {commentsCount} commentaires · score {score}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
