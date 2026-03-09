# Preview en ligne (pas en local)

Ce projet est prêt pour un déploiement **Vercel Preview** afin d'obtenir un lien public à chaque push/PR.

## Option recommandée (UI Vercel, 5 minutes)

1. Va sur https://vercel.com/new
2. Import le repo GitHub.
3. Framework détecté: **Next.js**.
4. Ajoute les variables d'environnement:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Clique **Deploy**.

Résultat:
- un domaine de prod (ex: `your-app.vercel.app`)
- un lien **Preview** différent pour chaque PR/push.

## Activer le preview auto par PR

Dans Vercel:
- Project → Settings → Git
- Vérifie que **Preview Deployments** est activé.

Ensuite, chaque PR GitHub reçoit automatiquement un commentaire/check avec l'URL preview.

## Base Supabase (obligatoire)

1. Crée un projet Supabase.
2. Ouvre SQL Editor.
3. Exécute `supabase/schema.sql`.
4. Vérifie que les tables + seed Kanye existent.

## Vérification rapide de la preview

- Ouvre la home
- Ouvre `/artist/kanye-west`
- Ouvre un album puis un track
- Vérifie qu'il n'y a pas d'erreur de variables d'env

## Dépannage

- Erreur `Missing Supabase env vars`: variables d'environnement non définies sur Vercel.
- Pages vides: seed non appliqué dans Supabase.
- Erreur CORS/Network: URL Supabase incorrecte.
