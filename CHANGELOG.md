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

- **The vertical-tab fill is no longer a fixed 10px** ([#45](https://github.com/snkiz/FoxMica/issues/45)). Collapsed,
  FoxOne centres it on the icon with Firefox's own inset. Expanded, it gets 4px on each side instead of running edge to
  edge. The selected tab's fill is flat on the bottom in the collapsed strip. The close button in
  that strip is a rounded square instead of a circle, and with the sidebar on the right it hangs over the other corner,
  mirrored, where Firefox leaves it on the left. `patches/userChrome/39-vertical-tabs.css`.

- **StockMica+ no longer has `--uc-extensions-button-right` in its config.** It was always meant to stay at 0 there, so
  the two-row layout (`--ut-one-line: 0`) now sets it itself, and a config that still has the line is ignored.
  `patches/userChrome/46-stock-tabs.css`, `micaplus-config.css`, `docs/stockmica-plus.md`.

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
