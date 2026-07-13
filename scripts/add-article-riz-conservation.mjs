// One-off: add a hand-written editorial article + register its metadata.
// Writes content/articles/<slug>.json and updates content/wp-raw/{posts,images}.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SLUG = 'combien-de-temps-conserver-un-reste-de-riz-cuit-au-refrigerateur';
const TITLE = 'Combien de temps conserver un reste de riz cuit au réfrigérateur sans risque ?';
const DATE = '2026-07-13T09:30:00';

const lead_html = `<p class="lead">Un reste de riz blanc, cuit en trop grande quantité pour un curry ou un poke bowl, finit presque toujours au réfrigérateur « pour plus tard ». Bonne idée à condition de respecter quelques règles précises : contrairement à beaucoup d’aliments cuits, le riz peut redevenir dangereux même réchauffé à cœur, à cause d’une bactérie particulière qui résiste à la chaleur.</p><p>Voici, sans dramatiser mais sans approximation, la durée de conservation réelle du riz cuit au réfrigérateur, la bonne façon de le refroidir et de le stocker, et les signes qui doivent vous faire renoncer à un reste plutôt que de le manger « pour ne pas gâcher ».</p>`;

const body_html = `
<h2 id="pourquoi-le-riz-est-a-risque">Pourquoi le riz cuit est un aliment sensible</h2>
<p>Le riz cru contient naturellement des spores d’une bactérie appelée <strong>Bacillus cereus</strong>, présente dans la plupart des sols et donc sur la majorité des céréales. La cuisson détruit les bactéries elles-mêmes, mais pas forcément ces spores très résistantes à la chaleur. Si le riz cuit reste ensuite plusieurs heures à température ambiante, les spores survivantes peuvent germer et produire une toxine.</p>
<p>C’est ce point qui distingue le riz de nombreux autres restes : cette toxine résiste elle aussi à la cuisson et au réchauffage. Autrement dit, un riz laissé trop longtemps hors du réfrigérateur peut rendre malade même s’il est ensuite réchauffé « bien chaud », sans odeur suspecte ni changement d’aspect visible. Ce n’est donc pas la température de réchauffage qui protège, mais la rapidité avec laquelle le riz a été refroidi et mis au frais après la cuisson.</p>
<div class="kl-callout is-warning"><span class="kl-callout__label">Vigilance</span><p>Un riz cuit ayant passé plus de deux heures à température ambiante présente un risque réel, même s’il semble normal au goût et à l’odeur. En cas de doute sur ce délai, mieux vaut le jeter que le réchauffer.</p></div>

<h2 id="duree-de-conservation">Combien de temps conserver le riz cuit au réfrigérateur ?</h2>
<p>La règle générale, retenue par la plupart des autorités sanitaires, est de <strong>3 à 4 jours maximum</strong> au réfrigérateur (réglé à 4 °C ou moins), dans un contenant hermétique, à condition d’avoir refroidi et rangé le riz rapidement après la cuisson. Ce délai varie légèrement selon ce qui a été ajouté au riz après cuisson : un riz nature se conserve un peu mieux qu’un riz déjà mélangé à de la viande, des œufs ou une sauce.</p>
<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Type de riz cuit</th><th>Réfrigérateur (≤ 4 °C)</th><th>Congélateur</th></tr></thead><tbody>
<tr><td>Riz blanc nature</td><td>3 à 4 jours</td><td>1 à 2 mois</td></tr>
<tr><td>Riz complet ou semi-complet</td><td>3 à 4 jours</td><td>1 à 2 mois</td></tr>
<tr><td>Riz cantonais, riz sauté avec viande ou œuf</td><td>2 à 3 jours</td><td>1 mois</td></tr>
<tr><td>Riz à sushi vinaigré</td><td>1 à 2 jours (texture altérée)</td><td>Déconseillé</td></tr>
<tr><td>Risotto (base crémeuse)</td><td>2 jours</td><td>1 mois (texture modifiée)</td></tr>
</tbody></table></div>
<p>Ces durées supposent un riz mis au réfrigérateur rapidement après la cuisson, dans un récipient propre et fermé. Un riz oublié plusieurs heures sur le plan de travail avant d’être rangé ne rejoint pas ces compteurs : il doit être considéré à part, voire écarté (voir plus bas).</p>

<h2 id="bien-refroidir-et-stocker">Bien refroidir et stocker son riz après la cuisson</h2>
<p>La phase la plus importante n’est pas le temps passé au réfrigérateur, mais les instants qui suivent la cuisson. Plus le riz reste tiède longtemps, plus le risque de prolifération augmente. Voici la marche à suivre :</p>
<ol>
<li><strong>Refroidissez vite.</strong> Étalez le riz en couche fine sur une plaque ou un grand plat plutôt que de le laisser en bloc épais dans la casserole : la surface d’échange plus grande accélère nettement le refroidissement.</li>
<li><strong>Respectez la fenêtre des deux heures.</strong> Le riz ne doit pas rester plus d’une heure ou deux à température ambiante après la cuisson, moins encore par temps chaud (au-delà de 32 °C, réduisez ce délai à une heure).</li>
<li><strong>Divisez en portions.</strong> Répartir le riz dans plusieurs contenants peu profonds plutôt qu’un seul grand récipient permet à chaque portion de refroidir plus vite à cœur.</li>
<li><strong>Fermez hermétiquement et datez.</strong> Un couvercle ou un film alimentaire limite le dessèchement et les contaminations croisées avec d’autres aliments du réfrigérateur.</li>
</ol>
<div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>Si vous cuisinez du riz en grande quantité pour la semaine, mettez immédiatement de côté les portions destinées au réfrigérateur ou au congélateur, avant même de servir le repas : c’est le moyen le plus simple de respecter la fenêtre des deux heures sans y penser.</p></div>

<h2 id="reconnaitre-riz-avarie">Reconnaître un riz cuit qui n’est plus consommable</h2>
<p>Un riz cuit avarié ne présente pas toujours de signe évident, ce qui justifie de respecter les durées indiquées plus haut plutôt que de se fier uniquement à l’aspect. Certains signaux doivent néanmoins alerter immédiatement :</p>
<ul>
<li>Une <strong>odeur aigre, fermentée ou inhabituelle</strong>, différente de l’odeur neutre du riz cuit frais.</li>
<li>Une <strong>texture visqueuse, filante ou collante</strong> au-delà de la normale, parfois accompagnée d’un aspect luisant anormal.</li>
<li>Des <strong>taches, points colorés ou moisissures</strong> visibles, même localisés.</li>
<li>Un contenant qui a été laissé <strong>ouvert ou mal fermé</strong> plusieurs jours au réfrigérateur.</li>
</ul>
<p>En l’absence de ces signes, un riz qui a dépassé de peu la durée conseillée n’est pas nécessairement sans danger : rappelez-vous que la toxine en cause ne modifie pas toujours le goût ni l’odeur. C’est pourquoi la règle des 3 à 4 jours prime sur l’examen visuel.</p>

<h2 id="rechauffer-ou-congeler">Réchauffer ou congeler : ce qu’il faut savoir</h2>
<p>Deux options s’offrent à vous une fois le riz correctement refroidi et stocké : le réchauffer dans les jours qui suivent, ou le congeler pour une consommation plus lointaine.</p>
<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Réchauffer au réfrigérateur (sous 3-4 jours)</h4><ul><li>Pratique pour les repas de la semaine.</li><li>Réchauffez une seule fois, à cœur, jusqu’à ce que le riz soit uniformément très chaud.</li><li>Ajoutez un peu d’eau ou de bouillon pour éviter qu’il ne se dessèche.</li></ul></div><div class="kl-compare__col is-con"><h4>Congeler (au-delà de quelques jours)</h4><ul><li>Congelez le riz déjà refroidi, en portions, dans des sacs ou boîtes hermétiques.</li><li>Décongelez au réfrigérateur ou directement à la poêle/au micro-ondes, puis consommez sans attendre.</li><li>Ne recongelez jamais un riz déjà décongelé.</li></ul></div></div>
<p>Le réchauffage doit toujours porter le riz à une chaleur bien homogène, sans zones tièdes — un simple passage rapide au micro-ondes en surface ne suffit pas. À la poêle, mieux vaut ajouter un filet d’eau et couvrir quelques minutes pour que la chaleur pénètre uniformément. Et surtout : on ne réchauffe le riz qu’<strong>une seule fois</strong>. Un aller-retour répété entre réfrigérateur et casserole multiplie les occasions pour d’éventuelles bactéries de se développer.</p>

<h2 id="erreurs-frequentes">Erreurs fréquentes et bons réflexes</h2>
<p>Quelques habitudes, pourtant courantes, méritent d’être corrigées :</p>
<ul>
<li><strong>Laisser la casserole toute la nuit sur la cuisinière</strong> « le temps que ça refroidisse » : c’est justement la situation la plus à risque, même couvercle fermé.</li>
<li><strong>Réchauffer plusieurs fois le même reste</strong> au fil des jours, en piochant à chaque repas dans le même plat resté ouvert.</li>
<li><strong>Mélanger un reste ancien à une portion fraîchement cuite</strong> pour « compléter » un plat : le nouveau riz hérite alors de l’âge du plus vieux.</li>
<li><strong>Ignorer une odeur inhabituelle</strong> par souci de ne pas gaspiller : en matière de riz cuit, le doute doit toujours l’emporter sur l’économie d’une portion.</li>
</ul>
<p>À l’inverse, quelques réflexes simples suffisent à profiter des restes de riz sans inquiétude : cuisiner la juste quantité quand c’est possible, refroidir vite, dater les boîtes, et respecter la limite des 3 à 4 jours. Pour les autres restes de votre cuisine, les mêmes principes de refroidissement rapide et de délais courts s’appliquent, qu’il s’agisse de <a href="/comment-congeler-la-viande-efficacement/">congeler correctement de la viande</a> ou de <a href="/comment-bien-conserver-des-champignons-frais-epluches/">conserver des champignons frais épluchés</a> déjà nettoyés. Et si un doute subsiste après une décongélation, la question des <a href="/decongelation-et-securite-alimentaire-comprendre-les-risques-de-la-recongelation-des-aliments/">risques liés à la recongélation des aliments</a> mérite elle aussi d’être clarifiée avant de se resservir.</p>
`;

const record = {
  slug: SLUG,
  title: TITLE,
  date: DATE,
  modified: DATE,
  category: 'Cuisine',
  tags: [
    'riz cuit',
    'conservation du riz',
    'sécurité alimentaire',
    'restes de cuisine',
    'Bacillus cereus',
    'réfrigérateur',
  ],
  dek: 'Bacillus cereus, refroidissement rapide, durée précise et signes d’alerte : la méthode fiable pour manger vos restes de riz cuit sans risque, ni gaspillage.',
  meta_description: 'Combien de temps conserver un reste de riz cuit au réfrigérateur ? Durées précises, refroidissement, signes d’un riz avarié et bonnes pratiques de réchauffage.',
  image_caption: 'Un reste de riz cuit refroidi rapidement puis conservé dans une boîte hermétique au réfrigérateur.',
  reading_time: 8,
  key_takeaways: [
    'Le riz cuit doit refroidir vite et rejoindre le réfrigérateur dans l’heure ou les deux heures suivant la cuisson.',
    'Conservez-le 3 à 4 jours maximum au réfrigérateur, dans un contenant hermétique et daté.',
    'La toxine liée à Bacillus cereus résiste à la cuisson et au réchauffage : c’est le temps passé à température ambiante qu’il faut limiter, pas la chaleur du repassage.',
    'Ne réchauffez le riz qu’une seule fois, jusqu’à ce qu’il soit uniformément très chaud.',
    'Au moindre doute — odeur, texture filante, délai dépassé — jetez le riz sans le goûter : l’aspect normal ne garantit rien.',
  ],
  toc: [
    { id: 'pourquoi-le-riz-est-a-risque', label: 'Pourquoi le riz cuit est un aliment sensible' },
    { id: 'duree-de-conservation', label: 'Combien de temps le conserver au réfrigérateur ?' },
    { id: 'bien-refroidir-et-stocker', label: 'Bien refroidir et stocker son riz' },
    { id: 'reconnaitre-riz-avarie', label: 'Reconnaître un riz cuit avarié' },
    { id: 'rechauffer-ou-congeler', label: 'Réchauffer ou congeler : ce qu’il faut savoir' },
    { id: 'erreurs-frequentes', label: 'Erreurs fréquentes et bons réflexes' },
  ],
  lead_html,
  body_html,
  faq: [
    {
      q: 'Peut-on manger du riz cuit laissé une nuit à température ambiante ?',
      a_html: '<p>Il est plus prudent de le jeter. Au-delà de deux heures à température ambiante (une heure par temps chaud), le risque de développement de la toxine liée à Bacillus cereus augmente nettement, sans que le riz change forcément d’aspect ou d’odeur.</p>',
    },
    {
      q: 'Combien de temps le riz cuit se conserve-t-il au congélateur ?',
      a_html: '<p>Un riz blanc ou complet nature se congèle bien pendant 1 à 2 mois s’il a été refroidi rapidement puis congelé en portions hermétiques. Un riz déjà mélangé à de la viande, des œufs ou une sauce se conserve plutôt un mois.</p>',
    },
    {
      q: 'Le riz froid est-il dangereux même s’il n’a pas d’odeur particulière ?',
      a_html: '<p>Oui, cela reste possible. La toxine produite en cas de mauvais refroidissement ne modifie pas toujours le goût, l’odeur ou l’aspect du riz. C’est pourquoi il vaut mieux se fier aux délais de conservation qu’à un simple examen visuel ou olfactif.</p>',
    },
    {
      q: 'Peut-on recongeler du riz déjà décongelé ?',
      a_html: '<p>Non, ce n’est pas recommandé. Une fois décongelé, le riz doit être consommé rapidement, si possible réchauffé une seule fois. Le recongeler multiplie les cycles de température et augmente le risque, comme pour la plupart des aliments déjà décongelés.</p>',
    },
    {
      q: 'Comment réchauffer du riz sans le dessécher ni risquer une intoxication ?',
      a_html: '<p>Ajoutez un peu d’eau ou de bouillon avant de réchauffer, à la poêle couverte ou au micro-ondes en remuant à mi-cuisson, jusqu’à ce que le riz soit uniformément très chaud à cœur. Ne le réchauffez qu’une seule fois et ne le laissez pas ensuite retiédir sur le plan de travail.</p>',
    },
    {
      q: 'Le riz complet se conserve-t-il différemment du riz blanc ?',
      a_html: '<p>Les durées de conservation sont proches (3 à 4 jours au réfrigérateur, 1 à 2 mois au congélateur), à condition de respecter le même refroidissement rapide. Le riz complet a tendance à sécher un peu plus vite au réfrigérateur ; un contenant bien hermétique limite ce désagrément.</p>',
    },
  ],
  _gen: { model: 'claude', at: DATE },
};

// 1) article file
const artPath = path.join(ROOT, 'content/articles', SLUG + '.json');
fs.writeFileSync(artPath, JSON.stringify(record, null, 2));
console.log('article →', artPath);

// 2) posts.json entry
const postsPath = path.join(ROOT, 'content/wp-raw/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
if (!posts.some((p) => p.slug === SLUG)) {
  posts.unshift({
    id: 900003,
    slug: SLUG,
    link: `https://www.kl-annuaire.fr/${SLUG}/`,
    pathname: `/${SLUG}/`,
    title: TITLE,
    date: DATE,
    modified: DATE,
    excerpt: 'Durées précises, refroidissement rapide et signes d’alerte : comment conserver un reste de riz cuit au réfrigérateur sans risque pour la santé.',
    categories: [{ name: 'Cuisine', slug: 'cuisine' }],
    featured_source: '',
    featured_alt: 'Bol de riz blanc cuit avec une cuillère, posé près d’une boîte hermétique destinée au réfrigérateur',
  });
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  console.log('posts.json ← entry added');
} else {
  console.log('posts.json already has slug');
}

// 3) images.json entry
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
