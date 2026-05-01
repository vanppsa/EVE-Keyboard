## EVE Keyboard — GNOME Shell Extension

Teclado virtual otimizado para **GNOME 50 / Wayland** (Fedora 44+).

Roda *dentro* do compositor como extensão:
- Fica naturalmente acima de todas as janelas.
- Injeta teclas via `Clutter.VirtualInputDevice`, garantindo compatibilidade total com Wayland.
- Draggável pelo header com posição salva entre sessões.
- **Redimensionamento dinâmico**: arraste o botão de redimensionamento para ajustar a escala livremente (0.5x a 2.0x).
- **Tema claro/escuro**: interface polida que segue o estilo do sistema.
- **Layouts**: QWERTY US e ABNT2 BR com detecção automática.
- **Suporte a 'ç'**: suporte completo ao caractere 'ç' e 'Ç' no layout brasileiro.
- **Dead keys**: composição de acentos (ã, á, â, ä, etc.).
- **Auto-repeat**: repetição inteligente de teclas ao segurar.
- **Auto-show**: aparece automaticamente ao focar campos de texto (configurável).
- **Multi-monitor**: suporte para múltiplos monitores com posicionamento inteligente.
- **Preferências**: interface moderna via GTK4/Libadwaita.

---

## Requisitos

- GNOME Shell 50.x ou superior.
- Sessão Wayland.

---

## Estrutura de Pastas

```
eve-keyboard@local/
├── metadata.json
├── extension.js
├── prefs.js
├── stylesheet.css
└── schemas/
    └── org.gnome.shell.extensions.eve-keyboard.gschema.xml
```

---

## Instalação

Copie a pasta para o diretório de extensões do usuário:

```bash
mkdir -p ~/.local/share/gnome-shell/extensions/eve-keyboard@local
cp -r . ~/.local/share/gnome-shell/extensions/eve-keyboard@local/
```

Compile os schemas (necessário para as configurações funcionarem):

```bash
glib-compile-schemas ~/.local/share/gnome-shell/extensions/eve-keyboard@local/schemas/
```

**Ative a extensão:**

```bash
gnome-extensions enable eve-keyboard@local
```

*Nota: No Wayland, pode ser necessário reiniciar a sessão (logout/login).*

---

## Uso

- **Mostrar/Esconder**: clique no ícone **⌨** no painel superior.
- **Arrastar**: segure o ícone de arrastar no header para mover o teclado.
- **Redimensionar**: segure e arraste o botão de redimensionamento (ícone de seta) para ajustar o tamanho.
- **Tema**: alterne entre claro e escuro diretamente no header.
- **Layout**: alterne entre US e BR rapidamente.
- **Modificadores Sticky**: Shift, Ctrl e Alt permanecem ativos para a próxima tecla.
- **Dead Keys**: use acentos normalmente (ex: `~` + `a` = `ã`).

### Preferências

Acesse via botão direito no ícone do painel ou pelo comando:

```bash
gnome-extensions prefs eve-keyboard@local
```

---

## Desenvolvimento e Debug

Para testar sem sair da sessão atual (Nested Shell):

```bash
dbus-run-session -- gnome-shell --nested &
```

Visualizar logs em tempo real:

```bash
journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve
```

---

## Configurações (GSettings)

| Chave | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `theme` | string | `'dark'` | `'dark'` ou `'light'` |
| `panel-scale` | double | `1.0` | Escala do teclado (0.5 a 2.0) |
| `layout` | string | `'auto'` | `'auto'`, `'us'` ou `'br'` |
| `auto-show` | bool | `true` | Mostrar ao focar campo de texto |
| `sticky-modifiers` | bool | `true` | Modificadores soltam após 1 tecla |
| `panel-x` | int | `-1` | Posição X salva |
| `panel-y` | int | `-1` | Posição Y salva |

---

## Roadmap

- Suporte a mais layouts (AZERTY, Dvorak).
- Gestos para esconder o teclado.
- Personalização avançada de cores.
- Suporte a emojis.
