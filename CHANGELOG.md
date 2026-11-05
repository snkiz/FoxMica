# Changelog

This file covers the version in progress. When a release is cut, the highlights go into the GitHub release notes and
this file is cleared for the next version. Older versions live in their GitHub releases.

The settings and each flavour are documented in [docs/](https://github.com/snkiz/FoxMica/tree/main/docs) on GitHub. The folder is left out of the release zip.

## Next release, built on FoxOne 4.0.4

### Fixed

- **Vertical tabs no longer get the horizontal tab shape** ([#42](https://github.com/snkiz/FoxMica/issues/42)).
  `foxmica-tabs.css` (the OEM drop-in tabs) now leaves the vertical list to Firefox: its pill when extended, its circle
  when collapsed. In FoxMica's own modes the selected vertical tab is a filled rounded rectangle (`--ut-layer` fill,
  `--ut-tab-radius` on all four corners, the pinstripe all the way round if it is on), inset 10px from the strip's
  sides, the same on a left or a right sidebar. Before, it had top-only corners, a flat bottom and separators, and
  every tab after the first sat off-centre. `patches/userChrome/39-vertical-tabs.css`.

- **The URL bar keeps its click area at larger densities** ([#34](https://github.com/snkiz/FoxMica/issues/34)). The
  URL bar now has room for the worst case, the largest density, so the same size works at every density. The default
  URL bar and tab widths were retuned to match (`foxmica-config.css`, `micaplus-config.css`).

- **The tab loading bar is the accent colour again.** The ESR 153 tab text fix (#38) had turned it text-coloured on
  every version. Only the bar along the bottom of a loading tab is drawn now; FoxOne's glow along the top edge is
  hidden. `patches/userChrome/36-small-fixes.css`.

- **The floating bookmarks bar keeps off the sidebar launcher, now through FoxOne 4.0.4.** FoxOne took the step-aside
  and hide rules ([FoxOne #82](https://github.com/Firnschnee/FoxOne/issues/82)): the bar starts after a collapsed
  launcher, and fades out while the launcher is expanded or a sidebar panel is open. FoxMica's own copy is gone, and so
  are the `--ut-sidebar-strip` and `--ut-sidebar-strip-vertical` settings (1.0.2 set them to 36px and 48px). A config
  that still has those two lines can drop them: nothing reads them now, and FoxOne works the offset out from Firefox's
  own sizes. FoxOne's hide rules would also have hidden the in-flow bar, which sits above the sidebar and never covers it, so
  FoxMica keeps that one showing. `patches/userChrome/34-bookmarks-sidebar.css`.

- **A sidebar panel no longer slides under the launcher with "expand on hover" on ESR 153.** This was a FoxOne bug, and
  FoxOne 4.0.4 has the fix ([FoxOne PR #84](https://github.com/Firnschnee/FoxOne/pull/84)); FoxMica's own copy of it is
  gone. The launcher flyout's gradient is cleared by FoxOne 4.0.4 as well ([FoxOne #81](https://github.com/Firnschnee/FoxOne/issues/81)),
  so `patches/userChrome/37-launcher-flyout.css` keeps only the solid flyout colour and the clear collapsed strip.

- **The in-flow bookmarks bar (`--ut-bookmarks-inflow: 1`) no longer grows when you hover the toolbar**
  ([#44](https://github.com/snkiz/FoxMica/issues/44)). It opened on any hover over the whole toolbar, at FoxOne's `4em`
  plus 6px padding. It now follows the floating bar's rules: it opens when the pointer rests on the URL text, on the
  bookmark star, on the bar, on an open folder or its right-click menu, or on a fresh tab, and grows to
  `--ut-bookmarks-height` with no extra padding. Collapsed, it is 0px instead of 2px, which removes the thin strip that
  showed on about pages. The sidebar is still pushed down by the open bar in this mode; it sits outside the toolbox, so
  that stays. `patches/userChrome/28-bookmarks-bar.css`.

- **The bookmark star opens the floating bookmarks bar too.** FoxOne only reacts to the URL text, a small target on a
  short URL bar. Same hover delay as the text. `patches/userChrome/32-bookmarks-height.css`.

- **Text on primary buttons in popups uses the puzzle colour.** FoxOne now pins that text to the palette base, which is
  near black. FoxMica uses `--ut-puzzle-color` (the palette's hover colour by default) for a softer look. This is a
  stopgap: it doesn't pass the contrast ratio on every palette, the light one especially. The proper fix is to calculate
  the text colour from the accent. `patches/userChrome/36-small-fixes.css`.

### Docs

- README: the tested-on note now says Nightly and ESR 153 are the ones tested properly, and the other channels get a
  look when a change touches them. Requirements no longer reads as Nightly only. The vertical tabs known issue says
  "Good Enough" ([#31](https://github.com/snkiz/FoxMica/issues/31)), and a few typos are fixed.
