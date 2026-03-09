import Layout from '@/components/Layout';

export default function AuthPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-md rounded-xl border border-gray-700 bg-panel p-6">
        <h1 className="text-2xl font-bold text-white">Connexion / inscription</h1>
        <p className="mt-2 text-sm text-gray-300">Nécessaire pour voter, commenter et ajouter des versions.</p>
        <form className="mt-4 grid gap-3">
          <input placeholder="Email" className="rounded border border-gray-600 bg-gray-900 px-3 py-2" />
          <input placeholder="Mot de passe" type="password" className="rounded border border-gray-600 bg-gray-900 px-3 py-2" />
          <button type="button" className="rounded bg-amber-500 px-4 py-2 font-semibold text-black">Se connecter</button>
        </form>
      </section>
    </Layout>
  );
}
