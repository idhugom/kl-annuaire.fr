// One-off: add a hand-written editorial article + register its metadata.
// Writes content/articles/<slug>.json and updates content/wp-raw/{posts,images}.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SLUG = 'comment-enlever-une-tache-de-vin-rouge-sechee-sur-un-tapis-en-laine';
const TITLE = 'Comment enlever une tache de vin rouge séchée sur un tapis en laine ?';
const DATE = '2026-07-23T09:15:00';

const lead_html = `<p class="lead">Une tache de vin rouge fraîche se rattrape presque toujours. Séchée depuis plusieurs heures — voire plusieurs jours — sur un tapis en laine, elle a eu le temps de pénétrer les fibres et de s'oxyder, et le pigment devient beaucoup plus difficile à déloger. Ce n'est pas pour autant une cause perdue : avec la bonne méthode, dans le bon ordre, une tache ancienne peut redevenir invisible sans abîmer la laine.</p><p>Voici une marche à suivre détaillée, pensée spécifiquement pour la laine — une fibre naturelle fragile qui ne supporte ni l'eau bouillante, ni le frottement énergique, ni certains produits trop agressifs.</p>`;

const body_html = `
<h2 id="pourquoi-le-vin-seche-est-plus-difficile">Pourquoi une tache de vin séchée est plus tenace</h2>
<p>Le vin rouge contient des pigments appelés anthocyanes, issus de la peau du raisin, ainsi que des tanins. Tant que la tache est humide, ces pigments restent en surface des fibres et s'évacuent relativement facilement avec de l'eau et un peu de patience. Une fois séchée, l'eau s'évapore et les pigments se concentrent, se fixent en profondeur dans la fibre de laine et, au contact de l'air et de la lumière, commencent à s'oxyder — un peu comme une pomme coupée qui brunit. C'est cette oxydation qui donne aux vieilles taches de vin leur teinte brun-violacé caractéristique, plus difficile à dissoudre qu'une tache fraîche.</p>
<p>La laine complique encore la donne : c'est une fibre protéique, sensible aux températures élevées (elle feutre et rétrécit dans l'eau chaude) et à certains produits alcalins qui peuvent l'abîmer durablement. Il faut donc une méthode douce, progressive, et surtout de la patience — une tache ancienne se traite rarement en un seul passage.</p>
<div class="kl-callout is-key"><span class="kl-callout__label">À retenir</span><p>Sur une tache de vin séchée, l'objectif n'est pas de « frotter plus fort » mais de réhydrater et de dissoudre le pigment par étapes successives, sans jamais chauffer ni brosser énergiquement la laine.</p></div>

<h2 id="materiel-necessaire">Le matériel à réunir avant de commencer</h2>
<p>Mieux vaut tout préparer avant d'attaquer la tache, pour ne pas la laisser réhumidifiée sans surveillance entre deux allers-retours à la cuisine.</p>
<ul>
<li>Un chiffon en microfibre blanc ou une éponge propre (jamais de couleur, qui pourrait déteindre).</li>
<li>De l'eau tiède (jamais chaude) et, idéalement, de l'eau gazeuse ou pétillante.</li>
<li>Du savon de Marseille ou du liquide vaisselle doux, sans colorant.</li>
<li>Du vinaigre blanc, dilué.</li>
<li>Éventuellement de l'eau oxygénée à 10 volumes (pour les taches vraiment incrustées sur un tapis clair) et du bicarbonate de soude.</li>
<li>Un couteau à bout rond ou une cuillère pour gratter délicatement les résidus secs.</li>
</ul>
<div class="kl-callout is-warning"><span class="kl-callout__label">Vigilance</span><p>Avant tout traitement, testez toujours le produit choisi sur un coin discret du tapis (une frange, l'envers, un angle sous un meuble) et attendez quelques minutes pour vérifier l'absence de décoloration. La laine teinte de façon naturelle peut réagir différemment selon les colorants utilisés par le fabricant.</p></div>

<h2 id="methode-etape-par-etape">La méthode étape par étape</h2>
<p>Cette méthode fonctionne pour la grande majorité des taches de vin séchées sur laine. Elle demande de la constance : mieux vaut répéter un cycle doux trois fois qu'appliquer un produit fort une seule fois.</p>
<ol>
<li><strong>Dépoussiérer et gratter à sec.</strong> Retirez délicatement les résidus secs et croûteux à l'aide du dos d'un couteau, en grattant vers le centre de la tache pour ne pas l'étaler davantage.</li>
<li><strong>Réhydrater la tache.</strong> Imbibez un chiffon d'eau tiède (ou d'eau gazeuse, dont les bulles aident à faire remonter le pigment) et tamponnez la tache sans frotter, en partant des bords vers le centre. Laissez agir 5 à 10 minutes : le pigment séché doit se ramollir.</li>
<li><strong>Absorber immédiatement.</strong> Avec un chiffon sec propre, tamponnez fermement pour transférer un maximum de pigment du tapis vers le tissu. Changez de zone de chiffon dès qu'elle se colore.</li>
<li><strong>Appliquer le savon doux.</strong> Diluez quelques gouttes de savon de Marseille liquide ou de liquide vaisselle dans de l'eau tiède, appliquez sur la tache avec le chiffon, laissez poser 5 minutes puis tamponnez à nouveau à l'eau claire pour rincer.</li>
<li><strong>Renforcer avec le vinaigre si nécessaire.</strong> Si la trace persiste, appliquez un mélange à parts égales de vinaigre blanc et d'eau tiède, laissez agir 10 minutes, puis rincez en tamponnant à l'eau claire.</li>
<li><strong>Sécher à plat, à l'air libre.</strong> Épongez l'excès d'humidité avec un chiffon sec, puis laissez sécher naturellement, loin d'une source de chaleur directe, idéalement avec un ventilateur pour accélérer le séchage sans chauffer la fibre.</li>
</ol>
<p>Sur une tache particulièrement ancienne ou incrustée, il n'est pas rare de devoir répéter les étapes 2 à 5 sur plusieurs jours, en laissant sécher entre chaque cycle. L'estompage progressif est normal et vaut mieux qu'un traitement trop agressif en une seule fois.</p>

<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Type de tache</th><th>Traitement recommandé</th><th>Points de vigilance</th></tr></thead><tbody>
<tr><td>Tache fraîche (moins de 30 min)</td><td>Eau gazeuse + tamponnage immédiat</td><td>Agir vite, ne jamais frotter</td></tr>
<tr><td>Tache séchée récente (quelques heures à un jour)</td><td>Réhydratation + savon doux + vinaigre</td><td>Plusieurs passages, séchage à l'air</td></tr>
<tr><td>Tache ancienne incrustée (plusieurs jours à semaines)</td><td>Cycles répétés + eau oxygénée diluée sur tapis clair</td><td>Test préalable obligatoire, patience</td></tr>
<tr><td>Tapis en laine teintée foncée ou motifs</td><td>Méthode douce uniquement, éviter l'eau oxygénée</td><td>Risque de décoloration localisée</td></tr>
</tbody></table></div>

<h2 id="cas-des-taches-tres-incrustees">Le cas des taches très incrustées et anciennes</h2>
<p>Si la méthode douce ne suffit pas après plusieurs cycles, deux options existent pour aller plus loin — à réserver aux tapis de laine clairs, jamais aux teintes foncées ou aux motifs délicats.</p>
<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Eau oxygénée diluée</h4><ul><li>Efficace sur les pigments oxydés incrustés.</li><li>À diluer avec de l'eau (moitié-moitié) et tester impérativement au préalable.</li><li>Réservée aux laines claires ou écrues.</li></ul></div><div class="kl-compare__col is-con"><h4>Pâte de bicarbonate</h4><ul><li>Plus douce, absorbe l'humidité résiduelle et aide à faire remonter le pigment.</li><li>À laisser poser puis aspirer une fois sec.</li><li>Convient à toutes les couleurs de laine.</li></ul></div></div>
<p>Pour un tapis ancien, précieux, ou en laine de grande valeur (tapis noué à la main, laine mérinos haut de gamme), il est souvent plus sage de faire appel à un professionnel du nettoyage textile plutôt que de risquer une décoloration irréversible avec des produits trop puissants. Le coût d'un nettoyage professionnel reste généralement raisonnable au regard de la valeur du tapis.</p>
<blockquote class="kl-quote">Sur la laine, la patience bat toujours la force : trois passages doux valent mieux qu'un frottement énergique qui feutre la fibre.<cite>— Principe de base de l'entretien textile</cite></blockquote>

<h2 id="erreurs-a-eviter">Les erreurs qui aggravent la tache</h2>
<p>Certains réflexes, pourtant intuitifs, peuvent transformer une tache traitable en dégât permanent sur un tapis en laine.</p>
<ul>
<li><strong>Frotter énergiquement</strong> : cela étale le pigment, l'enfonce plus profondément dans la fibre et peut feutrer la laine de façon irréversible.</li>
<li><strong>Utiliser de l'eau chaude ou bouillante</strong> : la chaleur « cuit » littéralement le pigment dans la fibre et peut faire rétrécir ou feutrer la laine.</li>
<li><strong>Appliquer du sel</strong> : une astuce répandue pour le vin frais, totalement inefficace — voire aggravante — sur une tache déjà séchée.</li>
<li><strong>Mélanger javel et vinaigre ou ammoniaque</strong> : outre le risque chimique (émanations toxiques), la javel n'a de toute façon rien à faire sur de la laine, qu'elle dégrade et jaunit.</li>
<li><strong>Sécher au sèche-cheveux ou près d'un radiateur</strong> : la chaleur fixe les pigments restants au lieu de les laisser s'estomper au fil des passages.</li>
</ul>
<div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>Entre deux cycles de traitement, aspirez légèrement la zone une fois sèche : cela retire les particules de pigment qui ont remonté à la surface et évite qu'elles ne se redéposent au passage suivant.</p></div>

<h2 id="prevenir-les-taches-de-vin">Prévenir plutôt que traiter : quelques réflexes utiles</h2>
<p>Un tapis en laine bien entretenu résiste mieux aux taches et vieillit plus lentement. Quelques habitudes simples limitent les dégâts en cas d'accident.</p>
<ul>
<li>Appliquer un traitement anti-taches spécial laine lors de l'achat ou du nettoyage professionnel annuel : il ne rend pas le tapis imperméable, mais ralentit la pénétration des liquides et laisse plus de temps pour réagir.</li>
<li>Garder une bouteille d'eau gazeuse et des chiffons blancs à portée de main lors des repas ou apéritifs organisés sur le tapis.</li>
<li>Passer l'aspirateur régulièrement : un tapis propre en profondeur retient moins les taches en surface. Un <a href="/le-balai-vapeur-quels-sont-ses-avantages/">balai vapeur</a> peut également compléter l'entretien courant sur les zones sans tapis.</li>
<li>Faire tourner ou pivoter le tapis de temps à autre pour répartir l'usure et l'exposition à la lumière, qui accélère l'oxydation des taches anciennes non traitées.</li>
</ul>
<p>D'autres taches domestiques répondent à des logiques similaires de douceur et de patience : c'est le cas par exemple des <a href="/quelles-techniques-de-nettoyage-sont-adaptees-pour-les-taches-dhuile-sur-le-lino/">taches d'huile sur le lino</a> ou des résidus de <a href="/comment-enlever-du-silicone-sur-du-tissu-facilement/">silicone sur un tissu</a>, deux cas où frotter trop fort aggrave davantage la situation qu'il ne la résout. Pour d'autres astuces d'entretien de la maison, la <a href="/rubrique/maison/">rubrique Maison</a> de KL-Annuaire recense d'autres guides pratiques.</p>
<div class="kl-stat-row"><div class="kl-stat"><b>10 min</b><span>de pose avant tamponnage</span></div><div class="kl-stat"><b>3 à 5</b><span>cycles doux pour une tache ancienne</span></div><div class="kl-stat"><b>48 h</b><span>de séchage avant de rejuger le résultat</span></div></div>
`;

const record = {
  slug: SLUG,
  title: TITLE,
  date: DATE,
  modified: DATE,
  category: 'Maison',
  tags: [
    'tache de vin',
    'tapis en laine',
    'entretien textile',
    'nettoyage maison',
    'astuces ménage',
  ],
  dek: 'Une tache de vin rouge séchée sur un tapis en laine n\'est pas une fatalité : la méthode douce et progressive, étape par étape, pour la faire disparaître sans abîmer la fibre.',
  meta_description: 'Comment enlever une tache de vin rouge séchée sur un tapis en laine : méthode douce, produits adaptés, erreurs à éviter et astuces de prévention.',
  image_caption: 'Le traitement d\'une tache de vin séchée sur un tapis en laine demande douceur et patience : plusieurs passages doux valent mieux qu\'un frottement énergique.',
  reading_time: 8,
  key_takeaways: [
    'Une tache de vin séchée s\'est oxydée et fixée dans la fibre : elle se traite par réhydratation et tamponnage répété, jamais par frottement.',
    'La laine ne supporte ni l\'eau chaude, ni la javel, ni le frottement énergique — au risque de feutrer ou décolorer la fibre durablement.',
    'La méthode de base : gratter à sec, réhydrater, tamponner, savon doux, vinaigre dilué si besoin, puis séchage à l\'air libre.',
    'Sur les taches très incrustées, l\'eau oxygénée diluée peut aider, mais uniquement sur laine claire et après un test préalable.',
    'Toujours tester un produit sur une zone discrète avant application, et privilégier plusieurs cycles doux plutôt qu\'un traitement unique agressif.',
  ],
  toc: [
    { id: 'pourquoi-le-vin-seche-est-plus-difficile', label: 'Pourquoi la tache séchée est plus tenace' },
    { id: 'materiel-necessaire', label: 'Le matériel à réunir' },
    { id: 'methode-etape-par-etape', label: 'La méthode étape par étape' },
    { id: 'cas-des-taches-tres-incrustees', label: 'Le cas des taches très incrustées' },
    { id: 'erreurs-a-eviter', label: 'Les erreurs à éviter' },
    { id: 'prevenir-les-taches-de-vin', label: 'Prévenir les taches de vin' },
  ],
  lead_html,
  body_html,
  faq: [
    {
      q: 'Une tache de vin rouge séchée depuis plusieurs jours peut-elle vraiment partir ?',
      a_html: '<p>Oui, dans la grande majorité des cas, à condition d\'être patient. Le pigment séché doit être réhydraté progressivement puis dissous par plusieurs cycles doux (eau tiède, savon, vinaigre dilué). Une tache très ancienne peut nécessiter trois à cinq passages étalés sur plusieurs jours plutôt qu\'un seul traitement intensif.</p>',
    },
    {
      q: 'Peut-on utiliser de l\'eau oxygénée sur toutes les couleurs de laine ?',
      a_html: '<p>Non. L\'eau oxygénée diluée est réservée aux tapis en laine claire ou écrue, après un test sur une zone discrète. Sur une laine teintée foncée ou à motifs, elle peut décolorer localement le tapis : mieux vaut s\'en tenir à la méthode douce (eau, savon, vinaigre) ou solliciter un professionnel.</p>',
    },
    {
      q: 'Le bicarbonate de soude fonctionne-t-il seul sur une tache de vin ?',
      a_html: '<p>Le bicarbonate est surtout utile en complément : appliqué en pâte sur une tache humide, il absorbe une partie du liquide et du pigment en séchant, avant d\'être aspiré. Il ne remplace pas le tamponnage à l\'eau et au savon, mais peut accélérer le processus sur les taches encore un peu humides.</p>',
    },
    {
      q: 'Faut-il frotter fort pour faire partir une tache ancienne ?',
      a_html: '<p>Non, c\'est justement l\'erreur à éviter. Frotter énergiquement étale le pigment, l\'enfonce plus profondément dans la fibre et risque de feutrer la laine de façon irréversible. Il faut toujours tamponner, jamais frotter, en partant des bords vers le centre de la tache.</p>',
    },
    {
      q: 'Quand vaut-il mieux appeler un professionnel du nettoyage de tapis ?',
      a_html: '<p>Si la tache résiste après plusieurs cycles de traitement doux, ou s\'il s\'agit d\'un tapis en laine précieux (noué main, laine haut de gamme, teintes délicates), un nettoyage professionnel évite de prendre le risque d\'endommager le tapis avec des produits trop puissants.</p>',
    },
    {
      q: 'Comment éviter que les taches de vin ne s\'incrustent la prochaine fois ?',
      a_html: '<p>Gardez à portée de main de l\'eau gazeuse et des chiffons blancs lors des repas, traitez toute tache le plus tôt possible sans attendre qu\'elle sèche, et faites appliquer un traitement anti-taches spécial laine lors de l\'entretien annuel du tapis.</p>',
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
    id: 900019,
    slug: SLUG,
    link: `https://www.kl-annuaire.fr/${SLUG}/`,
    pathname: `/${SLUG}/`,
    title: TITLE,
    date: DATE,
    modified: DATE,
    excerpt: 'Une tache de vin séchée sur un tapis en laine se traite par réhydratation douce et tamponnages répétés, jamais par frottement : la méthode complète, étape par étape.',
    categories: [{ name: 'Maison', slug: 'maison' }],
    featured_source: '',
    featured_alt: 'Gros plan sur un tapis en laine avec une tache de vin rouge et un chiffon blanc posé à côté pour le nettoyage',
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
