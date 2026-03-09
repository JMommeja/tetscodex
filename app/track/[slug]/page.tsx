import Layout from '@/components/Layout';
import Link from 'next/link';
import VersionCard from '@/components/VersionCard';
import { getAlbumById, getTrackBySlug, getVersionsByTrack } from '@/lib/queries';

export default async function TrackPage({ params }: { params: { slug: string } }) {
  const track = await getTrackBySlug(params.slug);
  if (!track) {
    return (
      <Layout>
        <p>Morceau introuvable.</p>
      </Layout>
    );
  }

  const trackVersions = await getVersionsByTrack(track.id);
  const album = track.album_id ? await getAlbumById(track.album_id) : null;

  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-3xl font-bold text-white">{track.title}</h1>
        <p className="mt-1 text-gray-300">Kanye West · {album?.title ?? 'Album inconnu'}</p>
        <div className="mt-3 text-sm text-gray-300">
          {track.source_url ? (
            <a href={track.source_url} target="_blank" rel="noreferrer">
              Voir l'original
            </a>
          ) : (
            <span>Source originale non renseignée</span>
          )}{' '}
          · {trackVersions.length} versions
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-gray-700 bg-panel p-4">
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-300">
          <span className="rounded-full border border-gray-600 px-2 py-1">Tri: Populaires</span>
          <span className="rounded-full border border-gray-600 px-2 py-1">Filtre type</span>
          <span className="rounded-full border border-gray-600 px-2 py-1">Filtre tag</span>
          <Link href="/add-version" className="rounded-full bg-amber-500 px-2 py-1 font-semibold text-black">
            Ajouter une version
          </Link>
        </div>
        <div className="space-y-4">
          {trackVersions.map((version) => (
            <VersionCard
              key={version.id}
              slug={version.slug}
              title={version.title}
              type={version.type}
              creatorName={version.creator_name}
              sourceUrl={version.source_url}
              description={version.description}
              tags={version.tags}
              score={version.vote_count}
              comments={version.comment_count}
              createdAt={version.created_at}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
