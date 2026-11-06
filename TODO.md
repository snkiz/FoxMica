# TODO

Items marked [#n] are GitHub issues on snkiz/FoxMica; the issue holds the details.

Numbers are kept stable so old chats still make sense. Don't renumber. TODO items are written `tdN` (td24);
GitHub issues are `#N`. A bare number means nothing; always use the prefix.
Gathered from the three setup chats on 2026-10-04. The maintainer's own notes beat this list
where they disagree.

## Now

- **td24. Modal dialogs: background is back but black** [#4] (Nova on). Fixed the missing
  background 2026-10-04 by scoping section 1 of the Mica block (patches/userChrome/22-mica.css) to
  `#main-window` (it had made every chrome document transparent, dialogs included).
  Left to do: dialogs should use the theme palette, not black. Readable for now.
  Item td22 (the "make Firefox your default browser" bar) is the same dialog, so it gets fixed with this one.

## Next time

- **[#45](https://github.com/snkiz/FoxMica/issues/45): vertical tab fill is a fixed 10px, tuned on ESR 153.** Measured on
  Nightly, collapsed strip: patch 39's 10px does apply (margins 10px / 10px, fill 28px wide). FoxOne 4.0.4 centres the
  collapsed strip from Firefox's own token (FoxOne #85; `--tab-margin-inline-inner` from 159, `--tab-inner-inline-margin`
  on 153, which FoxOne falls back to), 11px on Nightly. Both centre the fill; the difference is 2px of width. Option, not
  done: limit the fixed 10px to the expanded strip (FoxOne's fix does not cover it) and let FoxOne's token do the
  collapsed one. ESR 153 not checked yet; Beta looked fine by eye. The test list is in the issue.- Beta only, seen while checking #45: the find bar shows a double gap under the floating bookmarks bar, on a new tab and
  nowhere else. Not chased.- **1.1 docs pass.** (1) Move the install instructions into the docs landing page (`docs/README.md`) and lead with them.
  (2) Cut the OEM tab settings table on `docs/README.md` ("Tab settings (for OEM drop-in replacement tabs)") down to its
  description. (3) New screenshots with the new bookmarks bar. (4) Split the settings table in `docs/foxone-mica.md` into
  sections in the same order as `foxmica-config.css`. `micaplus-config.css` itself gets the same sections; its table in
  `docs/stockmica-plus.md` is probably too short to split, but is reordered to match the file. (5) Possibly borrow Firn's
  doc checker script, so the tables are checked against the config files. (6) Update the FirefoxCSS-Store listing
  (firefoxcss-store.github.io/themes/foxmica): take the links out of the description and keep the wording (it does not
  support links), resize the screenshots, and keep only a new main image (a full window, like the other listings have) and
  a properly sized composite; the other images can go. Needs an issue filed in the store's repository to get it changed.
- **Drop section 6c of patch 37 when `vendor/` has the FoxOne fix.** The held margin for the sidebar panel with "expand
  on hover" (ESR 153 only) is FoxOne PR #84 (sidebar-panel-under-fix); FoxOne 4.1 will probably carry it. When `vendor/` is on a
  FoxOne release that has it, remove 6c and its CHANGELOG entry, or reword the entry as "now in FoxOne".
- **FoxOne #73 (4.1 option cleanup, input open until 2026-11-08).** Firn is keeping the puzzle switch (`--uc-extensions-button-right`) for us. Our positions are drafted in the private notes (issue-drafts).
  If FoxOne removes `--uc-extensions-button-right`, StockMica+ and PWA windows need it, so FoxMica carries its own copy. If
  it removes `--uc-show-all-tabs-button`, the all-tabs button stays wherever Firefox puts it, in every mode: drop the setting
  from `foxmica-config.css` and `micaplus-config.css`. If it removes hide-disabled-nav, FoxMica carries `--ut-hide-disabled-nav`.
  Our puzzle drawer (patch 48) stays in FoxMica; FoxOne declined it (PR #72).
- **FoxOne #81 (flyout gradient), #82 (bookmarks bar and sidebar proposal), PR branch `83-sidebar-hover`** (2026-10-28):
  posted and pushed by him, waiting on Firn. On #82 he offers a PR with FoxOne's own variable names and docs rows,
  once invited (patch 34 adds `--ut-sidebar-strip` and `--ut-sidebar-strip-vertical`, which FoxOne would name its way).
  The flyout fix sets all four toolbox gradient stop names (Firefox renamed them between 159 and 160).
- **td41. Bookmarks bar: split "dynamic" in two, driven by Firefox's own menu (after FoxOne #82 is settled).** Idea
  (2026-11-01): Firefox's bookmarks toolbar menu (Always Show / Only Show on New Tab / Never Show) should do what it says, live, with no
  CSS edit and no restart. "Always show" means the bar is always there, as a floating bar or in-flow (a choice).
  "Dynamic" (hover reveal) becomes its own switch, tied to "Only Show on New Tab". The floating bar keeps the sidebar rules
  from patch 34. Stretch goal: draw the floating bar under the sidebar so the hide rules aren't needed (then people add
  spacers if they want); if it can't be done, the hide rules stay as they are. Would fold FoxMica's `--ut-bookmarks-inflow`
  into the same choice. For FoxOne, "in-flow" is just Firefox's stock bar. Upstream pitch: lead with the live switch from
  the menu; it also keeps the bar reachable with a panel open (Firn's concern on #82).
  What was found:
  - FoxOne's own comment says `--uc-dynamic-bookmarks` only works under "Always show", because under the other two
    settings Firefox collapses the bar. The cause is Firefox's `[collapsed] { visibility: collapse; }` (`xul.css`, same on
    ESR 153, Release 159, Beta 160 and Nightly 161). FoxOne already hands `visibility` back for fullscreen (line 960 of
    FoxOne's `userChrome.css`), so the same override may work here.
  - Firefox's menu handler (`browser.js`, same on all four builds) only toggles `collapsed` per the current page. "Never"
    and "Only Show on New Tab" on an ordinary page look the same on the element. The choice is kept in the pref
    `browser.toolbars.bookmarks.visibility` (`always` / `newtab` / `never`).
  - Idea to test first: read that pref with `@media -moz-pref("browser.toolbars.bookmarks.visibility", "newtab")`, the way
    patch 34 reads `sidebar.visibility`. Untested: that it works for this pref, that it follows the menu live, and that
    nothing else Firefox does to a collapsed bar fights the override.
  - **Tested 2026-11-05: the bar is empty under "Only Show on New Tab" until a new tab has been shown once (FoxOne
    #87, Firn's point 3).** Throwaway profile, three toolbar bookmarks, window starting on a normal page, ESR 153.6,
    Beta 160 and Nightly 161: the bar is collapsed with 0 items (Firefox hasn't built them); on a new tab it shows
    all 3; back on a normal page it collapses again but the 3 items stay. Firefox builds the items in its own code
    when the bar becomes visible, and CSS can't trigger that, so revealing the bar from the pref alone would show an
    empty strip. Only a script could populate it, and a script is out of scope for FoxOne and FoxMica. Possible limit
    instead: a `:has(#PlacesToolbarItems > *)` guard so the dynamic rules wait until the bar is built (not tested).
    Most people start on a new tab or home page, which builds it at startup; session restore or a custom homepage
    would not. "Always Show" stays the supported setting for now. Still open: looking for a way to get the bar built without a script.
  - **Tested 2026-11-05, same profile, all three builds: what does and doesn't get the bar built.** Overriding
    Firefox's `[collapsed] { visibility: collapse }` with `visibility: visible` and a forced 1138x30px size draws the
    bar but it still has 0 items, so drawing is not the trigger (Firefox's JS keys on the `collapsed` attribute, which
    CSS can't change). What did build it: moving the "Bookmarks Toolbar Items" widget (`personal-bookmarks`) into the nav
    bar (what Customize does). It had all 3 items at startup while the bookmarks bar stayed collapsed, whatever the menu
    pref says. CSS can't clone the widget, and Firefox keeps one instance per window, so it is a move, not a copy; only
    toolbar areas Firefox registers will take it (only the nav bar tried). Idea if this is ever picked up: the user
    places the widget in a visible toolbar (a Customize step, like today's "Always Show" step) and CSS turns it into the
    dynamic or floating bar. Untested: how it renders, width and the overflow chevron, and whether the floating and
    hover rules can be moved onto it. It means rebuilding FoxOne's bar rules around a different element, so parked.
  - The stretch goal runs into FoxOne's `#navigator-toolbox { z-index: 9999 !important }`: the floating bar hangs from the
    toolbox, so it can't be layered below something outside the toolbox's stack without changing that rule.
  - FoxOne also has `--uc-dynamic-bookmarks-newtab` (keeps the bar revealed on fresh tabs), which would overlap with
    Firefox's "Only Show on New Tab".
  - Why not do it now: moving existing users means mapping one setting onto two, which a CSS file can't do for them.
    The default would become floating plus dynamic, so existing users would only see the new step-aside behaviour.
- **The next FoxMica release waits for FoxOne 4.0.4 (decided 2026-11-01).** 4.0.4 should carry the #82 step/hide work
  (branch `82-dynamic-bookmark-step-hide`). Then: `node scripts/pull-foxone.mjs 4.0.4`, remove what is upstream (patch 37's
  6a and 6c are already in 4.0.3), and cut patch 34 down to what only FoxMica needs (no borders, so the step is the full
  Firefox strip width). Until then patch 34 has two known ESR 153 faults: it checks `:root[sidebar-positionend]`, which ESR
  doesn't set, so the bar doesn't step aside with the sidebar on the right; and its fixed 50.47px is about 2px short here.
  Fallback if 4.0.4 is slow: pull 4.0.3, drop 6a and 6c, and give patch 34 the side check and the token formula.
- **1.0.2 is released (2026-10-28).** The next release has vertical tabs (#42) and the README wording (both in
  `CHANGELOG.md`); steps in `Notes-n-Tools\FoxMica-RELEASING.md`. Release notes for it are not started.
- **td40. FoxOne accent does not follow dynamic themes.** Seen 2026-10-18 while doing the selected-tab edge: with
  FoxOne, every theme (store themes too) gets FoxOne's accent on the tab edge, tab text and puzzle piece, not the
  theme's own colour. FoxOne's comment on that block says it is deliberate ("always applied, including under a
  dynamic theme"), but FoxOne is meant to have adaptive theme support, so check whether the accent itself should
  follow the theme (FoxOne's docs and issues) before calling it a bug. Our edge (patches/userChrome/35) uses
  `--uc-color-accent`, so it follows whatever FoxOne does.
- README: re-check the about:config table (is `widget.windows.mica.toplevel-backdrop` 2
  or 4 still wanted? In the dev profile, 2 made the tab strip black). Next release. (The pinstripe settings are in the
  table now.)
- td46. The extension hide (pinned extensions beside the hamburger hide until it is hovered) does not work with vertical
  tabs (seen 2026-11-06, not investigated). Suspected cause, not checked: with vertical tabs the overflow button goes
  back into the toolbar and the cluster rules don't exclude it, so the run of extensions is broken or the reveal never
  triggers. Check how the cluster is worked out in `vendor/userChrome.css` (the "unbroken run" rules, #62) and whether
  the vertical-tabs toolbar has other items in the way. Test on ESR 153 and Nightly.
- td47. Bookmarks bar items are spaced much tighter than the main bar's buttons (seen 2026-11-06, not investigated).
  FoxMica sets `--toolbarbutton-inner-padding` and `--toolbarbutton-outer-padding` from the density settings on
  `#nav-bar` only (`foxmica-tabs.css`), and patch 32 zeroes only the bookmarks bar's block padding, so the sideways
  spacing there is Firefox's own and never follows the density. The bookmark favicons live inside each item's own
  widget, so the nav-bar rules would not reach them either (Firefox itself may not do anything about them). Its own
  problem, separate from td45. Needs Firefox's rules for bookmark items read first, and measured at each density.
- td48. Showing the menu bar (press F10, or Alt) breaks the layout (found 2026-11-06 by pressing F10 by mistake, not
  investigated, cause unknown). Not related to the F11 work. First step: see whether it happens on plain FoxOne and on
  a clean profile with no theme, to tell a FoxOne, a FoxMica and a stock Firefox cause apart. Then check on Nightly
  and ESR 153.
- td49. Idea: a title bar instead of the URL box in the Mini Window (parked 2026-11-06, too big for now; patch 52 makes
  the box usable meanwhile). The window works like a PWA window or picture-in-picture, which doesn't need an address
  box. CSS can't copy the page title into the nav bar; it lives on the tab, and the Mini Window hides the tab strip.
  The route to check: un-hide the strip and style its one tab as a title bar. Needs Nightly's Mini Window layout read
  first. Hiding the box with no title would remove the only view of which site the window is on, so the title is what
  makes it safe. Firefox 160+ only, so not on ESR 153.
- td50. 1.1: rework the READMEs (collecting examples from other repos first, 2026-11-06). Ideas so far: a social
  preview image (repo Settings, General, Social preview, about 1280 x 640; it shows when the repo link is shared, check
  whether it also shows in GitHub's search listings); light and dark screenshots with `<picture>`; collapsible
  `<details>` sections to keep the README short; `> [!NOTE]` callouts; tables. The README stays short, the long pages
  stay in `docs/`.

## First bug-fix pass

- **Noted 2026-10-25, not started:**
  - DONE 2026-10-28 (4.0.2 pulled; patch 32 fixed the right-click growth). FoxOne 4.0.1 was out: a small bookmarks-bar bug ([FoxOne #74](https://github.com/Firnschnee/FoxOne/issues/74)). Pull it
    (`node scripts/pull-foxone.mjs 4.0.1`, assemble, check) and look at the bookmarks bar in StockMica+ and FoxOne-Mica,
    since patch 32 (bar height, reveal rules) copies FoxOne's reveal selectors.
  - StockMica+: the URL bar's inner part ("the gut") hangs out of the field. Gone on Nightly as of 2026-10-28 (cause
    unknown); recheck on ESR 153 before dropping this. Screenshot saved in the private notes
    (`issue-drafts\micaplus-urlbar-guts-2026-10-25.png`, URL text selected, Nightly). To do: reproduce, find which
    element sticks out (Browser Toolbox), then draft a FoxMica issue.

- **td43. The optional UI font does not reach the sidebar panels** (seen 2026-11-04, issue not filed yet). The font block
  in `userChrome.css` sets the font on `#sidebar-box`, but each sidebar panel (History, Bookmarks, Customize sidebar) is
  its own document with its own stylesheet, and a font set on the box does not pass into it. The `about:` pages work the
  same way and take theirs from `userContent.css` (the block's own comment says so). To do: confirm which panels keep the
  stock font, find their document addresses in the Browser Toolbox, and test a rule limited to those documents
  (`@-moz-document`, kept inside the switched-off font block so it stays off by default). Related to td16.
- [#40] Customize mode: a large gap shows on the left and the new-tab button pins to the end of the tab bar (stock Firefox
  does it too). Cause not traced; guess: a spacer (FoxOne hides `.titlebar-spacer`). Check with the Browser Toolbox in
  Customize mode, pick the empty space. Rejected idea (2026-10-24): switching the one-line bar off while customizing
  (`:root[customizing] { --ut-one-line: 0 }`): PWA windows don't, and a layout that jumps makes it harder to drag a
  button off the toolbar.
- td18. Selection contrast on about: pages [#7] (optional separate variable).
- td4. Sidebar button click target [#2]: fix in place, needs testing (override 7a+, in
  patches/userChrome/38-grab-and-nav.css). Cause: Firefox pads the first nav-bar button on purpose so a corner click
  hits it (browser-shared.css); not maximized, that ate our grab area.
- td2. Sidebar spacer: [#3] stop bookmarks/tools covering the minimized sidebar button.
  Maybe hide it when the sidebar is open.
- td28. [#13] Nova on: one animated built-in theme left the tab bar transparent. Fine with
  Nova off. Only one theme seen so far; check a few others before chasing it.
- td31. [#20] Fix the comment on the static bookmarks bar in foxmica-config.css: it says the static bar uses the
  translucent layer, but so far only Customize mode does. (Static on the layer is still the plan.)
- td34. Density moved: Nightly has dropped `browser.compactmode.show` entirely; the Customize -> Density switch
  now redirects to about:settings (Appearance). Not looked into yet. Check what ESR does, then update the README's
  about:config table (the `browser.compactmode.show` row) and the comment in foxmica-config.css (about line 53).
- td35. Reduced motion: check FoxMica (and FoxOne's reveals) with Windows' "Animation effects" off, which Firefox
  reports as `prefers-reduced-motion: reduce`. The hover reveals, tab and URL-bar transitions should go instant or
  near-instant. Raised on FoxOne #62.
- td36. In-flow bookmarks bar (`--ut-bookmarks-inflow: 1`), seen 2026-10-14:
  - Over-grows on reveal, then snaps to size when the pointer enters the bar. Cause: section 5's in-flow reveal
    (hover on the top row) still uses FoxOne's `max-height: 4em` + 6px padding; 5d only fixes the "pointer on the
    bar" case (28-bookmarks-bar.css and 32-bookmarks-height.css in patches/userChrome). Fix: give the in-flow
    reveal `--ut-bookmarks-height` and zero padding. Oddity: it didn't show with the generic icon width at 24px
    (was 26px, bar at 30px); re-check after the fix.
  - 1-2px gap under the active tab while the bar is collapsed: the bar's deliberate 2px sliver (opacity 0), from
    Wintego's version. Reason not written down.
  - The bar pushes the sidebar down with the page. Idea: negative top margin on the sidebar while the bar is open,
    so it reaches up into the bar's row and stays put.
  - Flicker looked fine on Nightly with hardware acceleration off.
- td37. DONE 2026-10-28 in 1.0.2 (patch 34, fixed offsets, not live: anchor positioning could not reach the sidebar,
  tabbox or splitter). Original plan: Overlay bookmarks bar (default) stops at the sidebar launcher: start the bar at the collapsed launcher's right
  edge so it doesn't cover the icons; the open sidebar panel covers the bar (or the bar sits over it, test both).
  Must follow the sidebar live: anchor positioning (as FoxOne pins the hamburger), with a fallback to the window
  edge when the sidebar is hidden, so the bar goes full width. May need the bar switched from absolute to fixed
  (anchor rules). Jumps rather than slides; fine for a bar that only shows on hover. Experiment first, test profile.

- Pre-1.0 test pass (2026-10-18): go through every open issue and every TODO feature, drop the ones that are obsolete, and turn the rest into one testing list (it will be a big one). Includes: re-check the about:config prefs table, starting with whether widget.windows.mica alone is enough (README says the `toplevel-backdrop` row is being re-checked); each StockMica+ setting (`micaplus-config.css`) switched off, and each mode (FoxOne-Mica, StockMica+, OEM drop-in replacement tabs, PWA windows) checked and documented with screenshots; ESR 153: both known bugs are fixed (#37, #38), so give it a full test pass in every mode before calling it supported. 0.9.1 is built on FoxOne 3.9.9 (what was tested; 3.9.10 was out on 2026-10-24); for 1.0, pull whatever FoxOne release is current then with `node scripts/pull-foxone.mjs <tag>`, rebuild, and re-test. Also test how the theme behaves with Firefox's built-in pin to taskbar feature (Windows), in every mode of regular Firefox (PWA windows disable the button, so nothing to test there). DONE 2026-10-31, briefly: the window has the same toolbar layout as vertical tabs without the tabs, it cannot be customised separately, and the theming looked fine at first glance. Not worth more attention unless someone files an issue.

## After launch

- **PWAs for Firefox theme** (has a milestone): at least a theme that runs on top of the addon's
  default PWA styling, the way FoxMica runs on FoxOne (done before with the Proton tab tweaks).
  End goal: detect the addon and import the existing user theme, or draw up a solution for their
  side to offer. Forked PWAs for Firefox to read their theme code. Also: the system install is the
  setup that started FoxMica; find a change that makes the original mistake impossible to repeat
  and offer it upstream (they helped last time), issue first. Back up the PWA profiles before testing.
- **Submit to the FirefoxCSS Store** [#30] (https://firefoxcss-store.github.io/submit/). They take a GitHub
  issue (their template): repo URL, short description, screenshots, tags. Their bot opens a PR and
  maintainers review it. Before submitting: more screenshots (more views, not just the main window)
  and a docs pass. Check their issue template for image size and allowed tags. Firn (FoxOne) says it's a form and
  that most of FoxOne's traffic comes from the store, and he approved the idea on #30, so this is worth doing well.
- [#39] macOS part of td8 (the rest is done, see Done; #24 is closed):
  macOS lead (from Firn, unverified, nobody here has a Mac): the closest thing to Mica is the older vibrancy
  blur, `widget.macos.titlebar-blend-mode.behind-window` in about:config. Liquid-fox and zvuc's
  firefox-macos-native-tabbar build their glass look on it. FoxMica could swap that pref for the Mica one and
  keep its transparency layer. Needs: a Mac tester, and a check that the pref still works on current releases.
- td6, td7, td21. [#25] Theme-aware tint like WinUI (Mica grey tinted by accent/wallpaper),
  theme picker support, inherit Windows system colours. Do these together. Also: a pinstripe in the accent colour for the built-in default/light/dark themes in plus mode belongs to #26 (five-colour palette), after 1.0: CSS cannot tell built-ins from store themes, so it needs the palette feature (inherit the Windows or store theme palette, then a custom override is almost free).
- td30. Palette readability [#8]: pick palette ratios so every text/background pair stays
  readable (4.5:1 for text, 3:1 for icons and large text), whatever colours are
  chosen. Found while drafting td18 (selected text is about 1.8:1). Ties in with td6, td7, td21.
  Notes (2026-10-30): patch 36 sets the text on primary buttons (popups) to the puzzle colour, a stopgap that does not
  pass the ratio on every palette. FoxOne pins it to the palette base, which passes but is near black. By my rough
  estimate: puzzle colour on FoxOne's dark accent is about 3:1, on FoxOne's light accent about 1.7:1 (not measured).
  FoxMica has no light defaults of its own yet; the light palette is FoxOne's Gruvbox Light, so ratios will change when
  we set ours. The maths route: relative colour syntax derives text from the accent, for example
  `oklch(from var(--uc-color-accent) calc((l - 0.65) * -100) 0 0)` clamps to black or white by the accent's lightness.
  Believed to ship in Firefox 128+ (not tested). CSS `color-contrast()` has not shipped, so it only approximates WCAG
  and the threshold needs tuning. Test set: FoxOne dark and light as the baseline, our own light defaults once they
  exist, a few custom palettes, and a dynamic theme's accent (test that part first).
- [#26] Five-colour palette: only the main five colours in the user config, the rest derived and moved
  to an advanced section. Depends on #25 and #8.
  Target 1.2 (2026-11-06), after the 1.1 clean-up of fixed values, which fits (td45). The fixed colours it would replace
  with ones derived from the palette: `--ut-layer`, `--ut-bookmarks-bg`, `--ut-fullscreen-bg`, and the hover and
  separator fills in patch 20 (`--ut-tab-hover-bg`, `--ut-separator`).
- td5. [#23] Scaling: "certified good enough", poke at it later.
- td19. [#28] Try `widget.windows.mica.popups` (it's 0 in the good profile's user.js).
- td10. Tab right-click menu: it's far too long. Trim it and reorder it with CSS (hide unused items, move
  Reopen Closed Tab to the top; untested idea: `#context_undoCloseTab { order: -1; }`). Plus a small
  extension for "New Tab to the Left" (no add-on found that does left; extensions can add items but
  not place them at the top).
- [#31] Vertical tabs are "Good Enough" (poked at a fair bit, not in every mode). Firn notes vertical tabs change `--tabstrip-min-height` (bar-height overrides).
  [#42] FIXED 2026-10-28, not released yet (next release): `foxmica-tabs.css` leaves vertical tabs to Firefox (`:where()` guard), patch 39 draws
  the FoxMica look (filled rounded rectangle, 10px inset). Original note, OEM tabs mode with vertical tabs (2026-10-24): works with the band-aid guard in `foxmica-tabs.css`, but the tabs
  have no radius and the wrong shade; that is the real fix. Was suspected from reading before it was tried: `foxmica-tabs.css` has no vertical guard, and its
  bar-height block forces `min-height` and `max-height` on `#tabbrowser-tabs` and `#tabbrowser-arrowscrollbox`, which would
  squash the vertical tab list to one bar height. The separators, rounded top corners and pinstripe are also drawn for a
  horizontal strip.

## Maybe, probably never

- td9. Fully transparent about: pages and chrome (flaky on Optimus laptops).
- td44. Narrower collapsed sidebar launcher strip (parked 2026-11-06, not started). The width where the bars and the
  strip line up is wider than wanted. Probably doable by overriding Firefox's launcher width token and the launcher
  buttons' padding, but patch 34 reads the same tokens (ESR 153 uses a measured 50.47px), so the bar offset has to
  follow, and every build needs measuring first.
- td45. Derive the fixed numbers from the density settings instead of tuning each by eye (parked 2026-11-06). First
  case: `--uc-toolbar-button-width` (26px in `foxmica-config.css`) only reserves room for one toolbar button in the tab
  strip's max-width, so it should come from the button size. Two models of that size disagree: the comment in
  `foxmica-tabs.css` says a button is 16px icon + 2 x inner + 2 x outer; a reading of Firefox's default says outer is
  the whole button box and inner is (outer - 16) / 2. The 26px only fits the first model if one outer edge is dropped,
  which is a fit to one value. Needed first: the whole box width of one tool button at compact, normal and touch, on
  each Firefox build supported (icons stay 16px at every density, checked). A formula has to match all three. Same
  idea for the bookmarks bar height and the find bar offset (bookmarks height = compact + 0.75 x (bar - compact) gives
  30/36/42 for a 30/38/46 bar). Check what FoxOne 4.1's option cleanup (#73) changes before building on this.

## Upstream notes (only once things are stable, one small issue per idea, no surprise PRs)

- FoxOne: a variable for the hard-coded 44px row [#6, landed in 3.8.8 as `--uc-row-height`; our patch 26 still points it at
  our bar height]; (landed in 3.9.1: nav hover delay [#17],
  hiding disabled Back/Forward [#18], the star and shield reveals [#1]);
  extension icons before the tabs [landed in 3.9.4: FoxOne #62/#63, with #32]; one shared config for chrome and
  content [#16, offered on FoxOne #50]; the Firefox View fix.
- FoxOne PR (three commits, in this order; the edits are written out in `Notes-n-Tools\issue-drafts\foxone-pr-edits.md`
  and apply to 3.9.10): 1) ESR 153 URL bar widening (our patch 49; offer to test on ESR 153), 2) the puzzle drawer (patches
  47 and 48; the side setting becomes `--uc-extensions-drawer-side`), 3) the find bar below the floating bookmarks bar
  (patch 44's second half; FoxMica [#43], closed; FoxOne has the same overlap, the new `--uc-bookmarks-bar-height` is 39px measured). Order of
  operations: tag the FoxMica point release (so the patches are a live example), post the issue to Firn, post the feature,
  send the PR, float a 4.0 so point releases can sync. 4.0 idea: the puzzle as the one anchor and trigger for the drawer in
  every case, pinned too; the pin stays (it is the only way to get the puzzle into the one-bar layout).
- Wintego: FF157+ dropdown fix (also paint `.urlbarView-background`); find-bar fix;
  the double-encoded text in his file; license-holder question.
  Wintego has no issues open and asks for pull requests instead, so these go to him as PRs.
- FoxOne paper cut (2026-11-01, compact density only): with the URL bar focused on a fresh tab, the field hangs a little
  below the toolbar's bottom edge, right above the open floating bookmarks bar. Seen on the FoxOne 4.0.3 branch for #82,
  which doesn't touch the URL bar, so probably in plain FoxOne too (not checked). Already fixed in FoxMica. Not checked
  on other Firefox builds. Show Firn when convenient.

## Done

- td42. DONE 2026-11-04, tested: vertical tabs with the in-flow bookmarks bar (`--ut-bookmarks-inflow: 1`) on FoxOne 4.0.4
  put the title-bar buttons on the left and lost the URL bar, half a second after the window opened. FoxOne 4.0.4's sidebar
  rules set `width: auto !important` on the bar. A floating bar is placed by left and right, but an in-flow bar is an item
  in the toolbox's flex row, so it stopped filling the row and squeezed the nav bar. Fix: `flex-basis: 100%` on the
  in-flow bar (patch 28), which FoxOne never sets. Patch 34's in-flow rule was ruled out first (same break with it off).

- ESR 153 fixes (2026-10-24, tested on ESR 153, pushed, unreleased): #37 (URL bar didn't widen while typing; patch
  `49-esr153-urlbar-widen.patch` adds `#urlbar[open]` to FoxOne's two widening rules, a new tab still waits for a click)
  and #38 / td39 (selected tab text stayed accent-coloured; `--tab-selected-textcolor` is now set on the selected tab
  in `foxmica-tabs.css`; FoxOne sets both that name and `--tab-text-color-selected` from `--uc-color-accent`, so it was
  our override that only covered one).
- Pulled FoxOne 3.9.10 (2026-10-25); only `10-strip-config.patch` needed a change (the hide-delay line, 50ms to 150ms). Patches
  47, 49 and 44's find-bar rule still apply. The README known issue now says the bookmarks bar reveals on the URL text.
- #41 fixed (2026-10-25): patch 48 is the whole drawer now (patch 50 folded in): the run of extension icons touching the
  puzzle, nav bar or title bar, one side only, set by `--ut-drawer-side` (left by default, `right` for a PWA window).
  Tested on ESR 153 in a PWA window and in both modes of a regular window. Gated on the puzzle being unpinned.
- 1.0 (2026-10-25) on FoxOne 4.0: FoxOne took our URL-bar fix (#69) and made the find-bar fix its own way (#70, same setting name
  `--uc-bookmarks-bar-height`); patch 49 is gone and patch 44 only maps the setting to FoxMica's bar height. Patch 32's reveal
  trigger follows FoxOne's URL-text trigger (it still used `#urlbar:hover`). Patch 48's reveal was flattened (no `:has()` in
  `:has()`, Firn's catch). Submission to the FirefoxCSS Store (#30) next.
- Closed or checked off 2026-10-24: #21 (refactor: five files, FoxOne untouched in vendor/, our changes in patches/, tooling in
  scripts/; still an idea, not tracked: trim the very long comments), #22 and td12 (ESR 153 backport), #24 and td8
  (StockMica+), #27 and td13 (tab-drag test), #29 and td20 (dwm resize hack with Mica), #5 with td29 and td1 (bookmarks bar
  vs sidebar, and the new-tab bar background). td39 (ESR 153 tab text) moved to its own issue, #38, and is fixed (see above).
- 0.9.1 (2026-10-21) on FoxOne 3.9.9, details in CHANGELOG.md. td8 (stock-plus) is done as StockMica+: `micaplus-config.css`
  (loads `foxmica-config.css` first, then overrides what differs) with `--ut-one-line: 0` and patches 44, 46, 47 and 48.
  `foxmica-plus.css` is gone. The three modes are named FoxOne-Mica, StockMica+ and OEM drop-in replacement tabs. The puzzle
  colour is in `foxmica-tabs.css`, so it works in every mode. PWAsForFirefox windows tested in StockMica+.
- Pulled FoxOne 3.9.8 and 3.9.9 (2026-10-21), skipping nothing. 3.9.8 widens the URL bar only while the dropdown is open
  (FoxOne #68), 3.9.9 followed; patches applied as they were.
- Released 0.8 "Brick by Brick" (2026-10-17): the five-file refactor (#21), FoxOne 3.9.7, `--ut-findbar-left`, unified
  hover delays (450/50 ms), the settings gathered in `foxmica-config.css`, preliminary ESR 153 testing. Release notes
  draft: Notes-n-Tools\issue-drafts\draft-release-foxmica-0.8.md.
- Pulled FoxOne 3.9.7 "Mute on the first click" (2026-10-17), skipping 3.9.5 and 3.9.6 in one step. 3.9.5: more
  Nova fixes. 3.9.6: the new-tab button rewrite that accounts for all the movable buttons (td38). 3.9.7: clicking
  a tab's mute button no longer stretches the URL bar and eats the click; it now widens only with focus in the
  nav-bar. Only change needed on our side: the strip patch's FIND text, for one new comment line (#67). The
  row-height variable we asked for (#57) is upstream. Checked in the dev profile, nothing off.
- td38. New-tab "+" and other movable buttons: fixed upstream in FoxOne 3.9.6 (Firn rewrote the fix to cover all
  the buttons, after FoxOne PR #65 fixed one case). No issue of ours, nothing to do on our side.
- Pulled FoxOne 3.9.4 "Icons where you put them" (2026-10-13, branch Pull-3.9.4-to-0.7.1, for 0.7.1). Our #62 fix
  landed upstream as #63 (Firn added `[hidden]` for FF158's Smart Window buttons). Closes #32: Customize-mode overrun.
  Tested FoxOne and FoxMica on 3.9.4 in all three Firefox versions.
- 2026-10-12 check-in: section 4 (bar height) checked against `--uc-row-height`, all good. userContent.css is on
  FoxOne 3.9.1 (#33). README is current with 0.7, including the Customize-mode quirks and the hover-reveal notes.
- td23. Hide nav controls while typing [#1]: done as click-to-cancel (override 7e, mode 2).
- td33. Tab bar does not overrun the buttons; the extension hover pushes them, and so do the tools tried.
- Gave up, issues closed: td14, white tab-loading highlight [#12]; td32, pinning the overflow button [#19].
- README "tested on" line: says Nightly 159, Nova on and off.
- Released 0.5 "Warts and all" (2026-10-07): FoxOne 3.8.7 [#14], [focused] fix [#15], new screenshot,
  dev files left out of the zip. Next releases: 0.5.1, 0.5.2 ... until 1.0.
- Nav-button hover delay, --ut-nav-delay [#17, closed]. Landed upstream as --uc-autohide-nav-delay (FoxOne 3.9.1, #58).
- Hide disabled Back/Forward, --ut-hide-disabled-nav [#18, closed]. Landed upstream as --uc-hide-disabled-nav-buttons
  (FoxOne 3.9.1, #54, #58). Only the Forward-alone option stays in our overrides.
- Charm and permission-icon delays [#1]: the URL-bar icons reveal when you rest on the bookmark star, the permission
  icons when you rest on the site-info icon or shield (FoxOne 3.9.1, #59; --uc-urlbar-icons-reveal). Our 7b/7c
  overrides and --ut-charms-on-hover, --ut-charm-delay, --ut-nav-delay are gone. Added --ut-hide-trust-label and
  --ut-hide-pip-button. Find-bar diacritics [#10] and the row-height variable [#6] also landed (3.8.8).
- Click into the URL text cancels the nav reveal (override 7e, mode 2 only), rewritten against 3.9.1's selectors.
  Firn's hot-area change only covers the star.
- Pulled FoxOne 3.9.1 (2026-10-11, branch 3.9.1-upstream-pull). Widths tuned: URL bar 30vw/224px collapsed,
  40vw/548px expanded; active tab 108-192px, inactive 48-66px, tab minimum 48px.
- One shared config file for chrome and content [#16, closed]. Offered on FoxOne #50 (closed there).
  Firn finds controlling the whole theme from 5 colours ambitious. Our answer is #8 (palette readability).
- Tabs reworked on Nova's own tab layers (2026-10-18, not released yet): foxmica-tabs.css no longer removes the tab
  border, so stock Firefox keeps Nova's gradient edge around the selected tab, with the Explorer-style fill inside
  and no bottom edge. New switch `--ut-tab-pinstripe` (1 or 0). Other themes' outline is swapped for the same 1px
  border. On FoxOne, Firefox's own themes (default, light, dark) get the fix in patches/userChrome/35: FoxOne clears
  Nova's gradient, which left the fill clipped to the border, and a user stylesheet cannot use the `border-area`
  clip Nova uses, so the edge is a plain border in FoxOne's accent (`--ut-tab-pinstripe-color` overrides it).
  Found along the way: `widget.windows.mica.toplevel-backdrop` = 2 in a profile makes the tab strip black (a pref,
  not CSS). The old td26 fix (background-clip in foxmica-tabs.css) is gone.
- td26. Tab fill/corners with Nova on [#11, closed]: fixed 2026-10-04 (background-clip on the
  selected tab; replaced 2026-10-18, see above). td25. Separators came back with it.
- td27. Outline only on the last tab: explained by td26. Nova changed how Firefox draws tabs; no fix needed.

- td15. userContent.css rebased on 3.8.5.
- td16. UI font as an option (switched-off block in userChrome.css).
- td17. CI workflow and check.mjs removed, so nothing to adapt.
- Repo published.
- Renamed to FoxMica (repo, folder, README), 2026-10-04.
