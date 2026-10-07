# TODO

Items marked [#n] are GitHub issues on snkiz/FoxMica; the issue holds the details.

Numbers are kept stable so old chats still make sense. Don't renumber.
Gathered from the three setup chats on 2026-10-04. The maintainer's own notes beat this list
where they disagree.

## Now

- **24. Modal dialogs: background is back but black** [#4] (Nova on). Fixed the missing
  background 2026-10-04 by scoping section 1 of userChrome-foxone-overrides.css to
  `#main-window` (it had made every chrome document transparent, dialogs included).
  Left to do: dialogs should use the theme palette, not black. Readable for now.
  Item 22 (the "make Firefox your default browser" bar) is the same dialog, so it gets fixed with this one.
- **29. Bookmarks bar vs sidebar mismatch.** [#5] The sidebar is now properly translucent;
  the floating bookmarks bar is still solid, so it looks half on, half off. Ties in
  with item 1. Test against a busy wallpaper (a brick pattern works well).

## Next time

- **Pull FoxOne upstream** (urlbar changes). Probably fine: we may not use those parts. Check before
  dropping it in.
- **Retake the README screenshot** (assets/Screenshot-main.png): the current one is
  from before the tab fix. Hide or change the weather widget first.
  Keep the same file name.

## First bug-fix pass

- 18. Selection contrast on about: pages [#7] (optional separate variable).
- 4. Sidebar button click target [#2] is much bigger than the icon (about half the
  window-grab padding). Did we cause it?
- 2. Sidebar spacer: [#3] stop bookmarks/tools covering the minimized sidebar button.
  Maybe hide it when the sidebar is open.
- 3. Charm delays: [#1] the permissions icon left of the URL bar has no delay. Check all
  optional URL-bar icons (PWAs for Firefox uses one).
- 11. Find-bar diacritics [#10]: change `content: "aá"` to `content: "a\E1"` (pure ASCII).
  Note: this is in FoxOne's file, so it's an override or an upstream note, not an edit.
- 14. Tab loading highlight is white [#12] (keep it or match the palette?).
- 28. Nova on: one animated built-in theme left the tab bar transparent. Fine with
  Nova off. Only one theme seen so far; check a few others before chasing it.
- README: update "tested on Nightly 157" to the version it really works on, and add a
  known-issue line for Nova until 26 is fixed.
- 31. Fix the comment on the static bookmarks bar in foxone-config.css: it says the static bar uses the
  translucent layer, but so far only Customize mode does. (Static on the layer is still the plan.)
- 32. Try pinning the overflow (>>) button the way --ut-pin-downloads pins Downloads. Might not work out.

## After launch

- 8. Stock-plus mode: turn off the one-line bar but keep the other goodies. Needs
  every feature switchable, and testing each feature off.
- 12. Backport to ESR 153. Check the Nova pref name there. Test Nova on and off.
- 13. Tab-drag test against upstream's fix (FoxOne 3.8.5, about line 2746).
- 6, 7, 21. Theme-aware tint like WinUI (Mica grey tinted by accent/wallpaper),
  theme picker support, inherit Windows system colours. Do these together.
- 30. Palette readability [#8]: pick palette ratios so every text/background pair stays
  readable (4.5:1 for text, 3:1 for icons and large text), whatever colours are
  chosen. Found while drafting 18 (selected text is about 1.8:1). Ties in with 6, 7, 21.
- 1. Bookmarks bar on new tab: [#5] drop the background, clear tint with just enough
  contrast for the text.
- 5. Scaling: "certified good enough", poke at it later.
- 19. Try `widget.windows.mica.popups` (it's 0 in the good profile's user.js).
- 20. "DWM resize hack?" Maintainer to decide what this meant.
- 23. Maybe hide nav controls [#1] while the URL dropdown is open or the cursor is in it.
- Refactor: condense the files, trim the very long comments, move rarely used
  settings to an advanced section.

## Maybe, probably never

- 9. Fully transparent about: pages and chrome (flaky on Optimus laptops).
- 10. Extension to open new tabs on the left.

## Upstream notes (only once things are stable, one small issue per idea, no surprise PRs)

- FoxOne: a variable for the hard-coded 44px row [#6, label Drafts]; hover delays; hiding disabled
  Back/Forward; one shared config for chrome and content; the Firefox View fix.
- Wintego: FF157+ dropdown fix (also paint `.urlbarView-background`); find-bar fix;
  the double-encoded text in his file; license-holder question.

## Done

- 26. Tab fill/corners with Nova on [#11, closed]: fixed 2026-10-04 (background-clip on the
  selected tab). 25. Separators came back with it.
- 27. Outline only on the last tab: explained by 26. Nova changed how Firefox draws tabs; no fix needed.

- 15. userContent.css rebased on 3.8.5.
- 16. UI font as an option (switched-off block in userChrome.css).
- 17. CI workflow and check.mjs removed, so nothing to adapt.
- Repo published.
- Renamed to FoxMica (repo, folder, README), 2026-10-04.
