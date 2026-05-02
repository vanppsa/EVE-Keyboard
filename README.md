# EVE Keyboard — Virtual Keyboard for GNOME Shell

The **EVE Keyboard** is a high-performance virtual keyboard extension for GNOME Shell (version 47/50+), specifically designed for **Fedora 44** and **Wayland** sessions.

Unlike common window-based keyboards, the EVE Keyboard runs directly within the GNOME Shell compositor. This ensures it always appears above any window, the lock screen, or system menus, utilizing the Clutter API for low-level input injection.

---

## ✨ Highlights

- 🚀 **Wayland Optimized**: Key injection via `VirtualInputDevice`.
- 📐 **Free Resizing**: Drag the keyboard's corner to adjust its scale (0.5x to 2.0x).
- 🖱️ **Persistent Positioning**: Drag and position it anywhere; the keyboard remembers its location for the next session.
- 🎨 **Modern UI**: Follows GNOME design principles with automatic light and dark themes.
- ⌨️ **Hybrid Layouts**: Full support for **US (QWERTY)** and **BR (ABNT2)** with dead keys (accentuation).
- ⚡ **Auto-Show**: The keyboard automatically appears when focusing text fields (optional).

---

## 🛠️ Installation on Fedora 44

### 1. System Dependencies
Ensure you have the necessary tools to compile the configuration schemas:

```bash
sudo dnf install glib2-devel gnome-extensions-app
```

### 2. Quick Installation (Script)
Run the block below in your terminal to download, install, and configure the extension automatically:

```bash
# Define the extension ID
UUID="eve-keyboard@local"
DEST="$HOME/.local/share/gnome-shell/extensions/$UUID"

# Create directories and copy files
mkdir -p "$DEST"
cp -r . "$DEST/"

# Compile schema configurations
glib-compile-schemas "$DEST/schemas/"

# Enable the extension
gnome-extensions enable "$UUID"
```

### 3. Restart GNOME Shell
As EVE Keyboard is a system extension, you need to restart your session for the Shell to load the new code:
- Save your work and **Log Out**, then **Log In** again.

---

## 🚀 How to Use

1.  **Activation**: A keyboard icon (**⌨**) will appear in the top panel (systray).
2.  **Move**: Click and hold the "arrows" icon in the keyboard header to drag it.
3.  **Scale**: Use the resize handle in the bottom-right corner to adjust the size.
4.  **Layout Switch**: Click the language indicator (`US` / `BR`) to switch instantly.
5.  **Accents**: Works like a physical keyboard (e.g., press `~` then `A` to get `ã`).

### Preferences
You can adjust the **Auto-Show** behavior, default scale, and key behaviors by opening the preferences:
```bash
gnome-extensions prefs eve-keyboard@local
```

---

## 👨‍💻 Development and Contribution

If you wish to modify the keyboard or add new layouts:

**Error Logs:**
```bash
journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve
```

**Test in Nested Session (without logging out):**
```bash
dbus-run-session -- gnome-shell --nested &
```

---

## 📄 License
This project is under the MIT license. Feel free to use, modify, and distribute.

---
*Developed for the GNOME community.*
