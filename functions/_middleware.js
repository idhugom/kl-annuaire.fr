// Cloudflare Pages Function — canonical host enforcement.
// Redirects the apex domain (kl-annuaire.fr) to the canonical www host with a
// 301, preserving path + query. Handled here rather than via a Redirect Rule
// so the behaviour is versioned with the site and needs no extra API scope.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'kl-annuaire.fr') {
    url.hostname = 'www.kl-annuaire.fr';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
