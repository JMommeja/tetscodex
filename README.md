# Ye Alt Archive (V1)

Prototype Next.js d'une archive communautaire pour versions alternatives de morceaux Kanye West.

## Scope V1 implémenté

- Pages: accueil, artiste, album, morceau, version, ajout de version, auth.
- Navigation orientée albums -> tracks -> versions.
- Données mock en mémoire (`lib/data.ts`) pour démarrer vite.
- Éléments de produit visibles: recherche (UI), upvote (UI score), commentaires (UI), tags, signalement de lien mort.

## Lancer en local

```bash
npm install
npm run dev
```

## Modèle de données cible (Supabase)

Tables prévues pour la phase base de données:

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

1. Brancher Supabase et remplacer les données mock.
2. Implémenter auth réelle.
3. Rendre formulaire ajout/version persistant.
4. Ajouter vote unique par utilisateur/version.
5. Ajouter filtres/tri réels côté page morceau.
