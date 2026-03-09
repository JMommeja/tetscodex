# Fichier style facilement opérable

Ce projet centralise maintenant les styles réutilisables dans `app/ui.css`.

## Où modifier le style

- **Tokens / base**: `app/ui.css` (`@layer base`)
- **Composants CSS réutilisables**: `app/ui.css` (`@layer components`)
- **Tailwind brut global**: `app/globals.css`

## Classes prêtes à l'emploi

- `page-shell`: conteneur principal de page.
- `panel`: carte standard.
- `panel-lg`: carte grande section.
- `panel-title`: titre de section.
- `btn-primary`: bouton principal.
- `input-base`: champ de formulaire.
- `tag-chip`: tag visuel.
- `stat-box`: bloc de stats.
- `list-item`: item de liste.

## Exemple rapide

```tsx
<section className="panel-lg">
  <h2 className="panel-title">Top communauté</h2>
  <button className="btn-primary">Ajouter</button>
</section>
```

## Règle pratique

Quand un style est répété 3 fois ou plus, le déplacer dans `app/ui.css`.
