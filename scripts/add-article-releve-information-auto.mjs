// One-off: add a hand-written editorial article + register its metadata.
// Writes content/articles/<slug>.json and updates content/wp-raw/{posts,images}.json.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SLUG = 'combien-de-temps-un-accident-reste-t-il-sur-le-releve-d-information-assurance-auto';
const TITLE = 'Combien de temps un accident reste-t-il sur le relevé d’information d’assurance auto ?';
const DATE = '2026-07-14T15:00:00';

const lead_html = `<p class="lead">Après un accident, une question revient presque toujours une fois les réparations réglées : pendant combien de temps cet accident va-t-il continuer à apparaître dans le dossier transmis à un futur assureur ? La réponse ne se résume pas à un seul chiffre, car deux choses bien différentes se superposent : la durée pendant laquelle le sinistre figure sur le relevé d'information, et celle pendant laquelle il continue à peser sur le coefficient bonus-malus.</p><p>Voici comment fonctionne réellement le relevé d'information, ce qu'il contient, combien de temps un accident y reste mentionné, et ce qui change (ou pas) une fois ce délai passé.</p>`;

const body_html = `
<h2 id="quest-ce-que-le-releve-dinformation">Qu'est-ce que le relevé d'information, exactement ?</h2>
<p>Le relevé d'information est un document que tout assureur auto est tenu de remettre à son client, notamment à la résiliation du contrat ou à sa demande. Il résume l'historique de conduite du conducteur assuré : ancienneté du contrat, coefficient de bonus-malus en cours, et liste des sinistres survenus pendant la durée du contrat, avec leur nature et le niveau de responsabilité retenu par l'assureur (responsable, non responsable ou partiellement responsable).</p>
<p>Ce document sert de pièce de référence lorsqu'un conducteur change d'assureur : la nouvelle compagnie s'appuie dessus pour calculer la prime proposée, en tenant compte du passé de conduite plutôt qu'en repartant d'une évaluation à l'aveugle. C'est aussi ce relevé qui permet de prouver un bon historique de conduite, ou à l'inverse d'expliquer une prime plus élevée après un ou plusieurs sinistres responsables.</p>
<p>Concrètement, un relevé d'information mentionne généralement l'identité du conducteur assuré, la ou les catégories de véhicules couvertes, la date de début et de fin du contrat, le coefficient de réduction-majoration (le fameux bonus-malus) au moment de l'édition, ainsi que, pour chaque sinistre recensé, sa date, sa nature (collision, bris de glace, vol, incendie…) et la part de responsabilité retenue. C'est cette dernière colonne, la responsabilité, qui pèse le plus lourd dans l'appréciation que fera un futur assureur du profil du conducteur.</p>

<h2 id="duree-de-conservation">Combien de temps un accident reste-t-il mentionné sur le relevé ?</h2>
<p>En pratique, les assureurs français mentionnent sur le relevé d'information les sinistres survenus au cours des <strong>cinq dernières années</strong> du contrat. C'est la référence habituellement retenue par les compagnies pour établir ce document, qu'il s'agisse d'un accident responsable, non responsable ou partiellement responsable.</p>
<div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>Élément</th><th>Durée de mention</th><th>Ce que cela signifie</th></tr></thead><tbody>
<tr><td>Sinistre responsable</td><td>Environ 5 ans</td><td>Visible par tout nouvel assureur consultant le relevé</td></tr>
<tr><td>Sinistre non responsable</td><td>Environ 5 ans</td><td>Mentionné mais sans effet sur le coefficient bonus-malus</td></tr>
<tr><td>Coefficient bonus-malus</td><td>Recalculé chaque année</td><td>Reflète surtout les 12 à 24 derniers mois de conduite</td></tr>
<tr><td>Retour au bonus maximal après un malus</td><td>Plusieurs années sans sinistre responsable</td><td>Progressif, selon les règles du coefficient de réduction-majoration</td></tr>
</tbody></table></div>
<p>Au-delà de cette fenêtre de plusieurs années, un sinistre ancien cesse en principe d'apparaître sur les relevés délivrés par la suite. Il continue toutefois d'avoir existé dans l'historique global du conducteur auprès de son assureur d'origine, même si ce dernier n'est plus tenu de le faire figurer sur un relevé postérieur à ce délai.</p>

<h2 id="releve-vs-bonus-malus">Relevé d'information et bonus-malus : deux mécaniques différentes</h2>
<p>C'est le point qui prête le plus souvent à confusion : la présence d'un accident sur le relevé d'information et son impact sur le coefficient bonus-malus ne suivent pas le même calendrier.</p>
<div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Le relevé d'information</h4><ul><li>Liste les sinistres des dernières années, avec leur nature et la responsabilité retenue.</li><li>Sert de référence factuelle transmise à un nouvel assureur.</li><li>Reste consultable pendant plusieurs années après l'accident.</li></ul></div><div class="kl-compare__col is-con"><h4>Le coefficient bonus-malus</h4><ul><li>Se recalcule chaque année à la date d'échéance du contrat.</li><li>Un accident responsable majore le coefficient, qui redescend ensuite si aucun nouveau sinistre responsable n'intervient.</li><li>Le retour au coefficient plancher (0,50) prend généralement plusieurs années consécutives sans sinistre responsable.</li></ul></div></div>
<p>Autrement dit, un accident responsable ancien peut ne plus peser sur le coefficient bonus-malus actuel (parce que plusieurs années sans nouveau sinistre ont permis de le faire redescendre), tout en restant encore visible sur le relevé d'information si le délai de conservation de ce document n'est pas encore écoulé. Ce sont deux informations complémentaires, pas deux versions d'une même règle.</p>

<h2 id="obtenir-son-releve">Comment obtenir son relevé d'information ?</h2>
<p>Le relevé d'information doit être remis automatiquement par l'assureur à la résiliation du contrat, dans un délai encadré après la demande. Il est également possible de le demander à tout moment en cours de contrat, sans attendre une résiliation :</p>
<ol>
<li><strong>Contactez votre assureur actuel</strong>, par téléphone, via l'espace client en ligne ou par courrier, en précisant que vous souhaitez un relevé d'information à jour.</li>
<li><strong>Vérifiez les informations mentionnées</strong> : identité, ancienneté du contrat, coefficient en cours, liste des sinistres avec leur qualification de responsabilité.</li>
<li><strong>Signalez toute erreur</strong> sans tarder — un sinistre mal qualifié en « responsable » alors qu'il ne l'est pas, par exemple, peut avoir un effet direct sur la prime proposée par un futur assureur.</li>
<li><strong>Conservez ce document</strong> pour toute démarche de changement d'assureur, de comparaison de devis ou de contestation d'un tarif jugé trop élevé.</li>
</ol>
<p>Un point pratique mérite d'être connu : si l'assureur tarde à transmettre le relevé alors que le contrat est déjà résilié, il est possible de relancer par écrit en rappelant l'obligation de remise de ce document. Cette démarche peut sembler secondaire, mais elle prend tout son sens quand un conducteur souhaite profiter rapidement d'une offre plus avantageuse ailleurs : sans relevé à jour, le nouvel assureur peut proposer un tarif provisoire moins favorable, en attendant de recevoir la confirmation de l'historique réel.</p>
<div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>Demandez votre relevé d'information avant même de comparer des devis chez d'autres assureurs : disposer du document en main facilite grandement l'obtention d'un tarif juste, calculé sur votre historique réel plutôt que sur une estimation par défaut.</p></div>

<h2 id="disparition-apres-delai">Un accident responsable disparaît-il vraiment après ce délai ?</h2>
<p>Une fois le délai de mention écoulé, un accident responsable ancien ne figure généralement plus sur les relevés d'information délivrés par la suite. Cela ne veut pas dire que l'accident « n'a jamais existé » au sens large : un assureur peut, dans certains cas, conserver une trace interne plus longue dans son propre système, notamment si un litige ou une procédure est toujours en cours à son sujet.</p>
<p>Pour l'essentiel des situations courantes, cependant, le principe pratique est simple : passé le délai habituel de plusieurs années, un accident responsable cesse de peser à la fois sur le relevé transmis à un nouvel assureur et sur le calcul du coefficient bonus-malus, à condition qu'aucun autre sinistre responsable ne soit venu s'ajouter entre-temps.</p>
<div class="kl-callout is-warning"><span class="kl-callout__label">Vigilance</span><p>Un enchaînement de sinistres responsables, même espacés de plusieurs années, peut ralentir le retour à un bon coefficient : chaque nouvel accident responsable repart d'un niveau de malus déjà majoré plutôt que d'un coefficient neutre.</p></div>

<h2 id="erreurs-idees-recues">Erreurs et idées reçues fréquentes</h2>
<p>Quelques confusions reviennent souvent au sujet du relevé d'information et de son délai de mention :</p>
<ul>
<li><strong>Croire qu'un accident non responsable pénalise le bonus-malus</strong> : ce n'est pas le cas, seule la responsabilité retenue par l'assureur influe sur le coefficient, même si le sinistre reste mentionné sur le relevé.</li>
<li><strong>Penser que changer d'assureur « efface » l'historique</strong> : le nouvel assureur s'appuie justement sur le relevé d'information transmis par l'ancien pour reprendre l'historique là où il en était.</li>
<li><strong>Attendre la résiliation pour demander son relevé</strong> : le document peut être obtenu à tout moment, ce qui est utile pour préparer une négociation ou un changement de contrat en amont.</li>
<li><strong>Confondre la durée de mention sur le relevé et la durée d'impact sur le bonus-malus</strong> : ce sont deux mécanismes distincts, décrits plus haut, qui ne s'effacent pas forcément au même rythme.</li>
<li><strong>Ne pas vérifier son relevé avant de comparer des devis</strong> : un conducteur qui présente une estimation orale de son passé, sans document à l'appui, s'expose à un tarif moins précis, parfois majoré par prudence de l'assureur.</li>
</ul>
<p>Pour un jeune conducteur, ces règles comptent double : l'historique étant encore court, chaque sinistre — responsable ou non — pèse proportionnellement plus lourd dans l'appréciation globale du profil. Disposer d'un relevé d'information propre et à jour, dès les premières années de conduite, facilite d'autant plus l'accès à des tarifs raisonnables par la suite.</p>
<p>Pour aller plus loin sur la gestion de son contrat auto après un sinistre, la question de la <a href="/assurance-malus-comment-proteger-son-bonus-en-cas-daccident/">protection du bonus en cas d'accident</a> complète utilement ce que dit le relevé d'information, tout comme un contrôle des <a href="/doublons-d-assurance-comment-reperer-les-garanties-payees-en-double/">doublons de garanties entre vos différents contrats d'assurance</a> avant de renégocier. Les conducteurs qui roulent peu peuvent aussi comparer leur situation avec <a href="/lassurance-auto-au-kilometre-une-solution-economique-pour-les-urbains/">l'assurance auto au kilomètre</a>, une formule qui tient elle aussi compte de l'historique de conduite.</p>
`;

const record = {
  slug: SLUG,
  title: TITLE,
  date: DATE,
  modified: DATE,
  category: 'Auto',
  tags: [
    'relevé d’information',
    'assurance auto',
    'bonus-malus',
    'sinistre auto',
    'changer d’assureur',
    'coefficient de réduction-majoration',
  ],
  dek: 'Relevé d’information, coefficient bonus-malus : deux mécaniques distinctes. Voici combien de temps un accident reste réellement visible après un sinistre auto.',
  meta_description: 'Combien de temps un accident reste-t-il sur le relevé d’information d’assurance auto ? Durée de mention, lien avec le bonus-malus, et comment obtenir ce document.',
  image_caption: 'Un conducteur consulte son relevé d’information d’assurance auto avant de changer de contrat.',
  reading_time: 8,
  key_takeaways: [
    'Les assureurs mentionnent généralement les sinistres des cinq dernières années sur le relevé d’information.',
    'La durée de mention sur le relevé et la durée d’impact sur le coefficient bonus-malus sont deux mécaniques distinctes.',
    'Un sinistre non responsable est mentionné sur le relevé mais n’affecte pas le coefficient bonus-malus.',
    'Le relevé d’information peut être demandé à tout moment, pas seulement à la résiliation du contrat.',
    'Un enchaînement de sinistres responsables ralentit le retour à un bon coefficient, même espacés dans le temps.',
  ],
  toc: [
    { id: 'quest-ce-que-le-releve-dinformation', label: 'Qu’est-ce que le relevé d’information ?' },
    { id: 'duree-de-conservation', label: 'Combien de temps un accident y reste mentionné ?' },
    { id: 'releve-vs-bonus-malus', label: 'Relevé d’information et bonus-malus : deux mécaniques' },
    { id: 'obtenir-son-releve', label: 'Comment obtenir son relevé d’information ?' },
    { id: 'disparition-apres-delai', label: 'Un accident disparaît-il vraiment après ce délai ?' },
    { id: 'erreurs-idees-recues', label: 'Erreurs et idées reçues fréquentes' },
  ],
  lead_html,
  body_html,
  faq: [
    {
      q: 'Un accident non responsable apparaît-il sur le relevé d’information ?',
      a_html: '<p>Oui, il est mentionné au même titre qu’un accident responsable, avec la qualification retenue par l’assureur. En revanche, un sinistre non responsable n’a pas d’effet sur le coefficient bonus-malus, contrairement à un sinistre responsable.</p>',
    },
    {
      q: 'Peut-on demander son relevé d’information sans résilier son contrat ?',
      a_html: '<p>Oui, ce document peut être demandé à tout moment auprès de son assureur, pas uniquement à la résiliation. C’est utile pour préparer une comparaison de devis ou une négociation avant de changer de compagnie.</p>',
    },
    {
      q: 'Un accident ancien peut-il encore faire monter le tarif d’un nouveau contrat ?',
      a_html: '<p>Si le sinistre figure encore sur le relevé d’information transmis au nouvel assureur, celui-ci peut en tenir compte dans son évaluation, même si l’accident n’a plus d’effet sur le coefficient bonus-malus en cours.</p>',
    },
    {
      q: 'Que faire si une erreur figure sur mon relevé d’information ?',
      a_html: '<p>Contactez votre assureur pour signaler l’erreur et demander une correction. Une mauvaise qualification de responsabilité peut avoir un effet direct sur le tarif proposé par un futur assureur, il vaut mieux la faire rectifier rapidement.</p>',
    },
    {
      q: 'Le coefficient bonus-malus redescend-il automatiquement avec le temps ?',
      a_html: '<p>Oui, en l’absence de nouveau sinistre responsable, le coefficient s’améliore chaque année à l’échéance du contrat, jusqu’à revenir progressivement à son niveau plancher au fil des années sans accident responsable.</p>',
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
    id: 900006,
    slug: SLUG,
    link: `https://www.kl-annuaire.fr/${SLUG}/`,
    pathname: `/${SLUG}/`,
    title: TITLE,
    date: DATE,
    modified: DATE,
    excerpt: 'Relevé d’information, coefficient bonus-malus : deux mécaniques distinctes. Voici combien de temps un accident reste réellement visible après un sinistre auto.',
    categories: [{ name: 'Auto', slug: 'auto' }],
    featured_source: '',
    featured_alt: 'Conducteur consultant son relevé d’information d’assurance auto sur une table, à côté des clés de voiture',
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
