# Ye Alt Archive (V1)

Prototype Next.js d'une archive communautaire pour versions alternatives de morceaux Kanye West.

## Scope V1 implémenté

- Pages: accueil, artiste, album, morceau, version, ajout de version, auth.
- Navigation orientée albums -> tracks -> versions.
- Données branchées sur Supabase (plus de dataset mock en mémoire).
- Éléments de produit visibles: recherche (UI), upvote (compteur), commentaires, tags, signalement de lien mort.

## Variables d'environnement

Créer un `.env.local` avec:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Lancer en local

```bash
npm install
npm run dev
```

## Base de données

- Le schéma + seed initial Kanye sont dans `supabase/schema.sql`.
- Appliquer ce script dans Supabase SQL Editor avant de démarrer l'app.

Tables utilisées:

- users
- artists
- albums
- tracks
- versions
- tags
- version_tags
- votes
- comments
- reports

## Prochaines étapes

1. Implémenter auth réelle Supabase (sessions + policies RLS).
2. Rendre formulaire ajout/version persistant (insert versions + tags).
3. Ajouter vote upsert côté utilisateur connecté.
4. Ajouter recherche globale et filtres réels (tag/type/date).
