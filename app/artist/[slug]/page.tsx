import Layout from '@/components/Layout';
import Link from 'next/link';
import { albums, artist, tracks, versions } from '@/lib/data';

export default function ArtistPage() {
  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-3xl font-bold text-white">{artist.name}</h1>
        <p className="mt-2 text-gray-300">{artist.banner}</p>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-md bg-gray-800 p-3">{tracks.length} tracks</div>
          <div className="rounded-md bg-gray-800 p-3">{versions.length} versions ajoutées</div>
          <div className="rounded-md bg-gray-800 p-3">{versions.reduce((acc, v) => acc + v.comments, 0)} commentaires</div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-gray-700 bg-panel p-4">
        <h2 className="text-xl font-semibold text-white">Albums</h2>
        <ul className="mt-3 space-y-2">
          {albums.map((a) => (
            <li key={a.id}><Link href={`/album/${a.slug}`}>{a.title}</Link> ({a.releaseYear})</li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
