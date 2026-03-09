import Layout from '@/components/Layout';
import Link from 'next/link';
import { albums, tracks, versions } from '@/lib/data';

export default function AlbumPage({ params }: { params: { slug: string } }) {
  const album = albums.find((a) => a.slug === params.slug);
  if (!album) return <Layout><p>Album introuvable.</p></Layout>;

  const albumTracks = tracks.filter((t) => t.albumId === album.id);

  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-2xl font-bold text-white">{album.title}</h1>
        <p className="text-gray-300">{album.releaseYear}</p>
      </section>
      <section className="mt-6 rounded-xl border border-gray-700 bg-panel p-4">
        <h2 className="text-lg font-semibold text-white">Tracklist</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {albumTracks.map((track) => {
            const trackVersions = versions.filter((v) => v.trackId === track.id);
            return (
              <li key={track.id} className="rounded-md bg-gray-800 p-3">
                <Link href={`/track/${track.slug}`}>{track.trackNumber}. {track.title}</Link>
                <div className="mt-1 text-gray-300">{trackVersions.length} versions · {trackVersions.reduce((acc, v) => acc + v.comments, 0)} commentaires · score {trackVersions.reduce((acc, v) => acc + v.score, 0)}</div>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
