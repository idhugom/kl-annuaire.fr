// One-off: add a hand-written editorial article + register its metadata.
// Writes content/articles/<slug>.json and updates content/wp-raw/{posts,images}.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SLUG = 'doublons-d-assurance-comment-reperer-les-garanties-payees-en-double';
const TITLE = 'Doublons d’assurance : comment repérer les garanties que vous payez en double dans vos contrats';
const DATE = '2026-07-12T14:00:00';

const lead_html = `<p class="lead">Au fil des années, on accumule les contrats : l’auto, l’habitation, la mutuelle, une prévoyance, une protection juridique, l’assurance du téléphone, celle liée à la carte bancaire, parfois une garantie ajoutée « au cas où » lors d’un achat. Résultat : de très nombreux foyers paient deux fois la même protection sans même le savoir.</p><p>Ces recoupements, ce sont les <strong>doublons d’assurance</strong>. Ils grignotent le budget en silence, échéance après échéance, pour une couverture que vous possédez déjà ailleurs. Voici comment les repérer méthodiquement, quels sont les doublons les plus fréquents, et surtout comment supprimer les vrais — sans créer de trou dans votre protection.</p>`;

const body_html = `
<h2 id="qu-est-ce-qu-un-doublon">Qu’est-ce qu’un doublon d’assurance, et pourquoi c’est si courant</h2>
<p>Un doublon, c’est un même risque couvert par deux contrats différents. Vous avez, par exemple, une garantie « casse et vol du téléphone » à la fois dans une option souscrite chez votre opérateur, dans les services associés à votre carte bancaire, et parfois dans votre assurance habitation. Trois lignes de cotisation, un seul téléphone à protéger.</p>
<p>Ces situations sont fréquentes pour trois raisons : les contrats sont souscrits à des moments différents et on oublie ce que couvre déjà l’ancien ; certaines garanties sont <strong>ajoutées par défaut</strong> dans des packs ou lors d’un achat ; enfin, la reconduction tacite fait que l’on continue de payer sans jamais relire le détail des garanties.</p>
<div class="kl-callout is-key"><span class="kl-callout__label">À retenir</span><p>En assurance de dommages, le <strong>principe indemnitaire</strong> interdit de s’enrichir grâce à un sinistre : on ne peut pas être indemnisé deux fois pour le même bien détruit. Deux contrats sur un même dommage ne doublent donc pas l’indemnisation — ils doublent surtout la cotisation. C’est là que se cache le gaspillage.</p></div>

<h2 id="doublons-frequents">Les doublons d’assurance les plus fréquents</h2>
<p>Certains recoupements reviennent dans presque tous les foyers. Avant de payer une nouvelle garantie, vérifiez toujours si elle n’existe pas déjà dans un contrat que vous détenez.</p>
<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Garantie souvent en double</th><th>Où elle se cache déjà</th><th>Le bon réflexe</th></tr></thead><tbody>
<tr><td>Assurance annulation / voyage</td><td>Carte bancaire haut de gamme (Visa Premier, Gold Mastercard…)</td><td>Vérifier les plafonds et les conditions de la carte avant d’acheter une assurance voyage à part.</td></tr>
<tr><td>Protection juridique</td><td>Souvent incluse dans l’habitation, l’auto ou un contrat bancaire</td><td>Un seul contrat de protection juridique suffit généralement.</td></tr>
<tr><td>Assurance du téléphone</td><td>Option opérateur + carte bancaire + parfois l’habitation</td><td>N’en garder qu’une, en comparant vol, casse et oxydation.</td></tr>
<tr><td>Assurance scolaire</td><td>Responsabilité civile de l’assurance habitation</td><td>La RC vie privée couvre déjà les dommages causés par l’enfant.</td></tr>
<tr><td>Assistance / dépannage</td><td>Contrat auto + carte bancaire + constructeur</td><td>Un seul niveau d’assistance réellement utile.</td></tr>
<tr><td>Garantie des moyens de paiement</td><td>Carte bancaire + option « sécurité » de la banque</td><td>Comparer le périmètre (papiers, clés, téléphone) pour éviter la redite.</td></tr>
</tbody></table></div>
<p>Cette liste n’est pas exhaustive : les garanties « accidents de la vie », les extensions de garantie sur l’électroménager ou encore les assurances liées aux abonnements en font aussi partie. Le point commun est toujours le même : une protection déjà acquise, revendue une seconde fois sous un autre nom.</p>

<h2 id="reperer-methodiquement">Comment repérer un doublon, méthodiquement</h2>
<p>Chasser les doublons ne s’improvise pas au jugé. La méthode fiable tient en quatre étapes, à mener contrat par contrat.</p>
<ol>
<li><strong>Faites l’inventaire complet</strong> de vos contrats : auto, moto, habitation, santé, prévoyance, protection juridique, assurances « produits » (téléphone, électroménager), cartes bancaires et garanties liées à vos abonnements.</li>
<li><strong>Listez les garanties réellement souscrites</strong> pour chacun, en vous appuyant sur les conditions particulières et le tableau des garanties : notez les plafonds, les franchises et les exclusions.</li>
<li><strong>Regroupez par risque couvert</strong> (« vol du téléphone », « annulation de voyage », « litige de consommation »…) plutôt que par contrat, et repérez les cases qui reviennent plusieurs fois.</li>
<li><strong>Distinguez le vrai recouvrement</strong> (même risque, mêmes conditions) de la simple complémentarité (plafonds ou franchises différents).</li>
</ol>
<p>Fait à la main, contrats étalés sur la table, cet audit est tout à fait possible — mais fastidieux, car les garanties sont dispersées sur des dizaines de pages de conditions générales, dans un vocabulaire technique. Pour aller plus vite, des outils d’analyse en ligne passent désormais vos contrats au crible et font remonter automatiquement doublons, lacunes et pistes d’économies : c’est par exemple la promesse d’un service comme <a href="https://scan-assur.com">Scan-Assur</a>, qui lit vos contrats pour signaler les garanties redondantes et les zones mal couvertes. Que vous procédiez à la main ou de façon outillée, l’objectif reste identique : cartographier ce que vous payez, risque par risque.</p>
<blockquote class="kl-quote">On ne supprime bien que ce qu’on a d’abord cartographié : un doublon se repère en raisonnant par risque couvert, jamais par nom de contrat.<cite>— Principe d’un audit d’assurance méthodique</cite></blockquote>

<h2 id="pas-toujours-a-supprimer">Un doublon n’est pas toujours à supprimer</h2>
<p>Attention à ne pas tout tailler à la hache. Certains recoupements sont utiles, voire cumulables. Tout dépend de la nature de la garantie.</p>
<p>Les <strong>assurances de personnes forfaitaires</strong> — un capital décès, une garantie des accidents de la vie qui verse une somme fixe, une indemnité journalière d’hospitalisation — peuvent se cumuler : deux contrats verseront chacun leur capital. Ce n’est donc pas nécessairement du gaspillage, si ce cumul est voulu. À l’inverse, les <strong>assurances de dommages</strong> obéissent au principe indemnitaire : vous ne serez indemnisé qu’une seule fois pour le bien endommagé, quel que soit le nombre de contrats.</p>
<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Doublon à supprimer</h4><ul><li>Même risque de dommage, mêmes biens, logique indemnitaire.</li><li>Plafonds et franchises équivalents d’un contrat à l’autre.</li><li>Vous payez deux cotisations pour une seule indemnisation possible.</li></ul></div><div class="kl-compare__col is-con"><h4>Recouvrement à garder</h4><ul><li>Prestations forfaitaires réellement cumulables (prévoyance, capital).</li><li>Périmètres complémentaires : franchise faible d’un côté, plafond élevé de l’autre.</li><li>Une garantie déjà incluse et gratuite (carte, contrat existant) que vous ne payez pas en plus.</li></ul></div></div>
<div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>Avant d’arbitrer entre deux garanties qui se recoupent, comparez le couple <em>plafond / franchise</em> et l’étendue des exclusions. On conserve celle qui indemnise le plus largement au meilleur coût — pas simplement la moins chère à cotisation.</p></div>

<h2 id="resilier-proprement">Résilier proprement la garantie en double</h2>
<p>Une fois le vrai doublon identifié, la suppression demande un peu de méthode pour ne pas se retrouver à découvert.</p>
<p>Premier réflexe : une garantie en doublon est souvent une simple <strong>option</strong> à l’intérieur d’un contrat plus large. Dans ce cas, on demande le retrait de l’option, sans résilier tout le contrat. Ce n’est que lorsque le doublon constitue un contrat autonome (une assurance « produit » dédiée, par exemple) qu’il faut envisager une résiliation complète.</p>
<p>Plusieurs dispositifs facilitent la sortie :</p>
<ul>
<li><strong>Loi Chatel</strong> : l’assureur doit vous rappeler la date limite de résiliation avant la reconduction tacite. À défaut d’information dans les délais, vous disposez d’un délai supplémentaire pour résilier.</li>
<li><strong>Loi Hamon</strong> : passé un an, vous pouvez résilier à tout moment et sans frais les contrats auto, habitation et affinitaires (dont les assurances liées à un produit, comme le téléphone).</li>
<li><strong>Droit de renonciation de 14 jours</strong> : pour une assurance affinitaire souscrite récemment alors que vous étiez déjà couvert pour le même risque, un droit de renonciation existe afin d’annuler précisément ce type de doublon.</li>
<li><strong>Assurance emprunteur</strong> : la loi Lemoine permet d’en changer à tout moment, un levier utile si une prévoyance couvre déjà une partie du risque.</li>
</ul>
<div class="kl-callout is-warning"><span class="kl-callout__label">Vigilance</span><p>Ne résiliez jamais une garantie avant d’avoir confirmé, plafonds et exclusions à l’appui, que le risque reste bien couvert par l’autre contrat. Supprimer un « doublon » qui n’en était pas un crée une lacune de couverture — l’erreur inverse, tout aussi coûteuse le jour d’un sinistre.</p></div>

<h2 id="audit-annuel">Prendre l’habitude d’auditer ses contrats chaque année</h2>
<p>La chasse aux doublons n’est pas un exercice unique : votre situation évolue, et vos contrats avec elle. Chaque événement de vie — déménagement, nouveau véhicule, naissance, changement d’opérateur ou de carte bancaire — peut créer un recoupement là où il n’y en avait pas.</p>
<p>Le plus simple est de fixer un rendez-vous annuel, idéalement avant la date d’échéance principale, pour reprendre l’inventaire, vérifier ce qui se recoupe et ajuster. Gardez un tableau de bord de vos contrats, garanties, plafonds et échéances : c’est la meilleure protection contre la cotisation payée en double. En quelques heures par an, cet audit se traduit très souvent par une économie durable — et par une couverture plus claire, débarrassée des redites, mais sans le moindre trou.</p>
`;

const record = {
  slug: SLUG,
  title: TITLE,
  date: DATE,
  modified: DATE,
  category: 'Finance',
  tags: [
    'assurance',
    'doublons d’assurance',
    'garanties',
    'économies',
    'résiliation',
    'protection juridique',
  ],
  dek: 'Assurance voyage, protection juridique, téléphone, assistance : ces garanties que vous payez souvent deux fois. La méthode pour repérer les doublons et supprimer les vrais sans créer de lacune.',
  meta_description: 'Doublons d’assurance : comment repérer les garanties payées en double dans vos contrats, distinguer les vrais doublons des couvertures complémentaires et les résilier proprement.',
  image_caption: 'Passer ses contrats au crible, garantie par garantie, reste le moyen le plus sûr de repérer ce que l’on paie en double.',
  reading_time: 9,
  key_takeaways: [
    'Un doublon, c’est un même risque couvert par deux contrats : le plus souvent, vous payez deux cotisations pour une seule indemnisation possible.',
    'Les recoupements les plus fréquents : assurance voyage contre carte bancaire, protection juridique multiple, assurance du téléphone, assurance scolaire contre responsabilité civile, assistance.',
    'La méthode fiable : inventorier tous les contrats, lister les garanties réellement souscrites, les regrouper par risque couvert, puis repérer les recoupements.',
    'Tout doublon n’est pas à supprimer : les prestations forfaitaires (prévoyance, capital) peuvent se cumuler ; comparez plafonds et franchises avant d’arbitrer.',
    'Pour résilier proprement, retirez l’option plutôt que le contrat entier, appuyez-vous sur les lois Chatel et Hamon (et le droit de renonciation de 14 jours des contrats affinitaires), et vérifiez toujours qu’une couverture subsiste.',
  ],
  toc: [
    { id: 'qu-est-ce-qu-un-doublon', label: 'Qu’est-ce qu’un doublon d’assurance' },
    { id: 'doublons-frequents', label: 'Les doublons les plus fréquents' },
    { id: 'reperer-methodiquement', label: 'Repérer un doublon méthodiquement' },
    { id: 'pas-toujours-a-supprimer', label: 'Un doublon pas toujours à supprimer' },
    { id: 'resilier-proprement', label: 'Résilier proprement la garantie en double' },
    { id: 'audit-annuel', label: 'Auditer ses contrats chaque année' },
  ],
  lead_html,
  body_html,
  faq: [
    {
      q: 'Peut-on être indemnisé deux fois pour un même sinistre avec deux assurances ?',
      a_html: '<p>Non, pour les assurances de dommages : le principe indemnitaire interdit que l’indemnisation dépasse le préjudice réel. Si deux contrats couvrent le même bien, les assureurs se répartissent la charge, mais vous n’êtes indemnisé qu’une fois. En revanche, certaines prestations forfaitaires d’assurance de personnes (capital décès, garantie des accidents de la vie forfaitaire) peuvent se cumuler.</p>',
    },
    {
      q: 'Quels sont les doublons d’assurance les plus courants ?',
      a_html: '<p>Les plus fréquents sont l’assurance voyage ou annulation (souvent déjà offerte par une carte bancaire haut de gamme), la protection juridique (fréquemment incluse dans l’habitation, l’auto et un contrat bancaire), l’assurance du téléphone, l’assurance scolaire face à la responsabilité civile, et l’assistance ou le dépannage cumulés entre contrat auto, carte bancaire et constructeur.</p>',
    },
    {
      q: 'Ma carte bancaire remplace-t-elle une assurance voyage ?',
      a_html: '<p>Souvent en partie, à condition de régler le voyage avec la carte concernée et de respecter ses conditions. Tout dépend de la gamme (les cartes haut de gamme couvrent davantage) et surtout des plafonds. Vérifiez le détail des garanties de la carte avant de souscrire une assurance voyage séparée : vous éviterez peut-être un doublon inutile.</p>',
    },
    {
      q: 'Comment supprimer une garantie en double sans tout résilier ?',
      a_html: '<p>Une garantie en doublon est souvent une simple option dans un contrat plus large : il suffit alors d’en demander le retrait, sans toucher au reste du contrat. Si le doublon est un contrat autonome, vous pouvez le résilier en vous appuyant sur la loi Hamon (à tout moment après un an pour l’auto, l’habitation et les contrats affinitaires) ou la loi Chatel.</p>',
    },
    {
      q: 'L’assurance scolaire fait-elle doublon avec la responsabilité civile ?',
      a_html: '<p>En partie. La responsabilité civile vie privée, généralement incluse dans l’assurance habitation, couvre déjà les dommages que votre enfant peut causer à autrui, y compris en dehors de l’école. L’assurance scolaire ajoute surtout un volet « individuelle accident » pour les dommages subis par l’enfant. Vérifiez ce que couvre déjà votre habitation avant de la souscrire.</p>',
    },
    {
      q: 'Est-il risqué de résilier un contrat que l’on croit en double ?',
      a_html: '<p>Oui, si ce n’est pas un vrai doublon : vous créeriez une lacune de couverture. Avant de résilier, comparez les plafonds, les franchises et les exclusions des deux garanties, et assurez-vous qu’une couverture équivalente subsiste bien. Dans le doute, conservez la garantie la plus protectrice et supprimez l’autre.</p>',
    },
  ],
  _gen: { model: 'hand-written', at: DATE },
};

// 1) article file
const artPath = path.join(ROOT, 'content/articles', SLUG + '.json');
fs.writeFileSync(artPath, JSON.stringify(record, null, 2));
console.log('article →', artPath);

// 2) posts.json entry (title, dates, alt)
const postsPath = path.join(ROOT, 'content/wp-raw/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
if (!posts.some((p) => p.slug === SLUG)) {
  posts.unshift({
    id: 900002,
    slug: SLUG,
    link: `https://www.kl-annuaire.fr/${SLUG}/`,
    pathname: `/${SLUG}/`,
    title: TITLE,
    date: DATE,
    modified: DATE,
    excerpt: 'Ces garanties que vous payez souvent deux fois sans le savoir : la méthode pour repérer les doublons d’assurance et supprimer les vrais, sans créer de lacune.',
    categories: [{ name: 'Finance', slug: 'finance' }],
    featured_source: '',
    featured_alt: 'Contrats d’assurance papier posés sur un bureau lumineux avec une loupe, illustrant l’audit des garanties pour détecter les doublons',
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
