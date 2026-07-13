// One-off: add a hand-written editorial article + register its metadata.
// Writes content/articles/<slug>.json and updates content/wp-raw/{posts,images}.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SLUG = 'comment-enlever-une-tache-de-graisse-sechee-sur-un-canape-en-tissu';
const TITLE = 'Comment enlever une tache de graisse séchée sur un canapé en tissu ?';
const DATE = '2026-07-13T15:00:00';

const lead_html = `<p class="lead">Une auréole de gras découverte des jours après l’incident — une part de pizza posée trop vite, une main mal essuyée — pose un problème différent d’une tache fraîche : la graisse a eu le temps de pénétrer les fibres et de durcir. Elle reste pourtant loin d’être irrécupérable, à condition d’agir avec méthode plutôt qu’en multipliant les produits au hasard.</p><p>Voici une marche à suivre fiable pour traiter une tache de graisse séchée sur un canapé en tissu, du diagnostic du textile jusqu’au geste final, en évitant les erreurs qui abîment le tissu sans faire disparaître la tache.</p>`;

const body_html = `
<h2 id="pourquoi-la-graisse-seche-resiste">Pourquoi une tache de graisse séchée résiste tant</h2>
<p>Une tache de graisse fraîche reste en surface quelques minutes : c’est la fenêtre idéale pour l’absorber avant qu’elle ne migre plus profondément. Une fois sèche, la matière grasse a eu le temps de s’infiltrer entre les fibres du tissu et parfois jusque dans la mousse du coussin. L’eau seule ne suffit alors plus, car les corps gras ne se dissolvent pas dans l’eau : il faut soit les dissoudre avec un solvant adapté, soit les capter avec une poudre absorbante avant de les rincer.</p>
<p>C’est pourquoi frotter énergiquement avec une éponge humide, réflexe le plus courant, se révèle souvent inefficace sur une tache ancienne : le geste étale la graisse sur une zone plus large sans l’extraire réellement, et peut même l’enfoncer davantage dans le rembourrage.</p>
<div class="kl-callout is-key"><span class="kl-callout__label">À retenir</span><p>Sur une tache de graisse séchée, l’objectif du premier geste n’est pas de laver, mais d’<strong>absorber</strong> : une poudre adaptée capte le gras avant tout passage à l’eau ou au solvant.</p></div>

<h2 id="identifier-le-tissu-avant-d-agir">Identifier le tissu avant d’agir</h2>
<p>Avant de choisir un produit, regardez l’étiquette d’entretien cousue sous l’assise ou le dossier du canapé, souvent repérable par un code lettré : <strong>W</strong> (nettoyage à l’eau autorisé), <strong>S</strong> (solvant uniquement, pas d’eau), <strong>WS</strong> (les deux possibles) ou <strong>X</strong> (aspirateur uniquement, aucun produit). Cette information conditionne toute la suite du traitement, bien plus que le type de graisse en cause.</p>
<p>En l’absence d’étiquette, observez le tissu : un velours, un daim synthétique, une microfibre délicate ou un tissu à motifs imprimés tolèrent moins bien l’eau et le frottement qu’une toile de coton épaisse ou un tissu déhoussable lavable. Dans le doute, ou sur un canapé de valeur, un test discret dans un coin caché (sous un coussin, à l’arrière) reste indispensable avant toute application sur la zone visible.</p>
<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Code étiquette</th><th>Signification</th><th>Approche recommandée</th></tr></thead><tbody>
<tr><td>W</td><td>Nettoyage à l’eau toléré</td><td>Poudre absorbante puis produit à base d’eau, en tamponnant</td></tr>
<tr><td>S</td><td>Solvant uniquement, pas d’eau</td><td>Poudre absorbante puis solvant textile compatible, test préalable obligatoire</td></tr>
<tr><td>WS</td><td>Eau et solvant tolérés</td><td>Le plus souple : commencer par la méthode la plus douce (eau et savon)</td></tr>
<tr><td>X</td><td>Aspirateur uniquement</td><td>Ne pas appliquer de produit ; faire appel à un professionnel</td></tr>
</tbody></table></div>

<h2 id="les-etapes-pour-detacher-la-graisse-sechee">Les étapes pour détacher une graisse séchée</h2>
<p>Une fois le tissu identifié, la méthode se déroule en plusieurs temps, sans précipitation :</p>
<ol>
<li><strong>Dépoussiérez la zone</strong> à l’aspirateur avec un embout brosse doux, pour ne pas travailler sur des fibres chargées de poussière qui compliqueraient l’absorption.</li>
<li><strong>Saupoudrez une poudre absorbante</strong> — terre de Sommières, amidon de maïs ou, à défaut, du talc — généreusement sur la tache. Cette poudre capte progressivement les corps gras logés dans les fibres.</li>
<li><strong>Laissez agir plusieurs heures</strong>, idéalement une nuit entière. Plus le temps de pose est long, plus la poudre a le temps d’absorber la graisse en profondeur.</li>
<li><strong>Brossez et aspirez</strong> délicatement pour retirer toute la poudre, qui doit apparaître légèrement grisée ou jaunie si elle a bien capté du gras.</li>
<li><strong>Traitez le résidu</strong> selon le code d’étiquette (eau savonneuse tamponnée pour W/WS, solvant textile testé au préalable pour S), en travaillant toujours du bord vers le centre de la tache pour éviter de l’agrandir.</li>
<li><strong>Rincez et séchez à l’air libre</strong>, sans sèche-cheveux ni exposition directe au soleil, qui peuvent fixer un résidu ou décolorer le tissu.</li>
</ol>
<div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>Si la tache a plusieurs jours et semble incrustée, répétez le cycle poudre absorbante + pose longue deux ou trois fois avant de passer au produit liquide : chaque passage retire un peu plus de gras et limite le recours à des solvants plus agressifs.</p></div>

<h2 id="produits-menagers-efficaces">Quels produits utiliser selon la situation</h2>
<p>Plusieurs solutions courantes se complètent selon la nature du tissu et l’ancienneté de la tache. Aucune n’agit instantanément sur une graisse bien sèche : c’est la répétition méthodique qui fait la différence.</p>
<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Produit</th><th>Usage</th><th>Précaution</th></tr></thead><tbody>
<tr><td>Terre de Sommières</td><td>Absorbant en poudre, à appliquer sec avant tout autre traitement</td><td>Aucune, sauf sur tissus très clairs où un léger voile peut apparaître (à brosser)</td></tr>
<tr><td>Savon de Marseille ou liquide vaisselle dégraissant</td><td>Dilué dans un peu d’eau tiède, appliqué en tamponnant (tissus W ou WS)</td><td>Rincer soigneusement pour ne pas laisser d’auréole de résidu de savon</td></tr>
<tr><td>Solvant textile spécifique</td><td>Sur tissus classés S, en tamponnant avec un chiffon blanc</td><td>Test obligatoire en zone cachée, pièce ventilée, éloigné de toute flamme</td></tr>
<tr><td>Bicarbonate de soude</td><td>En complément de la poudre absorbante, sur taches légères</td><td>Moins efficace seul sur une graisse déjà bien incrustée</td></tr>
</tbody></table></div>
<p>Sur un canapé en cuir ou en simili, ces méthodes ne s’appliquent pas de la même façon : le cuir demande des produits spécifiques et une hydratation adaptée après nettoyage, sous peine de le dessécher. En cas de doute, mieux vaut se limiter à l’absorption par poudre et confier la suite à un professionnel.</p>

<h2 id="erreurs-a-eviter">Erreurs fréquentes qui aggravent la tache</h2>
<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Bons réflexes</h4><ul><li>Tester tout produit sur une zone cachée avant application.</li><li>Travailler du bord vers le centre, par petites touches.</li><li>Laisser la poudre absorbante agir plusieurs heures avant de rincer.</li><li>Sécher à l’air libre, loin d’une source de chaleur directe.</li></ul></div><div class="kl-compare__col is-con"><h4>Erreurs à éviter</h4><ul><li>Frotter énergiquement dès la découverte de la tache.</li><li>Appliquer de l’eau chaude, qui peut fixer certaines graisses.</li><li>Mélanger plusieurs produits chimiques sans rinçage entre chaque.</li><li>Utiliser un sèche-cheveux pour accélérer le séchage.</li></ul></div></div>
<p>Une autre erreur fréquente consiste à traiter uniquement la tache visible en surface sans s’assurer que le rembourrage n’a pas lui aussi absorbé de la graisse. Sur un coussin déhoussable, il est parfois utile de vérifier l’envers du tissu et, si besoin, de traiter légèrement la mousse avec un chiffon à peine humide, sans jamais la tremper.</p>

<h2 id="prevenir-et-entretenir">Prévenir les taches et savoir quand consulter un professionnel</h2>
<p>Le meilleur moment pour traiter une tache de graisse reste les premières minutes, avant qu’elle ne sèche : éponger sans frotter avec un papier absorbant, puis appliquer une poudre absorbante immédiatement, permet souvent d’éviter le stade de la tache incrustée. Garder un petit stock de terre de Sommières ou d’amidon de maïs à portée de main dans un placard proche du salon facilite ce réflexe.</p>
<p>Pour l’entretien courant, un passage régulier à l’aspirateur limite l’accumulation de poussière qui complique le détachage, et un nettoyage à la vapeur, adapté aux tissus qui le tolèrent, permet de rafraîchir l’assise sans produit chimique. Pour d’autres taches tenaces du quotidien, les mêmes principes de test préalable et de traitement doux s’appliquent, qu’il s’agisse d’une <a href="/comment-enlever-du-silicone-sur-du-tissu-facilement/">tache de silicone sur un tissu</a> ou de <a href="/quelles-techniques-de-nettoyage-sont-adaptees-pour-les-taches-dhuile-sur-le-lino/">taches d’huile sur un sol en lino</a>. Un appareil comme <a href="/le-balai-vapeur-quels-sont-ses-avantages/">le balai vapeur</a> peut d’ailleurs compléter utilement l’entretien général du salon, en dehors des zones tachées de graisse.</p>
<div class="kl-callout is-warning"><span class="kl-callout__label">Avertissement</span><p>Sur un canapé ancien, de grande valeur, en tissu très délicat ou déjà fragilisé, l’essai d’un produit maison peut coûter plus cher que le recours immédiat à un nettoyeur professionnel spécialisé dans l’ameublement. En cas de doute, demandez conseil avant d’intervenir.</p></div>
`;

const record = {
  slug: SLUG,
  title: TITLE,
  date: DATE,
  modified: DATE,
  category: 'Maison',
  tags: [
    'tache de graisse',
    'canapé en tissu',
    'nettoyage textile',
    'détachage',
    'entretien canapé',
    'terre de Sommières',
  ],
  dek: 'Graisse séchée incrustée dans les fibres : la méthode en plusieurs étapes, poudre absorbante puis traitement adapté au tissu, pour un canapé net sans l’abîmer.',
  meta_description: 'Comment enlever une tache de graisse séchée sur un canapé en tissu : identifier le tissu, poudre absorbante, produits adaptés et erreurs à éviter.',
  image_caption: 'Traitement d’une tache de graisse séchée sur un canapé en tissu avec une poudre absorbante avant rinçage.',
  reading_time: 8,
  key_takeaways: [
    'Une graisse séchée s’enlève d’abord par absorption (poudre), jamais par frottement direct qui l’étale et l’enfonce dans les fibres.',
    'Vérifiez le code d’entretien du tissu (W, S, WS, X) avant tout produit : il conditionne l’usage ou non de l’eau.',
    'Laissez la poudre absorbante agir plusieurs heures, si possible une nuit entière, avant de brosser et de traiter le résidu.',
    'Testez systématiquement tout produit sur une zone cachée, et travaillez du bord vers le centre de la tache.',
    'Sur un tissu délicat, ancien ou classé X, limitez-vous à l’aspirateur et à l’absorption, et faites appel à un professionnel.',
  ],
  toc: [
    { id: 'pourquoi-la-graisse-seche-resiste', label: 'Pourquoi une graisse séchée résiste tant' },
    { id: 'identifier-le-tissu-avant-d-agir', label: 'Identifier le tissu avant d’agir' },
    { id: 'les-etapes-pour-detacher-la-graisse-sechee', label: 'Les étapes pour détacher la graisse séchée' },
    { id: 'produits-menagers-efficaces', label: 'Quels produits utiliser selon la situation' },
    { id: 'erreurs-a-eviter', label: 'Erreurs fréquentes qui aggravent la tache' },
    { id: 'prevenir-et-entretenir', label: 'Prévenir les taches et consulter un pro' },
  ],
  lead_html,
  body_html,
  faq: [
    {
      q: 'Comment enlever une vieille tache de graisse sur un canapé en tissu ?',
      a_html: '<p>Commencez par saupoudrer généreusement de la terre de Sommières ou de l’amidon de maïs sur la tache, laissez agir plusieurs heures voire une nuit, puis brossez et aspirez. Traitez ensuite le résidu selon le code d’entretien du tissu (eau savonneuse ou solvant compatible), en tamponnant du bord vers le centre.</p>',
    },
    {
      q: 'Peut-on utiliser du bicarbonate de soude sur une tache de graisse ?',
      a_html: '<p>Oui, en complément d’une poudre absorbante comme la terre de Sommières, notamment sur des taches légères ou peu anciennes. Sur une graisse bien incrustée, le bicarbonate seul est souvent insuffisant : il vaut mieux l’associer à un temps de pose long et, si besoin, à un produit adapté au tissu.</p>',
    },
    {
      q: 'Comment savoir si mon canapé tolère l’eau pour le détachage ?',
      a_html: '<p>Cherchez l’étiquette d’entretien sous l’assise ou le dossier, indiquant un code W (eau tolérée), S (solvant uniquement), WS (les deux) ou X (aspirateur seul). En l’absence d’étiquette, faites un test discret dans un coin caché avant d’appliquer un produit sur la zone visible.</p>',
    },
    {
      q: 'Pourquoi ma tache de graisse s’est-elle agrandie après nettoyage ?',
      a_html: '<p>C’est généralement le signe d’un frottement trop appuyé ou d’une application d’eau ou de produit directement sur la tache sans absorption préalable. Le bon geste consiste à capter le gras avec une poudre avant tout passage à l’humide, puis à tamponner en partant des bords vers le centre.</p>',
    },
    {
      q: 'Faut-il faire appel à un professionnel pour une tache de graisse ancienne ?',
      a_html: '<p>Cela dépend du tissu et de l’ancienneté de la tache. Sur un tissu classé X, un textile délicat, ancien ou de valeur, ou si les méthodes maison n’ont pas suffi après plusieurs tentatives, un nettoyeur professionnel spécialisé en ameublement reste la solution la plus sûre.</p>',
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
    id: 900004,
    slug: SLUG,
    link: `https://www.kl-annuaire.fr/${SLUG}/`,
    pathname: `/${SLUG}/`,
    title: TITLE,
    date: DATE,
    modified: DATE,
    excerpt: 'Identifier le tissu, absorber avant de traiter, produits adaptés et erreurs à éviter : la méthode pour enlever une tache de graisse séchée sur un canapé.',
    categories: [{ name: 'Maison', slug: 'maison' }],
    featured_source: '',
    featured_alt: 'Canapé en tissu clair dans un salon lumineux, avec une tache traitée à la poudre absorbante sur l’assise',
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
