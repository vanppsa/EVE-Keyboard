#!/bin/bash

# Define extension UUID
UUID="eve-keyboard@local"
DEST="$HOME/.local/share/gnome-shell/extensions/$UUID"

echo "🚀 Starting EVE Keyboard installation..."

# 0. Check if user is actually running GNOME
if [[ "$XDG_CURRENT_DESKTOP" != *"GNOME"* ]]; then
    echo "❌ CRITICAL ERROR: This extension is ONLY for GNOME Shell!"
    echo "You are currently running: ${XDG_CURRENT_DESKTOP:-'Unknown Desktop'}"
    echo "Installation aborted. This will not work on KDE, XFCE, Cinnamon, etc."
    exit 1
fi

# 1. Check for glib-compile-schemas (CRITICAL DEPENDENCY)
if ! command -v glib-compile-schemas &> /dev/null; then
    echo "❌ Error: 'glib-compile-schemas' not found."
    echo "💡 You need to install the GLib2 development package."
    echo "   Run the command for your Linux distribution:"
    echo "   - Fedora/RHEL: sudo dnf install glib2-devel"
    echo "   - Ubuntu/Debian: sudo apt install libglib2.0-dev"
    echo "   - Arch Linux: sudo pacman -S glib2"
    echo "   - openSUSE: sudo zypper install glib2-devel"
    echo "   After installing, run this script again."
    exit 1
fi

# 2. Create destination directory
echo "📁 Creating directory $DEST..."
mkdir -p "$DEST"

# 3. Copy files
echo "📦 Copying files..."
cp -r ./* "$DEST/"

# 4. Compile schemas
echo "⚙️  Compiling schemas..."
glib-compile-schemas "$DEST/schemas/"

# 5. Enable extension using gnome-extensions CLI
echo "🔌 Enabling extension..."
if command -v gnome-extensions &> /dev/null; then
    gnome-extensions enable "$UUID"
    echo "✅ Enabled via terminal."
else
    echo "⚠️  Warning: 'gnome-extensions' command not found."
    echo "💡 Please enable the extension manually using the 'Extensions' GUI app."
fi

echo ""
echo "🎉 INSTALLATION COMPLETED!"
echo "=========================================================="
echo "⚠️  CRITICAL STEP FOR WAYLAND USERS (Fedora/Ubuntu Default):"
echo "GNOME Shell must reload to detect the newly installed files."
echo "You MUST Log Out of your current session and Log In again."
echo "Pressing Alt+F2 + r does NOT work on Wayland."
echo "=========================================================="
