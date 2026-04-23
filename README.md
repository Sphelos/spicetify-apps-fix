# spicetify-apps-fix

This fork is a local-maintenance branch of
[`Pithaya/spicetify-apps`](https://github.com/Pithaya/spicetify-apps).

The goal is simple:

- keep useful Spicetify apps working on newer Spotify / Spicetify installs
- document fork-only fixes clearly
- make it possible to build and install from source without waiting for a
  release

Right now the main focus is `playlist-maker`, including compatibility fixes for
newer Spicetify environments.

## What This Repo Is

This is not an official release mirror.

- There are no packaged releases here.
- Changes are kept on the fork branch and built locally.
- If you want to use a fix from this fork, the intended flow is:
  clone -> install deps -> build -> copy the built app into your Spicetify
  config -> run `spicetify apply`

If you only care about `playlist-maker`, see also:
- [custom-apps/playlist-maker/README.md](./custom-apps/playlist-maker/README.md)
- [custom-apps/playlist-maker/CHANGELOG.md](./custom-apps/playlist-maker/CHANGELOG.md)

## Apps In This Fork

### Extensions

- [Convert japanese](./extensions/romaji-convert/README.md): Convert a selected
  element's name to romaji, hiragana or katakana.
- [Extended copy](./extensions/extended-copy/README.md): Copy a selected
  element's name, ID, URI or raw data to the clipboard.
- [Made for you shortcut](./extensions/made-for-you/README.md): Add a shortcut
  to the "Made for you" page to the sidebar.
- [Availability map](./extensions/availability-map/README.md): See a map of
  every country where a track is available.

### Custom apps

- [Eternal Jukebox (Beta)](./custom-apps/eternal-jukebox/README.md): Loop a
  song infinitely and (almost) seamlessly.
- [Better local files](./custom-apps/better-local-files/README.md): View your
  local songs, albums and artists.
- [Playlist maker](./custom-apps/playlist-maker/README.md): Create playlists
  using a drag-and-drop editor.

## Requirements

- Node.js and npm
- [`spicetify-cli`](https://spicetify.app/docs/getting-started)
- Spotify desktop app

## Local Build Flow

Install dependencies once at repo root:

```sh
npm install
```

Build a specific app from source:

```sh
npm run build-local --workspace custom-apps/playlist-maker
```

That produces a local build in:

```text
custom-apps/playlist-maker/dist
```

## Local Install Flow

### 1. Find your Spicetify config folder

```sh
spicetify config-dir
```

Inside that folder, go to:

```text
CustomApps/
```

### 2. Create the target app folder

Example for `playlist-maker`:

```text
CustomApps/playlist-maker/
```

### 3. Copy the built files into that folder

For `playlist-maker`, copy these files from the repo build output:

```text
custom-apps/playlist-maker/dist/manifest.json
custom-apps/playlist-maker/dist/index.js
custom-apps/playlist-maker/dist/extension.js
custom-apps/playlist-maker/dist/style.css
```

### 4. Enable the app in Spicetify

```sh
spicetify config custom_apps playlist-maker
spicetify apply
```

If Spotify is open, reload or restart it after applying.

## Updating An Installed App

After pulling new changes from this fork:

```sh
npm run build-local --workspace custom-apps/playlist-maker
```

Copy the refreshed `dist` files into your Spicetify `CustomApps/playlist-maker`
folder again, then run:

```sh
spicetify apply
```

## Uninstalling A Custom App

Disable the app:

```sh
spicetify config custom_apps playlist-maker-
spicetify apply
```

Then remove the matching folder from `CustomApps/` if you no longer want the
files installed.

## Notes For This Fork

- Fork-specific notes are kept in per-app changelogs when needed.
- The current `playlist-maker` fixes were done in-source and validated locally.
- This fork prefers practical compatibility fixes over large rewrites unless a
  rewrite is the only stable option.
