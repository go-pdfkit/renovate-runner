// Self-hosted Renovate for the PDF fleet: every repo owned by go-pdfkit,
// go-gfx, go-opentype and go-widgets.
//
// The hosted Mend app would be less work, and cannot be used: installing a
// GitHub App on an organisation is an OAuth flow a person clicks through, with
// no API behind it. A token can do the rest, so a token does.
//
// Each repo honours its own renovate.json, which extends its org's
// .github/default.json.
module.exports = {
  platform: 'github',
  // The account blocks pushes that expose a non-noreply email, and Renovate's
  // default author is bot@renovateapp.com. Left alone, every branch push is
  // rejected and the run still reports success.
  gitAuthor: 'tannevaled <tannevaled@users.noreply.github.com>',
  autodiscover: true,
  autodiscoverFilter: ['go-pdfkit/**', 'go-gfx/**', 'go-opentype/**', 'go-widgets/**'],
  onboarding: false,          // every repo already ships a renovate.json
  requireConfig: 'optional',  // process a repo even if it has none
  dependencyDashboard: true,  // one "Dependency Dashboard" issue per repo

  // Throttles, so a first live run trickles rather than floods.
  prConcurrentLimit: 10,
  prHourlyLimit: 10,
  branchConcurrentLimit: 20,

  packageRules: [
    {
      matchManagers: ['github-actions'],
      groupName: 'github actions',
      groupSlug: 'github-actions',
    },
    // The fleet's own modules move together and are released together: one PR
    // per repo for all of them beats eight PRs that only build once all eight
    // are in.
    {
      matchManagers: ['gomod'],
      matchPackageNames: [
        'github.com/go-pdfkit/**',
        'github.com/go-gfx/**',
        'github.com/go-opentype/**',
        'github.com/go-widgets/**',
      ],
      groupName: 'the fleet',
      groupSlug: 'fleet',
    },
  ],
};
