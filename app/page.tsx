import Link from 'next/link';
import Layout from '@/components/Layout';
import { getHomeFeed } from '@/lib/queries';

export default async function HomePage() {
  const { albums, tracks, trending, latest } = await getHomeFeed();

  return (
    <Layout>
      <section className="mb-8 rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-2xl font-bold text-white">Archive communautaire des versions alternatives Kanye West</h1>
        <p className="mt-2 max-w-3xl text-gray-300">
          Retrouve facilement les meilleurs remixes, edits et mashups classés par album puis par morceau.
        </p>
        <div className="mt-4 flex gap-3">
          <input
            placeholder="Rechercher un morceau, album, tag..."
            className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm"
          />
          <Link href="/add-version" className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-black">
            Ajouter une version
          </Link>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-gray-700 bg-panel p-4">
          <h2 className="mb-3 text-lg font-semibold text-white">Top communauté</h2>
          <ul className="space-y-2 text-sm">
            {trending.map((v) => (
              <li key={v.id}>
                <Link href={`/version/${v.slug}`}>{v.title}</Link> · ▲ {v.vote_count}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-700 bg-panel p-4">
          <h2 className="mb-3 text-lg font-semibold text-white">Explorer par album</h2>
          <ul className="space-y-2 text-sm">
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/album/${album.slug}`}>{album.title}</Link> ({album.release_year ?? 'N/A'})
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-700 bg-panel p-4">
          <h2 className="mb-3 text-lg font-semibold text-white">Morceaux tendance</h2>
          <ul className="space-y-2 text-sm">
            {tracks.map((t) => (
              <li key={t.id} className="rounded-md bg-gray-800 p-2">
                <Link href={`/track/${t.slug}`}>{t.title}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-700 bg-panel p-4">
          <h2 className="mb-3 text-lg font-semibold text-white">Derniers ajouts</h2>
          <ul className="space-y-2 text-sm">
            {latest.slice(0, 5).map((v) => (
              <li key={v.id}>
                <Link href={`/version/${v.slug}`}>{v.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
