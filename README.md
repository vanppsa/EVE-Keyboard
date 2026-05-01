## EVE Keyboard — GNOME Shell Extension

Teclado virtual para **GNOME 50 / Wayland** (Fedora 44+).

Roda *dentro* do compositor como extensão:
- Fica naturalmente acima de todas as janelas
- Injeta teclas via `Clutter.VirtualInputDevice`, sem problema de foco
- Draggável pelo header com posição salva entre sessões
- 3 tamanhos (S/M/L)
- Tema claro/escuro (persistido)
- Ícone no painel para mostrar/esconder
- Modificadores sticky (configurável)
- **Layouts**: QWERTY US e ABNT2 BR com detecção automática do sistema
- **Dead keys**: composição de acentos (ã, á, â, ä)
- **Auto-repeat**: segurar tecla repete o caractere
- **Auto-show**: aparece automaticamente ao focar campo de texto (configurável)
- **Multi-monitor**: escolha em qual monitor o teclado aparece
- **Preferências**: janela GTK4/libadwaita com todas as configurações
- **GSettings**: preferências persistidas entre sessões

---

## Requisitos

- GNOME Shell 50.x
- Wayland
- Fedora 44 Workstation (ou qualquer distro com GNOME 50)

---

## Estrutura de pastas

```
eve-keyboard@local/
├── metadata.json
├── extension.js
├── prefs.js
├── stylesheet.css
└── schemas/
    ├── org.gnome.shell.extensions.eve-keyboard.gschema.xml
    └── gschemas.compiled
```

---

## Instalação

Copie a pasta completa para `~/.local/share/gnome-shell/extensions/`:

```bash
cp -r eve-keyboard@local ~/.local/share/gnome-shell/extensions/
```

Compile o schema (se não estiver compilado):

```bash
glib-compile-schemas ~/.local/share/gnome-shell/extensions/eve-keyboard@local/schemas/
```

**Ative a extensão:**

```bash
gnome-extensions enable eve-keyboard@local
```

No Wayland, faça logout e login. O ícone **⌨** aparece no painel.

---

## Uso

Após o login, o ícone **⌨** aparece no canto superior direito. Clique para mostrar/esconder.

- **Arrastar**: segurar e arrastar pelo header (posição é salva automaticamente)
- **Tamanho**: botões S / M / L no header
- **Tema**: botão ☀/🌙
- **Layout**: botão US/BR no header para trocar de layout
- **Shift/Ctrl/Alt**: sticky — clica uma vez para ativar, envia a próxima tecla e auto-solta
- **Caps Lock**: toggle interno (não envia keyval pro sistema)
- **Dead keys**: clique no acento (ex: ~) e depois na letra para compor (ã, á, etc.)
- **Auto-repeat**: segurar qualquer tecla repete após 400ms

### Preferências

Clique com botão direito no ícone ⌨ → **Configurações**, ou:

```bash
gnome-extensions prefs eve-keyboard@local
```

Opções disponíveis:
- Tema (escuro/claro)
- Tamanho das teclas (S/M/L)
- Layout (automático/US/BR)
- Mostrar automaticamente ao focar campo de texto
- Modificadores sticky (on/off)
- Monitor padrão

---

## Testando sem logout

Sessão GNOME aninhada:

```bash
dbus-run-session -- gnome-shell --nested &
gnome-extensions enable eve-keyboard@local
```

---

## Debug

```bash
journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve
```

---

## Configurações (GSettings)

| Chave | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `theme` | string | `'dark'` | `'dark'` ou `'light'` |
| `key-size` | string | `'M'` | `'S'`, `'M'` ou `'L'` |
| `layout` | string | `'auto'` | `'auto'`, `'us'` ou `'br'` |
| `auto-show` | bool | `true` | Mostrar ao focar campo de texto |
| `sticky-modifiers` | bool | `true` | Modificadores soltam após 1 tecla |
| `panel-x` | int | `-1` | Posição X salva (-1 = centralizado) |
| `panel-y` | int | `-1` | Posição Y salva (-1 = bottom) |
| `monitor-index` | int | `0` | Índice do monitor |

---

## Limitações

- Dead keys cobrem apenas ã/õ, á/é/í/ó/ú, â/ê/î/ô/û, ä/ë/ï/ö/ü
- Não sincroniza modifier state com teclado físico
- Layouts além de US/BR precisam ser adicionados manualmente

---

## Roadmap

- Mais layouts (AZERTY, DVORAK)
- Sincronização com teclado físico
- i18n (gettext)
- Mais dead keys
