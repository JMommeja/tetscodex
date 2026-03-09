import Layout from '@/components/Layout';
import { getAllTracks } from '@/lib/queries';
import { VersionType } from '@/lib/types';

const versionTypes: VersionType[] = ['Remix', 'Edit', 'Mashup', 'Live', 'Alt Version', 'Reconstruction', 'Leak Edit'];

export default async function AddVersionPage() {
  const tracks = await getAllTracks();

  return (
    <Layout>
      <section className="panel-lg">
        <h1 className="text-2xl font-bold text-white">Ajouter une version</h1>
        <p className="mt-2 text-gray-300">Formulaire V1: simple, rapide, sans upload audio local.</p>
        <form className="mt-4 grid gap-3">
          <select className="input-base">
            {tracks.map((track) => (
              <option key={track.id}>{track.title}</option>
            ))}
          </select>
          <input
            placeholder="Titre (ex: I Wonder - Synthwave Edit)"
            className="input-base"
          />
          <select className="input-base">
            {versionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <input
            placeholder="Lien source (YouTube, SoundCloud...)"
            className="input-base"
          />
          <input placeholder="Pseudo créateur" className="input-base" />
          <input
            placeholder="Tags (max 5, séparés par virgules)"
            className="input-base"
          />
          <textarea placeholder="Description courte" className="input-base" rows={4} />
          <button type="button" className="btn-primary">
            Publier
          </button>
        </form>
      </section>
    </Layout>
  );
}
