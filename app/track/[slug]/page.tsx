import Layout from '@/components/Layout';
import Link from 'next/link';
import VersionCard from '@/components/VersionCard';
import { albums, artist, tracks, versions } from '@/lib/data';

export default function TrackPage({ params }: { params: { slug: string } }) {
  const track = tracks.find((t) => t.slug === params.slug);
  if (!track) return <Layout><p>Morceau introuvable.</p></Layout>;

  const album = albums.find((a) => a.id === track.albumId);
  const trackVersions = versions.filter((v) => v.trackId === track.id).sort((a, b) => b.score - a.score);

  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-3xl font-bold text-white">{track.title}</h1>
        <p className="mt-1 text-gray-300">{artist.name} · {album?.title}</p>
        <div className="mt-3 text-sm text-gray-300">
          <a href={track.sourceUrl} target="_blank" rel="noreferrer">Voir l'original</a> · {trackVersions.length} versions
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-gray-700 bg-panel p-4">
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-300">
          <span className="rounded-full border border-gray-600 px-2 py-1">Tri: Populaires</span>
          <span className="rounded-full border border-gray-600 px-2 py-1">Filtre type</span>
          <span className="rounded-full border border-gray-600 px-2 py-1">Filtre tag</span>
          <Link href="/add-version" className="rounded-full bg-amber-500 px-2 py-1 font-semibold text-black">Ajouter une version</Link>
        </div>
        <div className="space-y-4">
          {trackVersions.map((version) => (
            <VersionCard key={version.id} {...version} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
