# Engineering Guide — EVE Keyboard

This document is the definitive manual on the extension's inner workings, covering everything from event injection to UI intelligence.

---

## 🛠️ Technical Subsystems

### 1. Input Injection (Virtual Device)
The extension acts as a virtual hardware driver.
- **`Clutter.VirtualInputDevice`**: Created from the backend's default *Seat*. It injects `keyval` directly into the GNOME Shell event stream.
- **Event Flow**: Each key press generates a `notify_keyval` with `PRESSED` state, immediately followed by `RELEASED`.
- **Monotonic Time**: We use `GLib.get_monotonic_time()` to ensure events have precise timestamps, preventing the system from ignoring them as noise.

### 2. Auto-Repeat System
Manually implemented via GLib timers to simulate physical keyboard behavior.
- **Delay (400ms)**: When holding a key, we wait this duration before initiating repetition.
- **Interval (80ms)**: Speed of continuous repetition.
- **Safety**: The `_repeatId` ensures that if you release the key or move the mouse out of its area, repetition stops instantly, preventing stuck keys.

### 3. Modifiers and "Sticky Keys"
Manages the state of Shift, Caps Lock, Ctrl, and Alt.
- **Sticky Behavior**: If `sticky-modifiers` is active, Shift/Ctrl/Alt releases automatically after the next common key is pressed.
- **Symbol Logic**: The system checks the Shift state to decide whether to send the base character (`k`) or the secondary symbol (`s`) defined in the layout.

### 4. Layout Intelligence (Auto-Detection)
The `_resolveLayout` method aims for intelligence:
1. Checks if the user has forced a layout in settings.
2. If set to `auto`, it reads the system's GSettings (`org.gnome.desktop.input-sources`).
3. If it finds `br` in the user's language list, it automatically activates the ABNT2 layout.

### 5. Auto-Show (Focus Tracker)
Utilizes `Main.inputMethod` to monitor global focus.
- When `has-focus` changes to true (e.g., clicking on a terminal or browser), the extension checks if the auto-show option is enabled and displays the panel.

---

## 📐 Interface and Rendering

### Layer Management (Chrome)
The keyboard is added via `Main.layoutManager.addTopChrome`.
- **Why TopChrome?** This ensures the keyboard stays above all windows (including full-screen ones), but allows system menus to overlay it if necessary.
- **Scalability**: Clutter's `set_scale` method is used for resizing, which is computationally lighter than altering each button's size individually.

### Persistent Positioning
- `X` and `Y` coordinates are saved to GSettings every time dragging finishes.
- **Multi-monitor**: The keyboard uses `monitor-index` to know which screen it should appear on. If saved coordinates are off-screen (e.g., you disconnected a monitor), it resets to the center of the primary screen.

---

## 🧪 Notes for Developers

### Adding Intelligence to Keys
Keys have special properties in the `LAYOUTS` object:
- `w`: Width multiplier (e.g., `1.5` for Tab).
- `sp`: Special identifier (e.g., `shift`, `caps`) to trigger state logic.
- `dd`: Marks the key as a *Dead Key* (required for accents).
- `s`: Shift symbol (character sent when Shift is active).

### Debugging Input States
To see exactly what the extension is injecting:
```bash
libinput debug-events
```
(This will show keyboard events coming from the virtual device created by the extension).

---
*This document should be updated whenever new core logic is implemented.*
