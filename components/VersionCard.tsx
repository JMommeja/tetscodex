import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  type: string;
  creatorName: string;
  sourceUrl: string;
  description: string | null;
  tags: string[];
  score: number;
  comments: number;
  createdAt: string;
};

export default function VersionCard(props: Props) {
  return (
    <article className="rounded-lg border border-gray-700 bg-panel p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">
            <Link href={`/version/${props.slug}`}>{props.title}</Link>
          </h3>
          <p className="text-sm text-gray-300">
            {props.type} · par {props.creatorName} · {new Date(props.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
        <div className="rounded-md bg-gray-800 px-3 py-1 text-sm">▲ {props.score}</div>
      </div>
      <p className="mt-2 text-sm text-gray-200">{props.description ?? 'Aucune description.'}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {props.tags.length > 0 ? (
          props.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-gray-600 px-2 py-1 text-xs text-gray-300">
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">Aucun tag</span>
        )}
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <a href={props.sourceUrl} target="_blank" rel="noreferrer">
          Source
        </a>
        <span>{props.comments} commentaires</span>
      </div>
    </article>
  );
}
