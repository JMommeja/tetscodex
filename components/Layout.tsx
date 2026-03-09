import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-700 bg-panel p-4">
        <Link href="/" className="text-xl font-semibold text-white">Ye Alt Archive</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/artist/kanye-west">Artiste</Link>
          <Link href="/add-version">Ajouter une version</Link>
          <Link href="/auth">Connexion</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
