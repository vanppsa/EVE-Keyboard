import Adw from 'gi://Adw';
import Gdk from 'gi://Gdk';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class EveKeyboardPrefs extends ExtensionPreferences {

    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        window.add(page);

        const appearanceGroup = new Adw.PreferencesGroup({ title: 'Appearance' });
        page.add(appearanceGroup);

        const themeRow = new Adw.ComboRow({
            title: 'Theme',
            model: new Gtk.StringList({ strings: ['Dark', 'Light'] }),
        });
        themeRow.selected = settings.get_string('theme') === 'dark' ? 0 : 1;
        themeRow.connect('notify::selected', () => {
            settings.set_string('theme', themeRow.selected === 0 ? 'dark' : 'light');
        });
        appearanceGroup.add(themeRow);

        const sizeRow = new Adw.ComboRow({
            title: 'Key size',
            model: new Gtk.StringList({ strings: ['Small (S)', 'Medium (M)', 'Large (L)'] }),
        });
        const sizeMap = ['S', 'M', 'L'];
        sizeRow.selected = sizeMap.indexOf(settings.get_string('key-size'));
        sizeRow.connect('notify::selected', () => {
            settings.set_string('key-size', sizeMap[sizeRow.selected]);
        });
        appearanceGroup.add(sizeRow);

        const opacityRow = new Adw.ComboRow({
            title: 'Opacity',
            model: new Gtk.StringList({ strings: ['100%', '75%', '50%', '25%'] }),
        });
        const opacityMap = [1.0, 0.75, 0.50, 0.25];
        const curOp = settings.get_double('opacity');
        opacityRow.selected = opacityMap.indexOf(curOp);
        if (opacityRow.selected < 0) opacityRow.selected = 0;
        opacityRow.connect('notify::selected', () => {
            settings.set_double('opacity', opacityMap[opacityRow.selected]);
        });
        appearanceGroup.add(opacityRow);

        const layoutGroup = new Adw.PreferencesGroup({ title: 'Layout' });
        page.add(layoutGroup);

        const layoutRow = new Adw.ComboRow({
            title: 'Keyboard layout',
            model: new Gtk.StringList({ strings: ['Automatic', 'QWERTY US', 'ABNT2 BR'] }),
        });
        const layoutMap = ['auto', 'us', 'br'];
        layoutRow.selected = layoutMap.indexOf(settings.get_string('layout'));
        layoutRow.connect('notify::selected', () => {
            settings.set_string('layout', layoutMap[layoutRow.selected]);
        });
        layoutGroup.add(layoutRow);

        const layoutModeRow = new Adw.ComboRow({
            title: 'Layout mode',
            model: new Gtk.StringList({ strings: ['Full', 'Tenkeyless', '75%', 'Minimal'] }),
        });
        layoutModeRow.selected = Math.min(settings.get_int('layout-mode'), 3);
        layoutModeRow.connect('notify::selected', () => {
            settings.set_int('layout-mode', layoutModeRow.selected);
        });
        layoutGroup.add(layoutModeRow);

        const behaviorGroup = new Adw.PreferencesGroup({ title: 'Behavior' });
        page.add(behaviorGroup);

        const autoShowRow = new Adw.SwitchRow({
            title: 'Auto-show',
            subtitle: 'Show keyboard when focusing a text input',
        });
        settings.bind('auto-show', autoShowRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        behaviorGroup.add(autoShowRow);

        const stickyRow = new Adw.SwitchRow({
            title: 'Sticky modifiers',
            subtitle: 'Shift/Ctrl/Alt release after 1 key press',
        });
        settings.bind('sticky-modifiers', stickyRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        behaviorGroup.add(stickyRow);

        const monitorGroup = new Adw.PreferencesGroup({ title: 'Monitor' });
        page.add(monitorGroup);

        const monCount = Gdk.Display.get_default()?.get_monitors()?.get_n_items() ?? 1;
        const monitorModel = new Gtk.StringList();
        for (let i = 0; i < monCount; i++)
            monitorModel.append(`Monitor ${i + 1}`);

        const monitorRow = new Adw.ComboRow({
            title: 'Default monitor',
            model: monitorModel,
        });
        monitorRow.selected = Math.min(settings.get_int('monitor-index'), monCount - 1);
        monitorRow.connect('notify::selected', () => {
            settings.set_int('monitor-index', monitorRow.selected);
        });
        monitorGroup.add(monitorRow);
    }
}