# Knura docs

The user documentation for [Knura](https://github.com/knura-dev/knura), published at
**[docs.knura.io](https://docs.knura.io)**. Built with [Starlight](https://starlight.astro.build).

## Edit a page

Pages are Markdown files in `src/content/docs/`. Each page on the site has an **Edit this page**
link that opens its file here on GitHub. Change it there and open a pull request; the site is
built for every pull request and published when it's merged into `main`.

The sidebar is listed in `astro.config.mjs`. A new page needs a line there to show up in it.

## Run it on your computer

You need Node.js 22.23 or newer (24 recommended).

```sh
npm ci
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # the finished site, in dist/
```

## Writing style

Follow the Knura voice: talk to the reader as "you", use sentence case for titles, short
sentences, no emoji or hype. Keep each page to one task where you can.

## Publishing

See [deploy/README.md](deploy/README.md).

