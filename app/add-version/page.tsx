import Layout from '@/components/Layout';
import { tracks, types } from '@/lib/data';

export default function AddVersionPage() {
  return (
    <Layout>
      <section className="rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-2xl font-bold text-white">Ajouter une version</h1>
        <p className="mt-2 text-gray-300">Formulaire V1: simple, rapide, sans upload audio local.</p>
        <form className="mt-4 grid gap-3">
          <select className="rounded border border-gray-600 bg-gray-900 px-3 py-2">
            {tracks.map((track) => <option key={track.id}>{track.title}</option>)}
          </select>
          <input placeholder="Titre (ex: I Wonder - Synthwave Edit)" className="rounded border border-gray-600 bg-gray-900 px-3 py-2" />
          <select className="rounded border border-gray-600 bg-gray-900 px-3 py-2">
            {types.map((type) => <option key={type}>{type}</option>)}
          </select>
          <input placeholder="Lien source (YouTube, SoundCloud...)" className="rounded border border-gray-600 bg-gray-900 px-3 py-2" />
          <input placeholder="Pseudo créateur" className="rounded border border-gray-600 bg-gray-900 px-3 py-2" />
          <input placeholder="Tags (max 5, séparés par virgules)" className="rounded border border-gray-600 bg-gray-900 px-3 py-2" />
          <textarea placeholder="Description courte" className="rounded border border-gray-600 bg-gray-900 px-3 py-2" rows={4} />
          <button type="button" className="rounded bg-amber-500 px-4 py-2 font-semibold text-black">Publier</button>
        </form>
      </section>
    </Layout>
  );
}
