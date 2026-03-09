import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      <header className="panel mb-8 flex flex-wrap items-center justify-between gap-3 p-4">
        <Link href="/" className="text-xl font-semibold text-white">
          Ye Alt Archive
        </Link>
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
