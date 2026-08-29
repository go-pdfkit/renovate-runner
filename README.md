# renovate-runner

Runs [Renovate](https://docs.renovatebot.com) over the PDF fleet — every repo
owned by `go-pdfkit`, `go-gfx`, `go-opentype` and `go-widgets` — from one daily
GitHub Actions job.

## Why not the app

The hosted Mend app would be less work, and cannot be used here: installing a
GitHub App on an organisation is an OAuth flow a person clicks through, and
there is no API behind it. A token can do everything else, so a token does.

## What it needs

One secret, `RENOVATE_TOKEN`, a personal access token with `repo` and
`workflow`. The `workflow` scope is not optional: without it every PR that
touches `.github/workflows/*` is refused, and those are the ones the
`github-actions` manager opens.

## The trap that makes a green run do nothing

Renovate's default author is `bot@renovateapp.com`, and this account blocks
pushes that expose a non-noreply email. Left alone, **every branch push is
rejected and the run still reports success**. `gitAuthor` in `config.js` is
what stops that.

So a run is not verified by its own green tick. It is verified by there being
`renovate/*` branches and open pull requests on a repo that had something to
update.
