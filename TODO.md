# TODO

Numbers are kept stable so old chats still make sense. Don't renumber.
Gathered from the three setup chats on 2026-10-04. Corey's own notes beat this list
where they disagree.

## Now

- **26. Tab style doesn't apply with Nova on.** No selected-tab fill, square corners.
  Details and findings in CLAUDE.md, "Item 26".
- **25. Tab separators gone.** Probably the same cause as 26 (same file).
- **24. Modal dialogs have no background.** Maybe the same cause. Check with Nova off.

## First bug-fix pass

- 18. Selection contrast on about: pages (optional separate variable).
- 4. Sidebar button click target is much bigger than the icon (about half the
  window-grab padding). Did we cause it?
- 2. Sidebar spacer: stop bookmarks/tools covering the minimized sidebar button.
  Maybe hide it when the sidebar is open.
- 3. Charm delays: the permissions icon left of the URL bar has no delay. Check all
  optional URL-bar icons (PWAs for Firefox uses one).
- 11. Find-bar diacritics: change `content: "aá"` to `content: "a\E1"` (pure ASCII).
  Note: this is in FoxOne's file, so it's an override or an upstream note, not an edit.
- 14. Tab loading highlight is white.
- 22. "Make Firefox your default browser" bar has no background.
- 27. Odd: a red test outline on `.tabbrowser-tab` showed only on the last tab, in both
  Nova states. Not blocking. May explain itself once 26 is understood.
- README: update "tested on Nightly 157" to the version it really works on, and add a
  known-issue line for Nova until 26 is fixed.

## After launch

- 8. Stock-plus mode: turn off the one-line bar but keep the other goodies. Needs
  every feature switchable, and testing each feature off.
- 12. Backport to ESR 153. Check the Nova pref name there. Test Nova on and off.
- 13. Tab-drag test against upstream's fix (FoxOne 3.8.5, about line 2746).
- 6, 7, 21. Theme-aware tint like WinUI (Mica grey tinted by accent/wallpaper),
  theme picker support, inherit Windows system colours. Do these together.
- 1. Bookmarks bar on new tab: drop the background, clear tint with just enough
  contrast for the text.
- 5. Scaling: "certified good enough", poke at it later.
- 19. Try `widget.windows.mica.popups` (it's 0 in the good profile's user.js).
- 20. "DWM resize hack?" Corey to decide what this meant.
- 23. Maybe hide nav controls while the URL dropdown is open or the cursor is in it.
- Refactor: condense the files, trim the very long comments, move rarely used
  settings to an advanced section.

## Maybe, probably never

- 9. Fully transparent about: pages and chrome (flaky on Optimus laptops).
- 10. Extension to open new tabs on the left.

## Upstream notes (only once things are stable, one small issue per idea)

- FoxOne: a variable for the hard-coded 44px row; hover delays; hiding disabled
  Back/Forward; one shared config for chrome and content; the Firefox View fix.
- Wintego: FF157+ dropdown fix (also paint `.urlbarView-background`); find-bar fix;
  the double-encoded text in his file; license-holder question.

## Done

- 15. userContent.css rebased on 3.8.5.
- 16. UI font as an option (switched-off block in userChrome.css).
- 17. CI workflow and check.mjs removed, so nothing to adapt.
- Repo published.
