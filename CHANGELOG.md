# Changelog

This file covers the version in progress. When a release is cut, the highlights go into the GitHub release notes and
this file is cleared for the next version. Older versions live in their GitHub releases.

The settings and each flavour are documented in [docs/](https://github.com/snkiz/FoxMica/tree/main/docs) on GitHub. The folder is left out of the release zip.

## Next release, built on FoxOne 4.0.6

### Changed

- **The touch density bar is 46px, down from 48px** (`--ut-bar-height-touch` in `foxmica-config.css`). Compact (30px)
  and normal (38px) are unchanged. A config that sets its own value keeps it.

- **The bookmarks bar is no longer as tall as the bar.** Its height is now worked out from the bar height: 30 / 36 / 42px
  at compact / normal / touch, where it used to match the bar (30 / 38 / 48px). It is a calculated value
  (`--ut-bookmarks-height`), not a setting. `patches/userChrome/20-layer-values.css`.

- **The find bar moves down by that same height while the floating bookmarks bar is open.** FoxOne 4.0.5 made its own
  offset follow the density ([FoxOne #93](https://github.com/Firnschnee/FoxOne/issues/93)), but its figure is worked out
  for FoxOne's own bar, with 6px of padding top and bottom. FoxMica's bar is a different height, so FoxMica keeps setting
  the offset itself. `patches/userChrome/44-findbar.css`.

### Fixed

- **The toolbar has a background in fullscreen (F11).** It floats over the page there, and Mica never paints over page
  pixels, so the transparent toolbar showed the page through it. It now has a mostly solid fill in Mica's own base
  colours, and `--ut-fullscreen-bg` in `foxmica-config.css` sets it.
  `patches/userChrome/50-fullscreen-toolbar.css`.

- **The Mini Window's URL field is visible and the window can be dragged from both sides** (Firefox 160, Nightly for
  now). The Mica rules had made the field the same colour as the bar, so nothing showed where to type; it now has the
  field's own solid colour and rounded corners. FoxOne 4.0.6 leaves a gap to the right of the field to drag the window
  by, and this adds the same gap on the left, like stock. `patches/userChrome/52-mini-window.css`.

### From FoxOne 4.0.5 and 4.0.6

None of FoxMica's patches changed for these, and all of them still apply.

- **Fullscreen (F11) with the sidebar launcher** ([FoxOne #89](https://github.com/Firnschnee/FoxOne/issues/89),
  [#91](https://github.com/Firnschnee/FoxOne/pull/91)). The toolbar no longer covers the collapsed launcher, and the
  find bar no longer hides under the toolbar while it is shown (FoxOne #70). The launcher's width is now declared once
  as `--uc-launcher-strip`, and the vertical value is half a pixel narrower.

- **Mini Window** (Firefox 160, [FoxOne #88](https://github.com/Firnschnee/FoxOne/issues/88)). The page no longer sits
  a toolbar height below the bar, the address bar fills the row, and the menu and extensions buttons stay hidden there.

### Tools

- `scripts/check.mjs` notes a VERSION that still ends in `-dev` (and fails on it in the online run, the one before a
  release), and notes any declaration that looks like it is missing its `;`. Neither fails the `--offline` run.

### Docs

- `scripts/README.md`: the check row lists the new `-dev` check.
