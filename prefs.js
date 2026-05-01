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

        const appearanceGroup = new Adw.PreferencesGroup({ title: 'Aparência' });
        page.add(appearanceGroup);

        const themeRow = new Adw.ComboRow({
            title: 'Tema',
            model: new Gtk.StringList({ strings: ['Escuro', 'Claro'] }),
        });
        themeRow.selected = settings.get_string('theme') === 'dark' ? 0 : 1;
        themeRow.connect('notify::selected', () => {
            settings.set_string('theme', themeRow.selected === 0 ? 'dark' : 'light');
        });
        appearanceGroup.add(themeRow);

        const sizeRow = new Adw.ComboRow({
            title: 'Tamanho das teclas',
            model: new Gtk.StringList({ strings: ['Pequeno (S)', 'Médio (M)', 'Grande (L)'] }),
        });
        const sizeMap = ['S', 'M', 'L'];
        sizeRow.selected = sizeMap.indexOf(settings.get_string('key-size'));
        sizeRow.connect('notify::selected', () => {
            settings.set_string('key-size', sizeMap[sizeRow.selected]);
        });
        appearanceGroup.add(sizeRow);

        const layoutGroup = new Adw.PreferencesGroup({ title: 'Layout' });
        page.add(layoutGroup);

        const layoutRow = new Adw.ComboRow({
            title: 'Layout do teclado',
            model: new Gtk.StringList({ strings: ['Automático', 'QWERTY US', 'ABNT2 BR'] }),
        });
        const layoutMap = ['auto', 'us', 'br'];
        layoutRow.selected = layoutMap.indexOf(settings.get_string('layout'));
        layoutRow.connect('notify::selected', () => {
            settings.set_string('layout', layoutMap[layoutRow.selected]);
        });
        layoutGroup.add(layoutRow);

        const behaviorGroup = new Adw.PreferencesGroup({ title: 'Comportamento' });
        page.add(behaviorGroup);

        const autoShowRow = new Adw.SwitchRow({
            title: 'Mostrar automaticamente',
            subtitle: 'Exibir o teclado ao focar um campo de texto',
        });
        settings.bind('auto-show', autoShowRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        behaviorGroup.add(autoShowRow);

        const stickyRow = new Adw.SwitchRow({
            title: 'Modificadores sticky',
            subtitle: 'Shift/Ctrl/Alt soltam após pressionar 1 tecla',
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
            title: 'Monitor padrão',
            model: monitorModel,
        });
        monitorRow.selected = Math.min(settings.get_int('monitor-index'), monCount - 1);
        monitorRow.connect('notify::selected', () => {
            settings.set_int('monitor-index', monitorRow.selected);
        });
        monitorGroup.add(monitorRow);
    }
}
