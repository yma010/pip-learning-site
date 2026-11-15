# Pip Learning site

The public pages the App Store needs for Pip Learning: Privacy, Terms and Support. The app
itself lives in the private repo `pip-learning-app`.

Plain HTML and CSS, served by GitHub Pages from `docs/`. No JavaScript, cookies, analytics or
outside requests: the fonts (Gabarito and Andika, SIL Open Font License) are stored here.
The colors are the app's "Notebook kit" (design/tokens.json in the app repo).

## Editing

1. Edit a page in `pages/`, or the shared values in `site.json`: operator name, support email,
   "last updated" date, and `draft` (shows the draft notice on every page).
2. Build: `node build.mjs` (Node 18 or later, no installs). It writes `docs/*.html`.
3. Commit `pages/` and `docs/` together and push. Pages updates in a minute or two.

In the cmux shell, run `env -u NODE_OPTIONS node build.mjs`.

## Keep in step with the app

- The privacy page describes the child-only v1: no accounts, everything saved on the phone,
  lesson downloads that carry nothing about the child. Before any release that adds accounts,
  sync, class codes or teachers, the privacy page must change first.
- The Support page names Settings rows ("Erase my progress", "For grown-ups", "Fix the
  birthday"). If those labels change in the app, change them here.
- The app shows the same Privacy and Terms text from content/legal.json in the app repo.
  Change both together, with the same "updated" date.

## Before turning off `draft`

- Fill in the operator name and support email in `site.json`.
- Have someone who knows COPPA and children's privacy review the privacy page and terms
  (docs/privacy.md in the app repo lists the open questions).

## App Store Connect

- Privacy Policy URL: `https://pip.marvinma.com/privacy.html`
- Support URL: `https://pip.marvinma.com/support.html`
