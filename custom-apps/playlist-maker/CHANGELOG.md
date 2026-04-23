# Playlist Maker Changelog

This changelog tracks fork-specific changes for `playlist-maker` in the
`spicetify-apps-fix` fork. Newest entries go at the top and stay concise.

## 1.4.1-sphelos.6

- Fixed the `Result` tab on newer Spotify/Spicetify installs by removing its
  dependency on Spotify's internal track-list context and replacing it with a
  simpler standalone results view.
- Guarded additional shared UI hooks and components that could hard-crash when
  optional Spotify helpers are missing, including drag, library-state, icon,
  text, menu, and image-fallback paths.
- Kept a local error boundary around the result page so future runtime issues
  surface as an app-level error instead of Spotify's generic reload crash.

---

## 1.4.1-sphelos.4

- Added safe validation for the saved confirmation-modal backdrop setting, so
  bad or older local values now fall back cleanly instead of relying on loose
  runtime checks.
- Cleaned up the workflow confirmation flow by sharing dialog open/close state
  handling and tightening workflow loading logic.
- Fixed the saved-workflows list rendering to use stable React keys and trimmed
  workflow names on save to avoid accidental blank-space-only names.

---

## 1.4.1-sphelos.3

- Added focused tests for the custom confirmation modal behavior.
- Covered confirm, cancel, outside click, and backdrop-style selection paths.

---

## 1.4.1-sphelos.2

- Replaced the browser confirm fallback with a styled in-app confirmation
  modal.
- Added confirmation modal backdrop settings in the settings wheel:
  `Transparent`, `Light dim`, and `Shadow only`.
- Split the settings modal into smaller section components for easier future
  changes.

---

## 1.4.1-sphelos.1

- Replaced the brittle Spotify-internal `ConfirmDialog` workaround with a
  local confirmation flow.
- Upgraded the local confirmation UI from a browser confirm dialog to a styled
  in-app modal.
- Added a `Confirmation modal` section to the existing settings wheel with
  three backdrop options: `Transparent`, `Light dim`, and `Shadow only`.

---

## 1.4.1-local

- Restored app startup on newer Spotify/Spicetify installs where
  `Spicetify.ReactComponent.ConfirmDialog` was unavailable at runtime.
- Replaced the crashing confirmation path for new/load/delete workflow actions
  with a local fallback.
