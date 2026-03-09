import Layout from '@/components/Layout';
import { tracks, versionComments, versions } from '@/lib/data';

export default function VersionPage({ params }: { params: { slug: string } }) {
  const version = versions.find((v) => v.slug === params.slug);
  if (!version) return <Layout><p>Version introuvable.</p></Layout>;

  const track = tracks.find((t) => t.id === version.trackId);
  const comments = versionComments.filter((c) => c.versionId === version.id);

  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-2xl font-bold text-white">{version.title}</h1>
        <p className="mt-1 text-gray-300">Morceau d'origine: {track?.title} · Type: {version.type}</p>
        <p className="mt-2 text-gray-200">{version.description}</p>
        <div className="mt-3 flex gap-3 text-sm">
          <a href={version.sourceUrl} target="_blank" rel="noreferrer">Ouvrir la source</a>
          <button className="rounded border border-red-400 px-2 py-1 text-red-300">Signaler lien mort</button>
        </div>
        <div className="mt-3 text-sm">▲ {version.score}</div>
      </section>

      <section className="mt-6 rounded-xl border border-gray-700 bg-panel p-4">
        <h2 className="text-lg font-semibold text-white">Commentaires</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-md bg-gray-800 p-3">
              <p className="font-medium">{comment.username}</p>
              <p className="text-gray-200">{comment.content}</p>
              <p className="text-xs text-gray-400">{comment.createdAt}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
