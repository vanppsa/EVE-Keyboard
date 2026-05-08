UUID = eve-keyboard@local
DEST = $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

.PHONY: install uninstall

install:
	@echo "🚀 Installing $(UUID)..."
	@mkdir -p "$(DEST)"
	@cp -r ./* "$(DEST)/"
	@glib-compile-schemas "$(DEST)/schemas/"
	@gnome-extensions enable "$(UUID)"
	@echo "✅ Installation completed!"
	@echo "⚠️ ATTENTION: On Wayland sessions, you must Log Out and Log In to apply changes."

uninstall:
	@echo "🗑️ Removing $(UUID)..."
	@gnome-extensions disable "$(UUID)" || true
	@rm -rf "$(DEST)"
	@echo "✅ Removal completed!"
