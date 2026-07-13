# CLAUDE.md — Guide de travail pour Claude sur KL-Annuaire

Ce fichier fixe **comment intervenir** sur ce dépôt. Il complète l'état actuel du site
(il ne le remplace pas et ne demande aucune refonte). Lis-le en entier avant toute session.

---

## 0. Règles d'intervention (impératives)

### Règle n°1 — TOUJOURS travailler sur `main` (très important)
Toute session — développement, rédaction, amélioration, correction, etc. — se fait
**directement sur la branche `main`** de GitHub. **Ne JAMAIS créer de branche** ni travailler
sur une branche secondaire. On commit et on push sur `main`.

> Rappel technique : `main` est la branche de production. Chaque `push` sur `main` redéclenche
> automatiquement un build + déploiement Cloudflare Pages (voir §8). On vérifie donc que
> `npm run build` passe **avant** de pousser.

### Règle n°2 — Toujours en qualité optimale
Se mettre systématiquement en **qualité maximale du modèle** (le réglage le plus intelligent /
le plus performant, raisonnement le plus élevé) pour chaque intervention.
**Seule exception :** la génération de **photo OpenAI**, en qualité `"medium"` via l'API (voir §7).

### Règle n°3 — Clés API / tokens
Les clés et tokens nécessaires (`OPENAI_API_KEY` pour les images, ainsi que `OPENAI_TEXT_MODEL`,
`OPENAI_IMAGE_MODEL`, clés Cloudflare, etc.) sont fournis par **l'environnement cloud de Claude Code**
via les variables d'environnement (`process.env`). Les **récupérer depuis l'environnement** ; ne
**jamais** les redemander, ni les écrire en dur dans le code, ni les committer. Aucune clé, aucun
secret ne doit apparaître dans un fichier versionné ou un message de commit.

---

## 1. Le site en bref

**KL-Annuaire** n'est pas un annuaire de plus : c'est un **média éditorial français nouvelle
génération**. Signature : « *Le savoir, référencé.* » — le média qui **référence, décrypte et met
en perspective**.

- **Nature** : générateur de site **statique maison**, **zéro dépendance runtime** (Node natif pur),
  sans base de données ni plugin. Il remplace un ancien site WordPress.
- **Volume** : ~590+ articles, un fichier JSON par article, répartis en ~17 rubriques
  (Cuisine, Maison, Jardin, Animaux, Entreprise, Finance, Bien-être, Santé, Technologie, Culture,
  Voyage, Mode, Famille, Auto, Sport, Loisirs, Pratique).
- **Promesse** : des **guides complets, fiables et agréables à lire** qui répondent **totalement**
  à l'intention de recherche et apportent une vraie valeur ajoutée — pas du remplissage.
- **Hébergement** : Cloudflare Pages. Domaine canonique **`www.kl-annuaire.fr`** (l'apex redirige en 301).
- **SEO** : URLs (slugs) historiques conservées à l'identique. Le référencement est un objectif de
  premier plan — voir §3 (anti-cannibalisation) et §5 (liens internes).

---

## 2. Identité & ton

- **Posture** : rédacteur ou rédactrice en chef d'un média haut de gamme **et** expert(e) SEO.
- **Langue** : français impeccable, **vivant, précis, concret**. Aucune généralité creuse, aucun
  remplissage, aucune tournure « pipeau ».
- **Adresse au lecteur** : vouvoiement, ton professionnel, chaleureux et rassurant.
- **Boussole unique** : l'**utilité pour le lecteur**. On écrit pour qu'il reparte avec une réponse
  claire, actionnable et une longueur d'avance.
- **Exactitude (non négociable)** : ne **jamais inventer** de chiffres précis, prix, dates, marques,
  études ou citations. En cas de doute, rester sur des **ordres de grandeur** et des faits de
  **connaissance générale**. Mieux vaut « quelques centaines d'euros » qu'un faux montant précis.
- **Neutralité éditoriale** : ni survente, ni jugement gratuit. On explique, on compare, on nuance.

---

## 3. Règles d'or de la rédaction (prioritaires)

1. **Rédaction par Claude, pas par l'API.** Le contenu de l'article est **écrit par Claude**
   (le modèle le plus intelligent), directement en session. **Ce n'est plus le pipeline API OpenAI
   qui rédige.** Désormais, **seules les images** passent par OpenAI (voir §7).
   > Note d'état : les ~590 articles existants ont été régénérés par API (`gpt-5.6-terra`) lors de
   > la migration WordPress ; c'est de l'historique. Toute **nouvelle** rédaction est faite par Claude.

2. **Anti-cannibalisation.** Si le sujet est libre, **vérifier d'abord l'existant** : chaque nouvel
   article doit porter sur un **sujet distinct** (intention de recherche différente) pour éviter la
   cannibalisation SEO. Méthode concrète :
   - lister `content/articles/` et parcourir les titres dans `content/wp-raw/posts.json` ;
   - rechercher les mots-clés du sujet envisagé (ex. `grep -il "mot-clé" content/articles/*.json`) ;
   - si un article proche existe déjà : **changer d'angle**, cibler une requête différente, ou
     **enrichir l'existant** plutôt que d'en publier un doublon.

3. **Qualité avant tout.** Chaque article doit apporter les **meilleures** informations sur son sujet :
   des détails en plus et, **selon la pertinence**, des éléments riches (tableau, comparaison, astuces,
   FAQ, citation, chiffres…). Ce sont des **exemples** : pas besoin de tout mettre à chaque fois (voir §4).

4. **Photo OpenAI obligatoire.** **Jamais publier un article sans visuel.** Toujours une **vraie photo
   à la une générée par OpenAI**, « photo généraliste sur le thème, ultra réaliste », **avant**
   publication (voir §7).

5. **Liens internes.** Ajouter **1 à 3 liens internes** (jusqu'à 4) par article vers d'autres pages
   du site (voir §5).

---

## 4. Qualité rédactionnelle & contrat de composants HTML

Le corps d'article est du **HTML** rédigé « à la maison » (fonctions pures dans `src/templates.mjs`
qui l'affichent tel quel). Réutiliser les classes de design ci-dessous **à bon escient, jamais de
manière forcée**.

**Cible de structure :**
- Corps de **1400 à 2200 mots**, en **4 à 7 sections `<h2>`** (avec `<h3>` si utile).
- **Chaque `<h2>` porte un `id` unique** (slug court en minuscules) — il alimente le sommaire (TOC).
- `lead_html` : commence **obligatoirement** par `<p class="lead">…</p>` (accroche forte), puis
  éventuellement un 2ᵉ paragraphe.
- Une **FAQ de 4 à 6** vraies questions d'internautes, avec réponses concrètes.
- **3 à 6 `key_takeaways`** essentiels et actionnables.
- **Pas de `<h1>`** (déjà rendu par le template), pas de style inline, pas de `<script>`,
  **pas d'image dans le corps** (le seul visuel est la photo à la une, voir §7).

**Composants disponibles** (mêmes classes que le reste du site) :
- **Encadré** : `<div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>…</p></div>`
  Variantes : (défaut) `info`, `is-warning` (avertissement), `is-tip` (astuce), `is-key` (à retenir).
  Adapter le libellé du label à la variante.
- **Tableau** (dès qu'une comparaison chiffrée/critères aide le lecteur) :
  `<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table></div>`
- **Comparaison 2 colonnes** (pour un « pour / contre » ou « option A / option B ») :
  `<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Avantages</h4><ul><li>…</li></ul></div><div class="kl-compare__col is-con"><h4>Limites</h4><ul><li>…</li></ul></div></div>`
- **Citation / idée-clé** : `<blockquote class="kl-quote">…<cite>— …</cite></blockquote>`
- **Statistiques marquantes** (facultatif) :
  `<div class="kl-stat-row"><div class="kl-stat"><b>3×</b><span>libellé</span></div>…</div>`
- Listes `<ul>`/`<ol>`/`<li>`, emphase `<strong>`/`<em>`.

**Exigences** : au moins **un tableau OU une comparaison 2 colonnes** quand le sujet s'y prête, et
**un ou deux encadrés** pertinents. Traiter le sujet dans son intégralité : contexte, méthode/étapes,
cas particuliers, erreurs fréquentes, conseils d'expert, questions sous-jacentes.

---

## 5. Liens internes (1 à 4 par article)

- **1 à 3 liens internes** par article (jusqu'à 4), **contextuels et pertinents**, vers d'autres
  pages du site.
- **Format** : `<a href="/<slug>/">ancre naturelle</a>` (chemin racine, slash final). Exemples de
  cibles : un autre article de la même rubrique, une page de rubrique (`/rubrique/<slug>/`),
  l'index (`/index/`), la page à-propos (`/a-propos/`).
- **Vérifier que la cible existe** : le slug d'un article doit correspondre à un fichier
  `content/articles/<slug>.json`. Ne jamais pointer vers une page inexistante.
- Privilégier des liens qui **aident réellement** le lecteur à approfondir (même thème / sujet connexe),
  avec une **ancre descriptive** (pas de « cliquez ici »).

---

## 6. Anatomie d'un article & workflow d'ajout

Un article = **un fichier** `content/articles/<slug>.json` + **deux enregistrements** de métadonnées.
Le modèle de référence pour un article rédigé à la main est `scripts/add-article.mjs`
(et `scripts/add-article-scan-assur.mjs`).

**Champs du fichier `content/articles/<slug>.json` :**
```
slug, title, date, modified,
category            // une des rubriques de la §1
tags                // 3 à 6
dek                 // chapô 1 phrase (~120–170 caractères)
meta_description    // 150–160 caractères
image_caption       // légende de la photo à la une
reading_time        // minutes (≈ mots / 210)
key_takeaways       // 3 à 6 points
toc                 // [{ id, label }] — un par <h2>, ids identiques à ceux du body_html
lead_html           // commence par <p class="lead">…</p>
body_html           // corps complet (voir §4)
faq                 // [{ q, a_html }], 4 à 6
_gen                // { model: "claude", at: <date ISO> }  ← provenance
```

**Deux enregistrements à mettre à jour (comme dans `add-article.mjs`) :**
- `content/wp-raw/posts.json` : entrée `{ id, slug, link, pathname, title, date, modified, excerpt,
  categories, featured_alt, … }` (titre, dates, `alt` de l'image).
- `content/wp-raw/images.json` : `"<slug>": { w1600, w800, srcW: 1536, srcH: 1024 }`.

**Étapes recommandées :**
1. (Sujet libre) contrôle anti-cannibalisation (§3.2).
2. Rédiger le JSON de l'article (Claude), en respectant §4 et §5.
3. Générer la **photo à la une** OpenAI (§7) → `public/images/featured/<slug>-1600.webp` et `-800.webp`.
4. Enregistrer les métadonnées (`posts.json`, `images.json`).
5. `npm run build` pour vérifier que tout compile, puis commit + push sur `main`.

> Le fichier `CLAUDE.md` **n'est pas** lu par `build.mjs` et **n'est pas** copié dans `dist/` :
> le documenter/mettre à jour n'a aucun effet sur le site déployé.

---

## 7. Photo — toujours une vraie photo OpenAI avant publication

**Règle absolue :** jamais publier un article sans visuel. Toujours **une** vraie photo de couverture
générée par OpenAI, **« ultra réaliste »**, avant publication.

**Modèle & paramètres** (via `OPENAI_API_KEY` de l'environnement) :
```json
{ "model": "gpt-image-2", "size": "1536x1024", "quality": "medium" }
```
- Sortie **WebP** ; écrire **deux fichiers** : `public/images/featured/<slug>-1600.webp` et
  `<slug>-800.webp` (mêmes dimensions source `1536×1024`, cf. `images.json`).
- **Une seule image (hero) par article.** Pas de galerie, pas d'image dans le corps.
- **Prompt** : « photo généraliste sur le thème, ultra réaliste », style éditorial magazine, cadrage
  paysage 3:2. **Aucun texte, mot, lettre, logo ni chiffre lisible** dans l'image.
- Script de référence : `scripts/gen-featured.mjs` (le passer sur `gpt-image-2` / `quality: "medium"`
  au moment de générer ; les scripts one-off existants datent d'avant cette règle).

> C'est **la seule étape** qui utilise OpenAI. Le texte, lui, est écrit par Claude (§3.1).

---

## 8. Architecture, build & déploiement (état actuel — à ne pas casser)

```
build.mjs              Générateur statique (Node natif pur, aucune dépendance)
src/
  templates.mjs        Templates HTML (fonctions pures)
  styles/main.css      Design system « kiosque » (Fraunces · Inter · Space Grotesk)
  client/app.js        Interactions client (reveals, TOC, FAQ, thème, partage)
content/
  wp-raw/              Métadonnées (posts.json, images.json, legal.json…)
  articles/*.json      Articles (un fichier par slug)
public/                Assets copiés tels quels (polices, images à la une, logo)
scripts/               Outils (fetch WP, image OpenAI, preview, ajout d'article)
functions/_middleware.js  Redirection apex → www (301), versionnée
```

**Commandes :**
```bash
npm run build     # génère ./dist  (aucun npm install requis pour builder)
npm run dev       # build + preview sur http://localhost:4321
```

**Déploiement — Cloudflare Pages :** branche de prod `main` · commande `npm run build` · sortie `dist`
· Node `22` (`.nvmrc`). Chaque `push` sur `main` redéclenche build + déploiement. Domaine canonique
`www.kl-annuaire.fr` (apex `kl-annuaire.fr` → 301 vers `www`).

**À préserver** : URLs/slugs existants (SEO), zéro dépendance runtime, pas de style inline ni de
`<script>` dans le contenu, sécurité (en-têtes de `build.mjs`).

---

## 9. Checklist avant push (sur `main`)

- [ ] Travail fait **sur `main`**, aucune branche créée (§0.1).
- [ ] Article **rédigé par Claude**, sujet **non cannibalisant** (§3.1–3.2).
- [ ] Structure & composants conformes (§4) ; **1 à 4 liens internes** valides (§5).
- [ ] **Photo à la une OpenAI** générée (`gpt-image-2`, `1536×1024`, `quality: medium`), 2 fichiers WebP (§7).
- [ ] Métadonnées à jour (`posts.json`, `images.json`).
- [ ] `npm run build` passe sans erreur.
- [ ] Aucun secret / clé en dur dans le code ou le commit (§0.3).
- [ ] Commit clair et explicite, puis `git push -u origin main`.
