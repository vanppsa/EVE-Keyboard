# EVE Keyboard — Assistant Instructions

This project is a GNOME Shell extension (version 50+) that implements an optimized virtual keyboard for Wayland. It runs directly within the compositor, ensuring it always stays above windows and has access to low-level input via Clutter.

## Project Overview

- **Technologies:** JavaScript (GJS), GNOME Shell API (Clutter, St, Main), GTK4/Libadwaita (Preferences), GSettings, CSS.
- **Architecture:** Follows the modern GNOME extension pattern (ESM), using the `Extension` class as the entry point.
- **Highlights:** Key injection via `VirtualInputDevice`, US/BR (ABNT2) layout support, dead keys for accentuation, persistent positioning, and dynamic resizing.

## Key File Structure

- `extension.js`: Core logic, window management, keyboard rendering, and input injection.
- `prefs.js`: Settings interface using GTK4 and Libadwaita.
- `stylesheet.css`: Visual definitions for light and dark themes.
- `metadata.json`: Extension metadata (UUID, shell version, etc).
- `schemas/`: Contains the GSettings XML schema (`org.gnome.shell.extensions.eve-keyboard.gschema.xml`).

## Useful Commands

### Installation and Activation
```bash
# Copy to the user's extensions folder
mkdir -p ~/.local/share/gnome-shell/extensions/eve-keyboard@local
cp -r . ~/.local/share/gnome-shell/extensions/eve-keyboard@local/

# Compile schemas (required after changes to XML)
glib-compile-schemas ~/.local/share/gnome-shell/extensions/eve-keyboard@local/schemas/

# Activate the extension
gnome-extensions enable eve-keyboard@local
```

### Development and Debugging
```bash
# View real-time logs
journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve

# Open preferences window
gnome-extensions prefs eve-keyboard@local

# Test in a nested session (without needing to log out)
dbus-run-session -- gnome-shell --nested &
```

## Development Conventions

- **Modern JS:** Use ESM imports and the `Extension` class structure.
- **Styling:** All CSS classes must start with the `vkbd-` prefix to avoid conflicts with the shell.
- **GSettings:** Always add new keys in the `.gschema.xml` file before using them in the code, and remember to recompile the schema.
- **Layouts:** Layouts are defined in the `LAYOUTS` object within `extension.js`. Each key has a `label` (l), `keyval` (k), and optionally a shift symbol (s) or width (w).
- **Dead Keys:** Accent composition is managed by `DEAD_KEY_MAP`. If you add new accents, ensure you map the letter combinations.

## Changes Checklist

1. If changing CSS, check both `.vkbd-dk` (dark) and `.vkbd-lt` (light) themes.
2. If adding a new setting, update `gschema.xml`, `prefs.js`, and the reading logic in `extension.js`.
3. When adding layouts, verify that Clutter keyvals are correct.
4. Always test resizing and positioning after changes to the `St.BoxLayout` structure.
