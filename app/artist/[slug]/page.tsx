import Layout from '@/components/Layout';
import Link from 'next/link';
import { getAlbumsByArtist, getArtistBySlug, getArtistStats } from '@/lib/queries';

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await getArtistBySlug(params.slug);

  if (!artist) {
    return (
      <Layout>
        <p>Artiste introuvable.</p>
      </Layout>
    );
  }

  const [albums, stats] = await Promise.all([getAlbumsByArtist(artist.id), getArtistStats(artist.id)]);

  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-3xl font-bold text-white">{artist.name}</h1>
        <p className="mt-2 text-gray-300">Point d'entrée pour explorer la discographie et les versions communautaires.</p>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-md bg-gray-800 p-3">{stats.tracksCount} tracks</div>
          <div className="rounded-md bg-gray-800 p-3">{stats.versionsCount} versions ajoutées</div>
          <div className="rounded-md bg-gray-800 p-3">{stats.commentsCount} commentaires</div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-gray-700 bg-panel p-4">
        <h2 className="text-xl font-semibold text-white">Albums</h2>
        <ul className="mt-3 space-y-2">
          {albums.map((a) => (
            <li key={a.id}>
              <Link href={`/album/${a.slug}`}>{a.title}</Link> ({a.release_year ?? 'N/A'})
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
