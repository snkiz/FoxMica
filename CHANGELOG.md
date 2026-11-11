# Changelog

This file covers the version in progress. When a release is cut, the highlights go into the GitHub release notes and
this file is cleared for the next version. Older versions live in their GitHub releases.

The settings and each flavour are documented in [docs/](https://github.com/snkiz/FoxMica/tree/main/docs) on GitHub. The folder is left out of the release zip.

## Next release, built on FoxOne 4.0.8

### Changed

- **Toolbar button spacing is worked out from the bar height.** The padding inside a button is a quarter of the bar
  height less 3.5px, never under 4px: 4 / 6 / 8px at compact / normal / touch. `--ut-btn-outer` (default 2px, the same
  at every density) is the one spacing setting left. `--ut-btn-inner-compact / -normal / -touch` are gone from
  `foxmica-config.css`; a config that still sets them is ignored. The nav bar, tab bar and bookmarks bar now read the
  same two values. The old override used names Firefox no longer reads, so button spacing may look a little different.
  `foxmica-tabs.css`, `patches/userChrome/27-corner-reserve.css`.

- **The room held for the burger and puzzle buttons is worked out from that padding too.** `--uc-extensions-button-width`,
  `--uc-hamburger-width`, `--uc-toolbar-button-width` and `--uc-newtab-width` are no longer in `foxmica-config.css`,
  so nothing needs keeping in step by hand. A config that sets one still wins.

- **The bookmarks bar is 30 / 34 / 40px** at compact / normal / touch (the bar height less 4px, never under 30 or over
  40), where the previous release had 30 / 36 / 42px. It is still a calculated value, not a setting.
  `patches/userChrome/20-layer-values.css`.

- **Tool buttons on the bookmarks bar follow the same padding and sit centred in the row,** and the bookmarks spread
  out by 0 / 2 / 4px at the three densities. `patches/userChrome/32-bookmarks-height.css`.

### From FoxOne 4.0.7 and 4.0.8

- **Alt or F10 no longer breaks the layout** ([FoxOne #78](https://github.com/Firnschnee/FoxOne/issues/78)). The menu
  bar lies over the nav bar instead of squeezing into the row.

- **F11 on Firefox 154 and up:** the toolbar steps back to the window edge when Firefox autohides the sidebar launcher
  ([FoxOne #94](https://github.com/Firnschnee/FoxOne/issues/94)).

- **The floating bookmarks bar now floats over an open sidebar panel** instead of hiding. It still steps past the
  launcher, and still hides when vertical tabs are expanded.

- **The empty footer of the AI chatbot panel and its border line are hidden** (Firefox 158 and up).

- The credit now says FoxOne is built on Cascade (new address) and carries LittleFox's copyright line.

### Fixed

- **Vertical tabs: the pinned extension icons beside the burger now hide until the puzzle is hovered**
  ([FoxOne #96](https://github.com/Firnschnee/FoxOne/issues/96), same on ESR 153 and Nightly, not tied to the density).
  Vertical tabs put the puzzle in the nav bar, where it is never pinned to the corner, but the drawer that handles
  that only ran with `--uc-extensions-button-right: 0`. It now also runs whenever the tab strip is vertical, and
  horizontal tabs keep whatever the setting says. `patches/userChrome/48-unpinned-puzzle-drawer.css`.

### Docs

- README and `docs/foxone-mica.md`: the spacing notes now describe `--ut-btn-outer` and the calculated reserve.
