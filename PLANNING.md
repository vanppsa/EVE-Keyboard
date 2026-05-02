# EVE Keyboard — Project Status

## Current Phase: COMPLETED up to Phase 4 (awaiting real testing)

The project is code-complete. All 4 phases have been implemented.
**Requires logout/login to test the extension in GNOME Shell.**

---

## Completed Phases

### Phase 1 — Critical Fixes ✅
- Backend API: `Clutter.get_default_backend()` → `Meta.get_backend()`
- Caps Lock: removed double toggle (now an internal modifier only)
- Indicator: `St.Button` in `_rightBox` → `PanelMenu.Button` + `addToStatusArea()`
- Position: hard-coded 670px → dynamic `this._panel.width`
- Space: empty label → "Space"
- Bug fix: `kv + 1` on release → correct `kv`

### Phase 2 — Layout and Input ✅
- ABNT2 BR layout with automatic detection via `org.gnome.desktop.input-sources`
- US/BR button in header for manual layout switching
- Dead keys: accent composition (ã, á, â, ä)
- Auto-repeat: 400ms delay, 80ms interval
- CSS class `.vkbd-dead` (purple) for active dead key

### Phase 3 — Preferences and GSettings ✅
- `schemas/org.gnome.shell.extensions.eve-keyboard.gschema.xml` (8 keys)
- `prefs.js` with GTK4/libadwaita (ComboRow + SwitchRow)
- Multi-monitor: monitor selection via GSettings
- Saved position: persists x/y on drag and restores on login
- Accessibility: `vkbd-accessible` class on keys

### Phase 4 — Auto-show and Real-time Settings ✅
- Auto-show: keyboard appears when focusing a text field via `Main.inputMethod`
- Settings watch: real-time changes (theme, layout, monitor)
- Configurable sticky modifiers: on/off via preferences

---

## After logout/login — Testing

1. `gnome-extensions enable eve-keyboard@local`
2. Verify the ⌨ icon appears in the panel
3. Test: show/hide, drag, normal keys, modifiers
4. Test: switch US/BR layout, dead keys (on BR layout: ~ + a = ã)
5. Test: auto-repeat (hold a key)
6. Test: preferences (`gnome-extensions prefs eve-keyboard@local`)
7. Debug: `journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve`

---

## Known Issues (to investigate after testing)

- `Main.inputMethod` might not be available in all contexts
- `Main.layoutManager.removeChrome()` — check if the correct API in GNOME 50 is `_removeChrome` or `removeChrome`
- Dead keys only cover tilde, acute, circumflex, umlaut (missing direct cedilla, grave accent)
- Modifier state not synchronized with physical keyboard

---

## Files

```
~/.local/share/gnome-shell/extensions/eve-keyboard@local/
├── metadata.json
├── extension.js
├── prefs.js
├── stylesheet.css
└── schemas/
    ├── org.gnome.shell.extensions.eve-keyboard.gschema.xml
    └── gschemas.compiled

~/Documentos/PROJETOS/EVE Keyboard/
├── PLANNING.md (this file)
├── README.md
├── extension.js
├── prefs.js
├── metadata.json
├── stylesheet.css
└── schemas/
```

---

## Future Roadmap

- More layouts (AZERTY, DVORAK)
- Modifier synchronization with physical keyboard
- i18n (gettext)
- More dead keys (grave accent `, direct cedilla Ç)
- Auto-hide when no text field is focused
- Drag-resize via touch/pinch
