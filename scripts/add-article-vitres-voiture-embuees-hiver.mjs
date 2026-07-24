// One-off: add a hand-written editorial article + register its metadata.
// Writes content/articles/<slug>.json and updates content/wp-raw/{posts,images}.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SLUG = 'pourquoi-les-vitres-de-la-voiture-sembuent-elles-a-linterieur-en-hiver';
const TITLE = 'Pourquoi les vitres de la voiture s\'embuent-elles à l\'intérieur en hiver ?';
const DATE = '2026-07-24T09:20:00';

const lead_html = `<p class="lead">Il suffit de monter dans la voiture par une matinée froide et humide pour que le pare-brise et les vitres se couvrent en quelques secondes d'un voile opaque. Ce phénomène, aussi banal que gênant, obéit à une explication physique très simple : un écart de température entre l'air chargé d'humidité à l'intérieur de l'habitacle et la surface froide des vitres.</p><p>Comprendre ce mécanisme permet d'agir efficacement — et surtout d'éviter les erreurs qui, loin d'aider, aggravent souvent la buée au lieu de la faire disparaître.</p>`;

const body_html = `
<h2 id="pourquoi-la-buee-se-forme">Le mécanisme physique de la buée</h2>
<p>L'air contient toujours une certaine quantité de vapeur d'eau, invisible tant qu'elle reste sous forme gazeuse. Cette capacité à retenir de la vapeur dépend directement de la température : un air chaud peut contenir beaucoup plus d'humidité qu'un air froid. Lorsque l'air humide de l'habitacle — chargé par la respiration des occupants, des vêtements mouillés ou de la neige fondue sur les chaussures — entre en contact avec une vitre froide, il se refroidit brutalement au contact du verre. Il ne peut alors plus retenir toute son humidité : l'excédent de vapeur se condense instantanément en microgouttelettes sur la surface froide. C'est cette fine pellicule d'eau qui forme le voile de buée.</p>
<p>En hiver, ce phénomène est particulièrement marqué pour deux raisons : l'écart de température entre l'intérieur chauffé de la voiture et l'extérieur glacé est important, et l'air ambiant est souvent déjà chargé d'humidité (pluie, neige, brouillard). Résultat : la condensation se forme vite, et parfois même côté extérieur du pare-brise lorsque l'air ambiant est très humide et la vitre plus froide que l'air.</p>
<div class="kl-callout is-key"><span class="kl-callout__label">À retenir</span><p>La buée apparaît quand l'air humide de l'habitacle touche une surface plus froide que lui. Pour la faire disparaître durablement, il faut soit réchauffer la vitre, soit réduire l'humidité de l'air intérieur — idéalement les deux à la fois.</p></div>

<h2 id="sources-humidite-habitacle">D'où vient l'humidité qui s'accumule dans l'habitacle</h2>
<p>Plusieurs sources, souvent cumulées, chargent l'air de la voiture en vapeur d'eau sans qu'on y prête attention :</p>
<ul>
<li><strong>La respiration des occupants</strong> : chaque personne rejette de l'air chaud et humide en respirant ; à plusieurs dans un habitacle fermé, l'effet est rapide.</li>
<li><strong>Les vêtements et chaussures mouillés</strong> : pluie, neige ou simple humidité ambiante s'évaporent progressivement une fois la voiture chauffée.</li>
<li><strong>Un tapis de sol ou une moquette imbibée</strong> d'eau restée plusieurs jours sans sécher, fréquente en hiver.</li>
<li><strong>Une climatisation jamais utilisée</strong> : la clim assèche l'air, y compris en hiver ; ne s'en servir qu'en été prive la voiture de son meilleur outil anti-buée.</li>
<li><strong>Des joints de portière ou un pare-brise qui laisse infiltrer l'eau</strong>, un problème plus rare mais qui entretient une humidité chronique dans l'habitacle.</li>
</ul>

<h2 id="reflexes-efficaces">Les réflexes qui font vraiment disparaître la buée</h2>
<p>Certains gestes agissent en quelques secondes, d'autres préviennent le problème sur la durée. Les deux se combinent utilement.</p>
<ol>
<li><strong>Activer la climatisation, même en hiver.</strong> C'est le geste le plus efficace : la clim assèche l'air en le faisant passer sur un évaporateur froid, ce qui réduit immédiatement l'humidité disponible pour se condenser sur les vitres.</li>
<li><strong>Diriger le chauffage vers le pare-brise</strong> (mode dédié, souvent symbolisé par une vitre avec des flèches) pour réchauffer directement la surface froide et empêcher la condensation de s'y déposer.</li>
<li><strong>Entrouvrir légèrement une vitre</strong> quelques instants pour renouveler l'air intérieur et évacuer l'excédent d'humidité, surtout si plusieurs personnes sont à bord.</li>
<li><strong>Éviter de recycler l'air intérieur</strong> (désactiver le mode recirculation) lorsque la buée est déjà présente : il vaut mieux faire entrer de l'air extérieur, plus sec, que de faire tourner en boucle l'air humide de l'habitacle.</li>
<li><strong>Essuyer la vitre avec un chiffon sec et propre</strong> pour un effet immédiat, en complément — jamais en remplacement — du chauffage ou de la climatisation, sinon la buée revient en quelques minutes.</li>
</ol>
<div class="kl-callout is-warning"><span class="kl-callout__label">Vigilance</span><p>Ne jamais démarrer en conduisant avec une vitre embuée en se fiant uniquement aux essuie-glaces ou à un dégagement partiel : la visibilité réduite est un facteur de risque routier. Mieux vaut attendre trente secondes de plus que de partir avec une vision partielle.</p></div>

<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Méthode</th><th>Rapidité</th><th>Efficacité durable</th></tr></thead><tbody>
<tr><td>Climatisation (même en hiver)</td><td>Assez rapide</td><td>Très bonne, assèche l\'air en profondeur</td></tr>
<tr><td>Chauffage dirigé sur le pare-brise</td><td>Progressive</td><td>Bonne, réchauffe la vitre elle-même</td></tr>
<tr><td>Vitre entrouverte</td><td>Rapide</td><td>Moyenne, dépend de l\'air extérieur</td></tr>
<tr><td>Chiffon sec</td><td>Immédiate</td><td>Faible seule, la buée revient vite</td></tr>
<tr><td>Produit anti-buée en prévention</td><td>Aucune action immédiate</td><td>Bonne sur la durée, à renouveler</td></tr>
</tbody></table></div>

<h2 id="prevenir-la-buee">Prévenir la buée avant même qu'elle n'apparaisse</h2>
<p>Quelques habitudes simples réduisent nettement la fréquence et l'intensité du phénomène, sans avoir à agir dans l'urgence chaque matin.</p>
<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Bons réflexes</h4><ul><li>Secouer et sécher les vêtements mouillés avant de monter en voiture.</li><li>Retirer les tapis de sol détrempés pour les laisser sécher hors de l\'habitacle.</li><li>Utiliser un produit anti-buée sur les vitres, appliqué à sec avec un chiffon.</li><li>Garer la voiture, quand c\'est possible, à l\'abri du gel et de l\'humidité directe.</li></ul></div><div class="kl-compare__col is-con"><h4>Habitudes à éviter</h4><ul><li>Laisser un sac de linge humide ou des chaussures mouillées en permanence dans l\'habitacle.</li><li>Rouler fenêtres fermées avec la recirculation activée par temps humide.</li><li>Négliger l\'entretien des joints de portière, source d\'infiltrations discrètes.</li><li>Attendre que la buée gêne fortement la conduite avant d\'agir.</li></ul></div></div>
<p>Un pare-brise propre, sans film gras sur la face intérieure, s'embue également moins vite : les résidus de nettoyants ménagers ou de fumée de cigarette créent une surface qui retient davantage la condensation. Un nettoyage régulier de la face intérieure des vitres, avec un produit adapté au verre, limite ce phénomène.</p>
<blockquote class="kl-quote">La climatisation n'est pas réservée à l'été : c'est, hiver comme été, l'outil le plus efficace contre la buée dans l'habitacle.<cite>— Principe de base en entretien automobile</cite></blockquote>

<h2 id="cas-particuliers">Les cas particuliers à connaître</h2>
<ul>
<li><strong>Voiture garée dehors toute la nuit par temps froid et humide</strong> : la buée peut se former côté extérieur du pare-brise en plus de l'intérieur ; un <a href="/comment-fabriquer-du-lave-glace-maison-pour-votre-voiture/">lave-glace adapté au froid</a> aide à garder une bonne visibilité au démarrage, en complément du chauffage.</li>
<li><strong>Voiture électrique ou hybride</strong> : la montée en température de l'habitacle peut être plus lente qu'avec un moteur thermique classique ; anticiper le préchauffage, quand le véhicule le permet, aide à limiter la buée dès le départ.</li>
<li><strong>Trajets courts et fréquents en hiver</strong> : l'habitacle n'a pas toujours le temps de sécher complètement entre deux trajets, ce qui entretient un taux d'humidité plus élevé qu'avec des trajets plus longs.</li>
<li><strong>Vitres arrière</strong> : souvent équipées d'un dégivrage électrique dédié, à activer en complément de la ventilation avant, notamment lors des <a href="/etapes-essentielles-pour-demarrer-une-voiture-avec-succes/">premières minutes après le démarrage</a>.</li>
</ul>

<div class="kl-stat-row"><div class="kl-stat"><b>30 s</b><span>pour qu'une vitre s'embue après contact d'air humide</span></div><div class="kl-stat"><b>2-3 min</b><span>de clim + chauffage pour un résultat durable</span></div><div class="kl-stat"><b>1</b><span>vitre légèrement entrouverte suffit à renouveler l'air</span></div></div>
<p>Pour d'autres conseils pratiques liés à l'entretien et à la conduite au quotidien, la <a href="/rubrique/auto/">rubrique Auto</a> de KL-Annuaire rassemble d'autres guides utiles.</p>
`;

const record = {
  slug: SLUG,
  title: TITLE,
  date: DATE,
  modified: DATE,
  category: 'Auto',
  tags: [
    'buée voiture',
    'vitres embuées',
    'entretien auto',
    'sécurité routière',
    'conduite hiver',
  ],
  dek: 'Pare-brise et vitres qui s\'embuent en quelques secondes par temps froid et humide : le mécanisme physique en cause, les gestes qui marchent vraiment et ceux à éviter.',
  meta_description: 'Pourquoi les vitres de voiture s\'embuent en hiver : cause physique, réflexes efficaces (climatisation, chauffage), erreurs à éviter et prévention durable.',
  image_caption: 'Une vitre de voiture embuée par temps froid et humide, phénomène courant lié à l\'écart de température entre l\'habitacle et l\'extérieur.',
  reading_time: 7,
  key_takeaways: [
    'La buée apparaît quand l\'air humide de l\'habitacle touche une vitre plus froide que lui, qui provoque une condensation instantanée.',
    'La respiration des occupants, les vêtements mouillés et un tapis de sol humide chargent l\'air de la voiture en vapeur d\'eau.',
    'La climatisation, même en hiver, reste le moyen le plus efficace : elle assèche l\'air et fait disparaître la buée durablement.',
    'Diriger le chauffage vers le pare-brise et désactiver la recirculation aident aussi à évacuer l\'humidité intérieure.',
    'Un chiffon sec donne un résultat immédiat mais temporaire : à combiner avec la climatisation ou le chauffage, jamais seul.',
    'Sécher vêtements et tapis de sol, et utiliser un produit anti-buée en prévention, réduisent nettement la fréquence du phénomène.',
  ],
  toc: [
    { id: 'pourquoi-la-buee-se-forme', label: 'Le mécanisme physique de la buée' },
    { id: 'sources-humidite-habitacle', label: 'D\'où vient l\'humidité dans l\'habitacle' },
    { id: 'reflexes-efficaces', label: 'Les réflexes vraiment efficaces' },
    { id: 'prevenir-la-buee', label: 'Prévenir la buée' },
    { id: 'cas-particuliers', label: 'Les cas particuliers à connaître' },
  ],
  lead_html,
  body_html,
  faq: [
    {
      q: 'Pourquoi les vitres de la voiture s\'embuent-elles surtout en hiver ?',
      a_html: '<p>Parce que l\'écart de température entre l\'air chaud et humide de l\'habitacle et la surface froide des vitres est plus important en hiver. Cet écart provoque une condensation rapide de la vapeur d\'eau contenue dans l\'air intérieur au contact du verre froid.</p>',
    },
    {
      q: 'Faut-il vraiment utiliser la climatisation en hiver contre la buée ?',
      a_html: '<p>Oui, c\'est le moyen le plus efficace. La climatisation assèche l\'air en le faisant passer sur un évaporateur froid, ce qui réduit l\'humidité disponible pour se condenser sur les vitres — indépendamment de la température affichée, qu\'elle soit froide ou chaude.</p>',
    },
    {
      q: 'Ouvrir une vitre fait-il vraiment partir la buée ?',
      a_html: '<p>Entrouvrir une vitre quelques instants renouvelle l\'air intérieur et évacue une partie de l\'humidité, ce qui aide ponctuellement. Ce n\'est toutefois pas suffisant seul par temps très humide : combiner avec le chauffage ou la climatisation donne un résultat plus rapide et plus durable.</p>',
    },
    {
      q: 'Pourquoi la buée revient-elle après avoir essuyé la vitre ?',
      a_html: '<p>Parce qu\'essuyer la vitre ne change rien à la cause : l\'air intérieur reste chargé d\'humidité et continue de se condenser au contact du verre froid. Le chiffon donne un résultat immédiat mais temporaire ; seuls le chauffage ou la climatisation traitent la cause en profondeur.</p>',
    },
    {
      q: 'Un produit anti-buée est-il vraiment efficace ?',
      a_html: '<p>Oui, appliqué régulièrement sur une vitre propre et sèche, un produit anti-buée forme un film qui limite la formation de gouttelettes visibles. Il ne remplace pas le chauffage ou la climatisation en cas de forte humidité, mais réduit nettement la fréquence du phénomène au quotidien.</p>',
    },
    {
      q: 'Est-il dangereux de conduire avec une vitre légèrement embuée ?',
      a_html: '<p>Oui, la visibilité réduite est un facteur de risque, même léger. Mieux vaut prendre trente secondes à une minute supplémentaires pour dégager correctement le pare-brise et les vitres avant de démarrer plutôt que de compter sur les essuie-glaces ou un dégagement partiel.</p>',
    },
  ],
  _gen: { model: 'claude', at: DATE },
};

const artPath = path.join(ROOT, 'content/articles', SLUG + '.json');
fs.writeFileSync(artPath, JSON.stringify(record, null, 2));
console.log('article →', artPath);

const postsPath = path.join(ROOT, 'content/wp-raw/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
if (!posts.some((p) => p.slug === SLUG)) {
  posts.unshift({
    id: 900022,
    slug: SLUG,
    link: `https://www.kl-annuaire.fr/${SLUG}/`,
    pathname: `/${SLUG}/`,
    title: TITLE,
    date: DATE,
    modified: DATE,
    excerpt: 'Le mécanisme physique de la buée sur les vitres de voiture en hiver, les réflexes vraiment efficaces (climatisation, chauffage) et les erreurs à éviter.',
    categories: [{ name: 'Auto', slug: 'auto' }],
    featured_source: '',
    featured_alt: 'Vitre avant d\'une voiture couverte de buée à l\'intérieur par une matinée d\'hiver',
  });
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  console.log('posts.json ← entry added');
} else {
  console.log('posts.json already has slug');
}

const imagesPath = path.join(ROOT, 'content/wp-raw/images.json');
const images = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
images[SLUG] = {
  w1600: `/images/featured/${SLUG}-1600.webp`,
  w800: `/images/featured/${SLUG}-800.webp`,
  srcW: 1536,
  srcH: 1024,
};
fs.writeFileSync(imagesPath, JSON.stringify(images, null, 2));
console.log('images.json ← entry set');
