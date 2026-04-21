# Playlist Maker Compatibility and Modal Update

## Summary

This branch keeps the compatibility fix for newer Spotify/Spicetify installs and extends it with a nicer in-app confirmation modal plus user-selectable backdrop styles in the existing settings UI.

## What changed

- Removed the old brittle `ConfirmDialog` workaround that scraped Spotify internals from `src/extensions/extension.tsx`.
- Replaced the confirmation flow used by:
  - creating a new workflow with pending changes
  - loading a workflow with pending changes
  - deleting a saved workflow
- Added a local `ConfirmDialog` component in `src/components/shared/ConfirmDialog.tsx`.
- Upgraded that local confirmation UI from a plain browser confirm dialog to a styled in-app overlay.
- Added a new confirmation-modal settings section to the existing settings wheel in `src/components/settings/SettingsModal.tsx`.
- Added persisted settings helpers in `src/utils/settings-utils.ts`.

## Why these additions were made

- On the tested live setup, `Spicetify.ReactComponent.ConfirmDialog` and `Spicetify.ReactHook.DragHandler` were both missing at runtime.
- The old app depended on an internal Spotify lookup to recover a dialog component, which is fragile and caused the app to break on open.
- The first compatibility fallback used `window.confirm`, which was reliable but aesthetically poor.
- The current version keeps the safer compatibility strategy while restoring a much better user experience using an in-app custom modal.

## New settings option

The settings wheel now includes a `Confirmation modal` section with three backdrop modes:

- `Transparent`
  No dimming or blur. Only the dialog card is shown.
- `Light dim`
  A subtle dark overlay behind the dialog, without blur.
- `Shadow only`
  No overlay. The dialog stands out mainly through its own border and shadow.

These preferences are stored in local storage so they persist across app restarts.

## Result

- The app no longer relies on brittle Spotify internals for confirmations.
- Confirmation actions still work correctly for outside click, cancel, and confirm.
- The confirmation UI now looks integrated with the app instead of falling back to a browser dialog.
- Users can choose the backdrop style they prefer from the existing settings UI.
