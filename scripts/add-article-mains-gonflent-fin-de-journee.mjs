// One-off: add a hand-written editorial article + register its metadata.
// Writes content/articles/<slug>.json and updates content/wp-raw/{posts,images}.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SLUG = 'pourquoi-les-mains-gonflent-elles-en-fin-de-journee';
const TITLE = 'Pourquoi les mains gonflent-elles en fin de journée ?';
const DATE = '2026-07-24T09:10:00';

const lead_html = `<p class="lead">Bagues qui serrent, doigts un peu boudinés, sensation de peau tendue sur le dos des mains : ce léger gonflement en fin de journée est extrêmement courant et, dans l'immense majorité des cas, totalement bénin. Il s'explique par des mécanismes physiologiques simples liés à la gravité, à la circulation et à la chaleur, qui s'accumulent au fil des heures.</p><p>Voici ce qui se passe réellement dans le corps, dans quels cas ce gonflement mérite d'être surveillé, et les gestes simples pour le limiter au quotidien.</p>`;

const body_html = `
<h2 id="mecanisme-physiologique">Ce qui se passe dans le corps au fil de la journée</h2>
<p>Le sang et la lymphe circulent en permanence dans le corps, y compris vers les extrémités — mains et pieds. Le retour de ces liquides vers le cœur dépend en partie de la contraction des muscles et de la position du corps : rester longtemps assis, debout ou avec les bras peu mobiles (devant un écran, au volant, en réunion) ralentit ce retour veineux et lymphatique. Une petite quantité de liquide a alors tendance à stagner dans les tissus des mains, provoquant une sensation de gonflement qui s'installe progressivement dans l'après-midi et se remarque surtout le soir.</p>
<p>Ce phénomène est amplifié par la gravité : les bras restent souvent le long du corps ou légèrement fléchis pendant des heures, ce qui favorise l'accumulation de liquide dans les mains par rapport au reste du corps. C'est exactement le même principe qui fait gonfler les <a href="/pourquoi-les-jambes-gonflent-en-avion-et-comment-leviter/">jambes en avion</a> lors d'une immobilité prolongée.</p>
<div class="kl-callout is-key"><span class="kl-callout__label">À retenir</span><p>Un léger gonflement des mains en fin de journée, sans douleur ni rougeur, est le plus souvent lié à la position, à la chaleur et à la rétention d'eau passagère — pas à un problème de santé sous-jacent.</p></div>

<h2 id="facteurs-qui-aggravent">Les facteurs qui aggravent ce gonflement</h2>
<p>Plusieurs éléments du quotidien peuvent accentuer cette sensation, seuls ou combinés :</p>
<ul>
<li><strong>La chaleur</strong> : elle dilate les vaisseaux sanguins superficiels, ce qui favorise le passage de liquide vers les tissus. Les journées chaudes ou un intérieur surchauffé accentuent nettement le phénomène.</li>
<li><strong>Une consommation de sel élevée</strong> : le sodium retient l'eau dans l'organisme, ce qui peut renforcer la sensation de gonflement en fin de journée, en particulier après un repas salé le midi.</li>
<li><strong>La position prolongée</strong> : bras peu mobiles au clavier, au volant ou en position assise statique pendant plusieurs heures.</li>
<li><strong>Les variations hormonales</strong> : le cycle menstruel, la grossesse ou certains traitements hormonaux peuvent favoriser une rétention d'eau plus marquée à certaines périodes.</li>
<li><strong>Une activité physique inhabituelle</strong> : un effort intense sollicitant les mains (jardinage, bricolage, sport) peut provoquer un gonflement temporaire lié à l'afflux sanguin dans les muscles sollicités.</li>
<li><strong>La déshydratation</strong> : paradoxalement, boire trop peu d'eau pousse le corps à retenir davantage les liquides qu'il a en réserve, ce qui peut aussi contribuer au gonflement.</li>
</ul>

<h2 id="gestes-simples-pour-limiter">Les gestes simples pour limiter le gonflement</h2>
<p>Aucun de ces gestes ne demande de matériel particulier ; ils agissent tous sur la circulation et le retour veineux.</p>
<ol>
<li><strong>Bouger régulièrement les mains et les poignets.</strong> Ouvrir et fermer le poing quelques secondes, faire tourner les poignets toutes les heures relance la circulation.</li>
<li><strong>Surélever les mains quand c'est possible.</strong> Poser les avant-bras plus haut que le cœur quelques minutes (accoudoir surélevé, bras levé) aide le liquide accumulé à redescendre.</li>
<li><strong>S'hydrater suffisamment.</strong> Boire de l'eau régulièrement dans la journée aide le corps à mieux réguler ses fluides plutôt que de les retenir.</li>
<li><strong>Modérer le sel</strong> lors des repas qui précèdent une journée où l'on sait rester longtemps immobile.</li>
<li><strong>Passer les mains sous l'eau fraîche</strong> quelques instants en fin de journée : le froid resserre les vaisseaux superficiels et atténue rapidement la sensation de gonflement.</li>
<li><strong>Retirer les bagues serrées</strong> avant qu'elles ne deviennent difficiles à enlever, notamment en cas de forte chaleur ou d'effort physique prévu.</li>
</ol>
<div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>Un léger massage des mains, des doigts vers le poignet puis vers l'avant-bras, façon « effleurage », aide à faire remonter le liquide accumulé vers la circulation générale. Quelques minutes suffisent en fin de journée.</p></div>

<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Situation</th><th>Gonflement typique</th><th>À faire</th></tr></thead><tbody>
<tr><td>Journée assise, bras statiques</td><td>Léger, progressif, symétrique sur les deux mains</td><td>Bouger les poignets régulièrement, surélever</td></tr>
<tr><td>Forte chaleur ou canicule</td><td>Plus marqué, avec sensation de peau tendue</td><td>Hydratation, eau fraîche, modérer le sel</td></tr>
<tr><td>Après un effort physique inhabituel</td><td>Localisé, disparaît en quelques heures</td><td>Repos, étirement doux, hydratation</td></tr>
<tr><td>Période prémenstruelle ou grossesse</td><td>Cyclique, parfois plus visible le soir</td><td>Surveillance normale, mesures habituelles</td></tr>
</tbody></table></div>

<h2 id="quand-consulter">Quand ce gonflement doit-il alerter ?</h2>
<p>Un gonflement occasionnel, symétrique (les deux mains) et sans autre symptôme n'a rien d'inquiétant. Certains signes, en revanche, justifient un avis médical plus rapide.</p>
<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Situations rassurantes</h4><ul><li>Gonflement léger, qui s'estompe après une nuit de sommeil.</li><li>Les deux mains sont concernées de façon comparable.</li><li>Aucune douleur, aucune rougeur, aucune chaleur locale.</li><li>Le gonflement suit un événement identifiable (chaleur, repas salé, effort).</li></ul></div><div class="kl-compare__col is-con"><h4>Signes qui justifient une consultation</h4><ul><li>Gonflement asymétrique, touchant une seule main.</li><li>Douleur, rougeur, chaleur ou engourdissement associés.</li><li>Gonflement qui s'installe brutalement et ne diminue pas.</li><li>Essoufflement, gonflement des jambes ou du visage associés.</li></ul></div></div>
<p>Un gonflement persistant accompagné d'autres signes de rétention d'eau généralisée, ou d'engourdissement dans les doigts la nuit, mérite d'en parler à un médecin ou un pharmacien : ce dernier point rejoint d'ailleurs les mécanismes évoqués pour les <a href="/pourquoi-jai-des-crampes-aux-mollets-la-nuit-et-comment-les-eviter/">crampes nocturnes aux mollets</a>, souvent liées elles aussi à la circulation.</p>
<blockquote class="kl-quote">Un gonflement symétrique, indolore et qui s'estompe la nuit reste, dans l'immense majorité des cas, un phénomène banal de circulation — pas un signal d'alarme.<cite>— Principe de base en médecine générale</cite></blockquote>

<h2 id="cas-particuliers">Les cas particuliers à connaître</h2>
<p>Certaines mains sont plus sensibles à ce phénomène que d'autres, pour des raisons propres à chacun.</p>
<ul>
<li><strong>Mains habituellement froides</strong> : une mauvaise circulation périphérique, comme évoquée pour les <a href="/pourquoi-jai-toujours-les-mains-froides-explications-et-solutions/">mains froides en permanence</a>, peut aussi s'accompagner d'un gonflement plus marqué en fin de journée, les deux étant liés à la façon dont le sang circule dans les extrémités.</li>
<li><strong>Travail manuel répétitif</strong> : les métiers sollicitant beaucoup les mains (clavier, outils, instruments) peuvent provoquer un gonflement localisé lié à la fois à l'effort musculaire et à une position statique des poignets.</li>
<li><strong>Voyages en avion ou longs trajets</strong> : la combinaison immobilité + altitude ou position assise prolongée favorise un gonflement qui touche souvent mains et jambes en même temps.</li>
<li><strong>Grossesse</strong> : la rétention d'eau est plus fréquente, en particulier au troisième trimestre ; un suivi médical régulier permet de distinguer ce qui reste normal de ce qui ne l'est pas.</li>
</ul>

<div class="kl-stat-row"><div class="kl-stat"><b>2</b><span>mains concernées si c'est bénin</span></div><div class="kl-stat"><b>1 nuit</b><span>suffit souvent à faire dégonfler</span></div><div class="kl-stat"><b>1,5 L</b><span>d'eau environ, un repère d'hydratation quotidienne courant</span></div></div>
<p>Pour d'autres explications sur les petits désagréments physiologiques du quotidien, la <a href="/rubrique/sante/">rubrique Santé</a> de KL-Annuaire regroupe d'autres guides pratiques et rassurants.</p>
`;

const record = {
  slug: SLUG,
  title: TITLE,
  date: DATE,
  modified: DATE,
  category: 'Santé',
  tags: [
    'mains gonflées',
    'circulation sanguine',
    'rétention d\'eau',
    'santé au quotidien',
    'bien-être',
  ],
  dek: 'Bagues qui serrent, doigts un peu boudinés le soir : un phénomène courant, le plus souvent bénin, lié à la position et à la circulation — explications et gestes simples pour le limiter.',
  meta_description: 'Pourquoi les mains gonflent en fin de journée : causes (position, chaleur, sel), gestes pour limiter le phénomène et signes qui doivent alerter.',
  image_caption: 'Un léger gonflement des mains en fin de journée est courant et généralement bénin, lié à la position et à la circulation.',
  reading_time: 7,
  key_takeaways: [
    'Le gonflement des mains en fin de journée est le plus souvent lié à la position assise prolongée, à la chaleur et à une rétention d\'eau passagère.',
    'La chaleur, le sel, la déshydratation et l\'immobilité prolongée accentuent ce phénomène tout à fait courant.',
    'Bouger régulièrement les poignets, surélever les mains, s\'hydrater et modérer le sel suffisent souvent à limiter le gonflement.',
    'Un gonflement symétrique, indolore, qui s\'estompe pendant la nuit n\'a rien d\'inquiétant.',
    'Un gonflement asymétrique, douloureux, brutal ou associé à d\'autres symptômes justifie un avis médical.',
  ],
  toc: [
    { id: 'mecanisme-physiologique', label: 'Ce qui se passe dans le corps' },
    { id: 'facteurs-qui-aggravent', label: 'Les facteurs qui aggravent le gonflement' },
    { id: 'gestes-simples-pour-limiter', label: 'Les gestes pour limiter le gonflement' },
    { id: 'quand-consulter', label: 'Quand ce gonflement doit-il alerter ?' },
    { id: 'cas-particuliers', label: 'Les cas particuliers à connaître' },
  ],
  lead_html,
  body_html,
  faq: [
    {
      q: 'Le gonflement des mains en fin de journée est-il normal ?',
      a_html: '<p>Oui, dans la grande majorité des cas. Il s\'explique par la position assise ou statique prolongée, la chaleur et une légère rétention d\'eau qui s\'accumule au fil de la journée. Tant qu\'il touche les deux mains de façon comparable, sans douleur ni rougeur, il n\'a rien d\'inquiétant.</p>',
    },
    {
      q: 'Pourquoi mes bagues serrent-elles davantage le soir ?',
      a_html: '<p>Parce que le léger gonflement des doigts s\'accentue au fil de la journée sous l\'effet de la position, de la chaleur et de la circulation. C\'est un phénomène normal qui s\'atténue généralement pendant la nuit, quand le corps est allongé et les mains moins sollicitées.</p>',
    },
    {
      q: 'Que faire immédiatement pour faire dégonfler ses mains ?',
      a_html: '<p>Passer les mains sous l\'eau fraîche, les surélever quelques minutes au-dessus du niveau du cœur, et faire quelques mouvements de rotation des poignets. Ces gestes simples relancent la circulation et atténuent rapidement la sensation de gonflement.</p>',
    },
    {
      q: 'Le sel a-t-il vraiment un impact sur le gonflement des mains ?',
      a_html: '<p>Oui. Le sodium favorise la rétention d\'eau dans l\'organisme. Un repas très salé au cours de la journée peut accentuer la sensation de gonflement des mains en fin d\'après-midi, en particulier associé à la chaleur ou à l\'immobilité.</p>',
    },
    {
      q: 'Le gonflement des mains peut-il être lié à la grossesse ?',
      a_html: '<p>Oui, la rétention d\'eau est plus fréquente pendant la grossesse, en particulier au troisième trimestre. Un suivi médical régulier permet de vérifier que ce gonflement reste dans les limites habituelles et de repérer rapidement tout signe qui sortirait de l\'ordinaire.</p>',
    },
    {
      q: 'Faut-il s\'inquiéter si une seule main gonfle ?',
      a_html: '<p>Un gonflement limité à une seule main, surtout s\'il est associé à une douleur, une rougeur, une chaleur locale ou un engourdissement, mérite un avis médical. Ce n\'est plus le schéma habituel d\'un gonflement bénin lié à la position ou à la chaleur.</p>',
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
    id: 900021,
    slug: SLUG,
    link: `https://www.kl-annuaire.fr/${SLUG}/`,
    pathname: `/${SLUG}/`,
    title: TITLE,
    date: DATE,
    modified: DATE,
    excerpt: 'Un léger gonflement des mains en fin de journée est courant et généralement bénin : causes, gestes simples pour le limiter et signes qui doivent alerter.',
    categories: [{ name: 'Santé', slug: 'sante' }],
    featured_source: '',
    featured_alt: 'Gros plan sur des mains légèrement gonflées en fin de journée, éclairées par une lumière douce',
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
