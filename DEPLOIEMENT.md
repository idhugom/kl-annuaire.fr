# Déploiement — KL-Annuaire

## Préprod (active)

Le site est déployé en continu sur Cloudflare Pages :

- **URL de préprod :** https://kl-annuaire.pages.dev
- **Projet Cloudflare Pages :** `kl-annuaire`
- **Dépôt connecté :** `idhugom/kl-annuaire.fr` (branche `main`)
- **Build :** `npm run build` → sortie `dist` · répertoire racine vide · Node `22`
- **Commentaires de build (PR) :** activés
- Chaque `push` sur `main` redéclenche automatiquement un build + déploiement.

## Passage en production (à faire après validation de la préprod)

Le domaine `kl-annuaire.fr` existe déjà comme zone Cloudflare mais est **en attente**
(`pending`) : ses nameservers ne pointent pas encore vers Cloudflare.

**Étape unique — déléguer les nameservers chez le registrar :**

Remplacer les NS actuels (`ns1.dns-parking.com` / `ns2.dns-parking.com`) par :

```
elliott.ns.cloudflare.com
tani.ns.cloudflare.com
```

Une fois la délégation propagée (quelques minutes à quelques heures), tout s'active
automatiquement — rien d'autre à configurer, car les éléments suivants sont déjà en place :

| Élément                        | État        | Détail                                             |
|--------------------------------|-------------|----------------------------------------------------|
| Domaine `www.kl-annuaire.fr`   | configuré   | domaine personnalisé du projet Pages (canonique)   |
| Domaine `kl-annuaire.fr` (apex)| configuré   | domaine personnalisé du projet Pages               |
| DNS `www` → Pages              | créé        | CNAME proxifié vers `kl-annuaire.pages.dev`        |
| DNS apex → Pages               | créé        | CNAME proxifié (aplati) vers `kl-annuaire.pages.dev`|
| Redirection apex → www (301)   | active      | `functions/_middleware.js` (versionnée dans le repo)|
| HTTPS                          | automatique | certificat émis par Cloudflare à la délégation     |

`kl-annuaire.fr/*` renverra en **301** vers `https://www.kl-annuaire.fr/*` (chemin + query préservés).

## Migration du contenu

- 590 articles importés depuis WordPress ; **slugs, titres et images à la une conservés à l'identique**.
- Contenu **entièrement réécrit** via l'API OpenAI (`gpt-5.6-terra`, Responses API, raisonnement élevé).
- URLs identiques à l'ancien site → aucune perte de référencement.
