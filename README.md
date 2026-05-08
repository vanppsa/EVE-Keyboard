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

## 🛠️ Installation

> [!WARNING]  
> **GNOME EXCLUSIVE:** This is a GNOME Shell extension. It will **NOT** work on KDE Plasma, XFCE, Cinnamon, or any other desktop environment.

### 1. System Dependencies
The extension requires `glib-compile-schemas` to work properly. If it is missing, the extension will silently fail.
Install it depending on your distribution:

- **Fedora/RHEL:** `sudo dnf install glib2-devel gnome-extensions-app`
- **Ubuntu/Debian:** `sudo apt install libglib2.0-dev gnome-shell-extension-prefs`
- **Arch Linux:** `sudo pacman -S glib2`

### 2. Install (Choose one method)

**Method A: Using the Install Script (Recommended)**
Simply run the installation script in the project root:
```bash
bash install.sh
```

**Method B: Using Makefile**
If you prefer using `make`:
```bash
make install
```

### 3. IMPORTANT: Restart GNOME Session
Because EVE Keyboard is a system extension, GNOME needs to detect the newly copied files.
- **On Wayland (Default on modern Fedora/Ubuntu):** You **MUST** save your work, **Log Out** of your user account, and **Log In** again.
- **On X11 (Older systems):** You can press `Alt+F2`, type `r`, and press `Enter`.

### 4. Troubleshooting (Common Errors)

**Error: "glib-compile-schemas not found"**
The `install.sh` script will stop and show this if you skipped step 1. You must install the GLib2 development package for your distribution (see Step 1).

**Error: "gnome-extensions command not found"**
The script will copy the files correctly but won't be able to enable the extension via terminal.
**Fix:** Install the GUI app to manage extensions (`sudo dnf install gnome-extensions-app` or `sudo apt install gnome-shell-extension-prefs`), then open the "Extensions" app in your system menu and turn on "EVE Keyboard".

**The extension doesn't show up after installation!**
You probably forgot to **Log Out** and **Log In** (Step 3). Wayland does not hot-reload new system extensions.

### 5. Official GNOME Extensions Store
*(Planned)* Soon you will be able to install this extension with a single click from [extensions.gnome.org](https://extensions.gnome.org/).

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
