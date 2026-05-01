import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

const POS_Y_OFFSET = 295;
const SIZES = { S: 34, M: 42, L: 52 };
const REPEAT_DELAY_MS = 400;
const REPEAT_INTERVAL_MS = 80;

const LAYOUTS = {
    us: {
        name: 'QWERTY US',
        rows: [
            [
                { l: '`', k: 96, s: 126 }, { l: '1', k: 49, s: 33 }, { l: '2', k: 50, s: 64 },
                { l: '3', k: 51, s: 35 }, { l: '4', k: 52, s: 36 }, { l: '5', k: 53, s: 37 },
                { l: '6', k: 54, s: 94 }, { l: '7', k: 55, s: 38 }, { l: '8', k: 56, s: 42 },
                { l: '9', k: 57, s: 40 }, { l: '0', k: 48, s: 41 }, { l: '-', k: 45, s: 95 },
                { l: '=', k: 61, s: 43 }, { l: '⌫', k: 65288, w: 2 },
            ],
            [
                { l: 'Tab', k: 65289, w: 1.5 }, { l: 'Q', k: 113 }, { l: 'W', k: 119 },
                { l: 'E', k: 101 }, { l: 'R', k: 114 }, { l: 'T', k: 116 }, { l: 'Y', k: 121 },
                { l: 'U', k: 117 }, { l: 'I', k: 105 }, { l: 'O', k: 111 }, { l: 'P', k: 112 },
                { l: '[', k: 91, s: 123 }, { l: ']', k: 93, s: 125 }, { l: '\\', k: 92, s: 124, w: 1.5 },
            ],
            [
                { l: 'Caps', k: 65509, w: 1.75, sp: 'caps' }, { l: 'A', k: 97 }, { l: 'S', k: 115 },
                { l: 'D', k: 100 }, { l: 'F', k: 102 }, { l: 'G', k: 103 }, { l: 'H', k: 104 },
                { l: 'J', k: 106 }, { l: 'K', k: 107 }, { l: 'L', k: 108 },
                { l: ';', k: 59, s: 58 }, { l: "'", k: 39, s: 34 }, { l: 'Enter', k: 65293, w: 2.25 },
            ],
            [
                { l: '⇧', k: 65505, w: 2.25, sp: 'shift' }, { l: 'Z', k: 122 }, { l: 'X', k: 120 },
                { l: 'C', k: 99 }, { l: 'V', k: 118 }, { l: 'B', k: 98 }, { l: 'N', k: 110 },
                { l: 'M', k: 109 }, { l: ',', k: 44, s: 60 }, { l: '.', k: 46, s: 62 },
                { l: '/', k: 47, s: 63 }, { l: '⇧', k: 65506, w: 2.75, sp: 'shift' },
            ],
            [
                { l: 'Ctrl', k: 65507, w: 1.5, sp: 'ctrl' }, { l: 'Alt', k: 65513, w: 1.25, sp: 'alt' },
                { l: 'Espaço', k: 32, w: 6.5 },
                { l: 'Alt', k: 65514, w: 1.25 }, { l: 'Ctrl', k: 65508, w: 1.5 },
                { l: '←', k: 65361 }, { l: '↑', k: 65362 }, { l: '↓', k: 65364 }, { l: '→', k: 65363 },
            ],
        ],
    },
    br: {
        name: 'ABNT2 BR',
        rows: [
            [
                { l: "'", k: 39, s: 34 }, { l: '1', k: 49, s: 33 }, { l: '2', k: 50, s: 64 },
                { l: '3', k: 51, s: 35 }, { l: '4', k: 52, s: 36 }, { l: '5', k: 53, s: 37 },
                { l: '6', k: 54, s: 94 }, { l: '7', k: 55, s: 38 }, { l: '8', k: 56, s: 42 },
                { l: '9', k: 57, s: 40 }, { l: '0', k: 48, s: 41 }, { l: '-', k: 45, s: 95 },
                { l: '=', k: 61, s: 43 }, { l: '⌫', k: 65288, w: 2 },
            ],
            [
                { l: 'Tab', k: 65289, w: 1.5 }, { l: 'Q', k: 113 }, { l: 'W', k: 119 },
                { l: 'E', k: 101 }, { l: 'R', k: 114 }, { l: 'T', k: 116 }, { l: 'Y', k: 121 },
                { l: 'U', k: 117 }, { l: 'I', k: 105 }, { l: 'O', k: 111 }, { l: 'P', k: 112 },
                { l: '[', k: 91, s: 123 }, { l: ']', k: 93, s: 125 }, { l: '\\', k: 92, s: 124, w: 1.5 },
            ],
            [
                { l: 'Caps', k: 65509, w: 1.75, sp: 'caps' }, { l: 'A', k: 97 }, { l: 'S', k: 115 },
                { l: 'D', k: 100 }, { l: 'F', k: 102 }, { l: 'G', k: 103 }, { l: 'H', k: 104 },
                { l: 'J', k: 106 }, { l: 'K', k: 107 }, { l: 'L', k: 108 },
                { l: 'Ç', k: 231 }, { l: '~', k: 65104, dd: true }, { l: 'Enter', k: 65293, w: 2.25 },
            ],
            [
                { l: '⇧', k: 65505, w: 2.25, sp: 'shift' }, { l: 'Z', k: 122 }, { l: 'X', k: 120 },
                { l: 'C', k: 99 }, { l: 'V', k: 118 }, { l: 'B', k: 98 }, { l: 'N', k: 110 },
                { l: 'M', k: 109 }, { l: ',', k: 44, s: 60 }, { l: '.', k: 46, s: 62 },
                { l: ';', k: 59, s: 58 }, { l: '/', k: 47, s: 63 }, { l: '⇧', k: 65506, w: 1.75, sp: 'shift' },
            ],
            [
                { l: 'Ctrl', k: 65507, w: 1.5, sp: 'ctrl' }, { l: 'Alt', k: 65513, w: 1.25, sp: 'alt' },
                { l: 'Espaço', k: 32, w: 5.5 },
                { l: 'AltGr', k: 65027, w: 1.25 }, { l: 'Ctrl', k: 65508, w: 1.5 },
                { l: '←', k: 65361 }, { l: '↑', k: 65362 }, { l: '↓', k: 65364 }, { l: '→', k: 65363 },
            ],
        ],
    },
};

const DEAD_KEY_MAP = {
    65104: {
        'a': 227, 'e': 7869, 'o': 245,
        'A': 195, 'E': 7868, 'O': 213,
        ' ': 65104,
    },
    65105: {
        'a': 225, 'e': 233, 'i': 237, 'o': 243, 'u': 250,
        'A': 193, 'E': 201, 'I': 205, 'O': 211, 'U': 218,
        ' ': 65105,
    },
    65106: {
        'a': 226, 'e': 234, 'i': 238, 'o': 244, 'u': 251,
        'A': 194, 'E': 202, 'I': 206, 'O': 212, 'U': 219,
        ' ': 65106,
    },
    65107: {
        'a': 228, 'e': 235, 'i': 239, 'o': 246, 'u': 252,
        'A': 196, 'E': 203, 'I': 207, 'O': 214, 'U': 220,
        ' ': 65107,
    },
};

export default class EveKeyboard extends Extension {

    enable() {
        this._settings = this.getSettings();
        this._keys = [];
        this._sids = [];
        this._dragState = null;
        this._repeatTimer = null;
        this._deadKey = null;
        this._focusSids = [];

        const themeStr = this._settings.get_string('theme');
        this._dark = themeStr !== 'light';

        const sizeStr = this._settings.get_string('key-size');
        this._size = SIZES[sizeStr] || SIZES.M;

        this._shift = false;
        this._caps = false;
        this._ctrl = false;
        this._alt = false;

        this._currentLayout = this._resolveLayout();

        const backend = global.stage.context.get_backend();
        const seat = backend.get_default_seat();
        this._vkbd = seat.create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);

        this._buildKbd();
        this._buildIndicator();
        this._setupSettingsWatch();
        this._setupFocusTracker();
    }

    disable() {
        this._stopRepeat();
        this._sids.forEach(id => global.stage.disconnect(id));
        this._sids = [];
        this._focusSids.forEach(id => global.stage.disconnect(id));
        this._focusSids = [];
        this._indicator?.destroy();
        this._indicator = null;
        this._panel?.destroy();
        this._panel = null;
        this._vkbd = null;
        this._keys = [];
        this._dragState = null;
        this._deadKey = null;
        this._settings = null;
    }

    _resolveLayout() {
        const cfg = this._settings.get_string('layout');
        if (cfg === 'us' || cfg === 'br') return cfg;
        try {
            const src = Gio.Settings.new('org.gnome.desktop.input-sources');
            const sources = src.get_value('sources').deep_unpack();
            for (const [, layout] of sources) {
                if (layout === 'br') return 'br';
            }
        } catch (_e) { }
        return 'us';
    }

    _getTargetMonitor() {
        const idx = this._settings.get_int('monitor-index');
        const monitors = Main.layoutManager.monitors;
        return monitors[idx] || Main.layoutManager.primaryMonitor;
    }

    _buildKbd() {
        this._keys = [];

        const themeCls = this._dark ? 'vkbd-dk' : 'vkbd-lt';
        this._panel = new St.BoxLayout({
            vertical: true,
            reactive: true,
            style_class: `vkbd ${themeCls}`,
        });
        this._panel.add_child(this._buildHeader());

        const layout = LAYOUTS[this._currentLayout];
        for (const row of layout.rows) {
            const box = new St.BoxLayout({ style_class: 'vkbd-row' });
            for (const def of row) {
                const btn = this._mkKey(def);
                box.add_child(btn);
                this._keys.push({ btn, def });
            }
            this._panel.add_child(box);
        }

        Main.layoutManager.addTopChrome(this._panel);

        const mon = this._getTargetMonitor();
        const savedX = this._settings.get_int('panel-x');
        const savedY = this._settings.get_int('panel-y');

        if (savedX >= 0 && savedY >= 0) {
            this._panel.set_position(savedX, savedY);
        } else {
            this._panel.set_position(
                Math.round((mon.width - this._panel.width) / 2),
                mon.height - POS_Y_OFFSET
            );
        }

        this._setupDrag();
    }

    _buildHeader() {
        const bar = new St.BoxLayout({ style_class: 'vkbd-header', reactive: true });

        const title = new St.Label({
            text: '⌨  EVE Keyboard',
            style_class: 'vkbd-title',
            x_expand: true,
        });
        title.add_style_class_name('vkbd-accessible');
        bar.add_child(title);

        const layoutBtn = this._hBtn(this._currentLayout.toUpperCase());
        layoutBtn.add_style_class_name('vkbd-layout-btn');
        layoutBtn.connect('clicked', () => {
            this._currentLayout = this._currentLayout === 'us' ? 'br' : 'us';
            layoutBtn.label = this._currentLayout.toUpperCase();
            this._rebuildKbd();
        });
        bar.add_child(layoutBtn);

        for (const [lbl, sz] of Object.entries(SIZES)) {
            const b = this._hBtn(lbl);
            b.connect('clicked', () => {
                this._size = sz;
                this._settings.set_string('key-size', lbl);
                this._applySize();
            });
            bar.add_child(b);
        }

        this._themeBtn = this._hBtn(this._dark ? '☀' : '🌙');
        this._themeBtn.connect('clicked', () => this._toggleTheme());
        bar.add_child(this._themeBtn);

        const closeBtn = this._hBtn('✕');
        closeBtn.add_style_class_name('vkbd-close');
        closeBtn.connect('clicked', () => { this._panel.visible = false; });
        bar.add_child(closeBtn);

        this._header = bar;
        return bar;
    }

    _hBtn(label) {
        return new St.Button({ label, style_class: 'vkbd-hbtn', can_focus: false });
    }

    _mkKey(def) {
        const btn = new St.Button({
            label: def.l,
            can_focus: false,
            style_class: this._keyCls(def, false),
            width: this._size * (def.w ?? 1),
            height: this._size,
        });
        btn.add_style_class_name('vkbd-accessible');

        btn.connect('button-press-event', () => {
            this._stopRepeat();
            this._onKey(def);
            if (!def.sp && !def.dd) {
                this._repeatDef = def;
                this._repeatTimer = GLib.timeout_add(
                    GLib.PRIORITY_DEFAULT,
                    REPEAT_DELAY_MS,
                    () => {
                        this._repeatTimer = GLib.timeout_add(
                            GLib.PRIORITY_DEFAULT,
                            REPEAT_INTERVAL_MS,
                            () => {
                                this._emitKey(def);
                                return GLib.SOURCE_CONTINUE;
                            }
                        );
                        return GLib.SOURCE_REMOVE;
                    }
                );
            }
            return Clutter.EVENT_PROPAGATE;
        });
        btn.connect('button-release-event', () => {
            this._stopRepeat();
            return Clutter.EVENT_PROPAGATE;
        });
        return btn;
    }

    _stopRepeat() {
        if (this._repeatTimer) {
            GLib.source_remove(this._repeatTimer);
            this._repeatTimer = null;
        }
    }

    _rebuildKbd() {
        if (this._panel) {
            Main.layoutManager.removeChrome(this._panel);
            this._panel.destroy();
        }
        this._buildKbd();
    }

    _setupDrag() {
        this._dragState = null;

        this._header.connect('button-press-event', (_a, e) => {
            const [sx, sy] = e.get_coords();
            this._dragState = { sx, sy, ox: this._panel.x, oy: this._panel.y };
            return Clutter.EVENT_STOP;
        });

        this._header.connect('button-release-event', () => {
            this._savePosition();
            this._dragState = null;
            return Clutter.EVENT_PROPAGATE;
        });

        this._sids.push(global.stage.connect('captured-event', (_a, e) => {
            if (!this._dragState || !this._panel) return Clutter.EVENT_PROPAGATE;

            const t = e.type();
            if (t === Clutter.EventType.MOTION) {
                const [x, y] = e.get_coords();
                const d = this._dragState;
                this._panel.set_position(d.ox + x - d.sx, d.oy + y - d.sy);
                return Clutter.EVENT_STOP;
            }
            if (t === Clutter.EventType.BUTTON_RELEASE) {
                this._savePosition();
                this._dragState = null;
            }
            return Clutter.EVENT_PROPAGATE;
        }));
    }

    _savePosition() {
        if (!this._panel || !this._settings) return;
        this._settings.set_int('panel-x', this._panel.x);
        this._settings.set_int('panel-y', this._panel.y);
    }

    _setupSettingsWatch() {
        this._settings.connect('changed::theme', () => {
            const want = this._settings.get_string('theme');
            const isDark = want === 'dark';
            if (isDark !== this._dark) this._toggleTheme();
        });

        this._settings.connect('changed::layout', () => {
            const newLayout = this._resolveLayout();
            if (newLayout !== this._currentLayout) {
                this._currentLayout = newLayout;
                this._rebuildKbd();
            }
        });

        this._settings.connect('changed::monitor-index', () => {
            const mon = this._getTargetMonitor();
            this._panel.set_position(
                Math.round((mon.width - this._panel.width) / 2),
                mon.height - POS_Y_OFFSET
            );
            this._settings.set_int('panel-x', -1);
            this._settings.set_int('panel-y', -1);
        });
    }

    _setupFocusTracker() {
        if (!Main.inputMethod || !this._settings.get_boolean('auto-show')) return;

        try {
            const im = Main.inputMethod;

            this._focusSids.push(im.connect('notify::has-focus', () => {
                if (!this._settings.get_boolean('auto-show')) return;
                if (im.has_focus) {
                    if (this._panel && !this._panel.visible) this._panel.visible = true;
                }
            }));

            this._settings.connect('changed::auto-show', () => {
                if (!this._settings.get_boolean('auto-show') && this._panel) {
                    this._focusSids.forEach(id => im.disconnect(id));
                    this._focusSids = [];
                }
            });
        } catch (_e) { }
    }

    _onKey(def) {
        if (def.sp === 'shift') { this._shift = !this._shift; this._refresh(); return; }
        if (def.sp === 'ctrl') { this._ctrl = !this._ctrl; this._refresh(); return; }
        if (def.sp === 'alt') { this._alt = !this._alt; this._refresh(); return; }
        if (def.sp === 'caps') {
            this._caps = !this._caps;
            this._refresh();
            return;
        }

        if (def.dd) {
            this._deadKey = def.k;
            this._refresh();
            return;
        }

        this._emitKey(def);
    }

    _emitKey(def) {
        const t = GLib.get_monotonic_time();

        if (this._ctrl) this._vkbd.notify_keyval(t, 65507, Clutter.KeyState.PRESSED);
        if (this._alt) this._vkbd.notify_keyval(t, 65513, Clutter.KeyState.PRESSED);

        let kv = def.k;
        const isLetter = kv >= 97 && kv <= 122;
        if (isLetter) {
            if (this._shift !== this._caps) kv -= 32;
        } else if (this._shift && def.s != null) {
            kv = def.s;
        }

        if (this._deadKey && DEAD_KEY_MAP[this._deadKey]) {
            const composed = this._lookupDead(this._deadKey, kv);
            if (composed) {
                this._vkbd.notify_keyval(t, composed, Clutter.KeyState.PRESSED);
                this._vkbd.notify_keyval(t, composed, Clutter.KeyState.RELEASED);
                this._deadKey = null;
                this._releaseModifiers(t);
                return;
            }
            this._deadKey = null;
        }

        this._vkbd.notify_keyval(t, kv, Clutter.KeyState.PRESSED);
        this._vkbd.notify_keyval(t, kv, Clutter.KeyState.RELEASED);

        this._releaseModifiers(t);
    }

    _lookupDead(deadKv, kv) {
        const map = DEAD_KEY_MAP[deadKv];
        if (!map) return null;

        const char = String.fromCodePoint(kv);
        if (map[char] !== undefined) return map[char];

        const upper = char.toUpperCase();
        if (map[upper] !== undefined) return map[upper];

        return null;
    }

    _releaseModifiers(t) {
        if (this._alt) this._vkbd.notify_keyval(t, 65513, Clutter.KeyState.RELEASED);
        if (this._ctrl) this._vkbd.notify_keyval(t, 65507, Clutter.KeyState.RELEASED);

        const sticky = this._settings
            ? this._settings.get_boolean('sticky-modifiers')
            : true;

        if (sticky && (this._shift || this._ctrl || this._alt)) {
            this._shift = this._ctrl = this._alt = false;
            this._refresh();
        }
    }

    _keyCls(def, active) {
        const t = this._dark ? 'dk' : 'lt';
        let cls = `vkbd-key vkbd-k-${t}`;
        if (active) cls += ' vkbd-on';
        if (def.dd && this._deadKey === def.k) cls += ' vkbd-dead';
        return cls;
    }

    _refresh() {
        for (const { btn, def } of this._keys) {
            const active =
                (def.sp === 'shift' && this._shift) ||
                (def.sp === 'caps' && this._caps) ||
                (def.sp === 'ctrl' && this._ctrl) ||
                (def.sp === 'alt' && this._alt) ||
                (def.dd && this._deadKey === def.k);
            btn.style_class = this._keyCls(def, active);
        }
    }

    _toggleTheme() {
        this._dark = !this._dark;
        const t = this._dark ? 'dk' : 'lt';
        this._panel.style_class = `vkbd vkbd-${t}`;
        this._themeBtn.label = this._dark ? '☀' : '🌙';
        this._settings.set_string('theme', this._dark ? 'dark' : 'light');
        this._refresh();
    }

    _applySize() {
        for (const { btn, def } of this._keys)
            btn.set_size(this._size * (def.w ?? 1), this._size);

        const mon = this._getTargetMonitor();
        this._panel.set_position(
            Math.round((mon.width - this._panel.width) / 2),
            mon.height - POS_Y_OFFSET
        );
        this._settings.set_int('panel-x', -1);
        this._settings.set_int('panel-y', -1);
    }

    _buildIndicator() {
        this._indicator = new PanelMenu.Button(0.0, 'EVE Keyboard', false);

        const icon = new St.Label({ text: '⌨', style_class: 'vkbd-panel-icon' });
        this._indicator.add_child(icon);

        this._indicator.connect('button-press-event', () => {
            if (this._panel) this._panel.visible = !this._panel.visible;
        });

        Main.panel.addToStatusArea('eve-keyboard', this._indicator);
    }
}
