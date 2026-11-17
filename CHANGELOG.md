# Changelog

This file covers the version in progress. When a release is cut, the highlights go into the GitHub release notes and
this file is cleared for the next version. Older versions live in their GitHub releases.

The settings and each flavour are documented in [docs/](https://github.com/snkiz/FoxMica/tree/main/docs) on GitHub. The folder is left out of the release zip.

## Next release, built on FoxOne 4.0.11

### Changed

- **The tabs follow the rounded-corners setting.** With `--uc-rounded: 0` the tabs are square, horizontal and
  vertical, like the other surfaces. `foxmica-tabs.css` has its own switch for it, `--ut-tab-rounded` (1 by default,
  so the tabs file alone stays rounded), and FoxMica points it at `--uc-rounded`. The default config has rounding on,
  so nothing changes unless it was turned off. `foxmica-tabs.css`, `patches/userChrome/20-layer-values.css`.

### Fixed

- **The close badge on the collapsed vertical strip is square when rounding is off.** The rule for it lost to the
  tabs file, which loads later, so the badge stayed rounded. It now reads the same switch as the tabs.
  `foxmica-tabs.css`, `patches/userChrome/39-vertical-tabs.css`.


- **The extension drawer no longer shuts while the pointer moves from the puzzle button onto the icons.** Moving
  slowly, the icon under the pointer did not count as hovered straight away, and the drawer closed in that moment and
  could not be reached. Closing now waits 150ms and the icons stay hoverable until it has run; opening is still
  immediate. With reduced motion the drawer snaps shut after the same wait. FoxOne 4.0.11 has the same wait in its
  vertical-tab drawer (FoxOne #96). `patches/userChrome/48-unpinned-puzzle-drawer.css`.

- **No dead strips between the icons in the extension drawer.** Each extension icon carries a 2px margin on both
  sides that no hover reaches, so the pointer could fall between two icons and a tucked drawer still took up room.
  The margin is now zero and the same 2px is padding while the drawer is open. The fix is FoxOne's, from the drawer
  in 4.0.10. `patches/userChrome/48-unpinned-puzzle-drawer.css`.
- **Vertical tabs: the URL field keeps its place on FoxOne 4.0.11, and respects springs.** FoxOne now gives the
  vertical-tab toolbar a grab gap of its own (FoxOne #98), which would have replaced FoxMica's 1:2:1 layout. The
  layout is rebuilt on FoxOne's rule and takes over its spring test for the gap before the field: a flexible space
  placed before the field in Customize replaces that gap. The space after the field is kept either way, so the
  puzzle and burger stay in the corner.
  `patches/userChrome/39-vertical-tabs.css`.

### Now in FoxOne

- **The extension drawer with vertical tabs.** FoxOne 4.0.11 hides and reveals the extension icons beside the puzzle
  button itself when the tab strip is vertical (FoxOne #96), so FoxMica no longer switches its own drawer on there.
  FoxMica's drawer is still the one for an unpinned puzzle with horizontal tabs, StockMica+ and PWAsForFirefox
  windows. `patches/userChrome/48-unpinned-puzzle-drawer.css`.
- **Private windows on ESR 153.** FoxOne 4.0.11 keeps the last tab-bar item clear of the burger and the puzzle when
  the window has no mask button (FoxOne #97), so `patches/userChrome/53-private-window-no-mask.css` is removed.
