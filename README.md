# KL-Annuaire

Le média éditorial nouvelle génération — moteur statique maison, **zéro dépendance runtime**, déployé sur Cloudflare Pages.

Ce dépôt remplace l'ancien site WordPress par un générateur de site statique sur-mesure : ultra-rapide, sans base de données, sans plugin, sans surface d'attaque.

## Architecture

```
build.mjs              Générateur de site statique (Node natif pur, aucune dépendance)
src/
  templates.mjs        Templates HTML (fonctions pures)
  styles/main.css      Design system « kiosque » (Fraunces · Inter · Space Grotesk)
  client/app.js        Interactions client (reveals, TOC, FAQ, thème, partage)
content/
  wp-raw/              Métadonnées importées de WordPress (titres, slugs, dates, images)
  articles/*.json      Articles régénérés (contenu premium, un fichier par slug)
public/                Assets copiés tels quels (polices, images à la une, logo)
scripts/               Outils de migration (fetch WP, génération OpenAI, images, preview)
```

## Développement

```bash
npm run build     # génère ./dist
npm run dev       # build + serveur de preview sur http://localhost:4321
```

Aucun `npm install` n'est requis pour builder : le moteur n'utilise que des modules Node natifs.

## Pipeline de contenu

Les articles sont régénérés intégralement via l'API OpenAI (`gpt-5.6-terra`, Responses API,
raisonnement élevé, sortie structurée). Les slugs, titres et images à la une d'origine sont
conservés à l'identique pour préserver le référencement.

```bash
node scripts/fetch-wp.mjs                 # importe posts + images depuis WordPress
node scripts/gen-content.mjs --conc 20    # (re)génère le contenu manquant
```

## Déploiement — Cloudflare Pages

| Paramètre            | Valeur          |
|----------------------|-----------------|
| Branche de prod      | `main`          |
| Commande de build    | `npm run build` |
| Répertoire de sortie | `dist`          |
| Répertoire racine    | *(vide)*        |
| Version de Node      | `22` (`.nvmrc`) |

Le domaine `www.kl-annuaire.fr` est canonique ; l'apex `kl-annuaire.fr` redirige en 301 vers `www`.
