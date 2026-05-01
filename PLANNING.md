# EVE Keyboard — Estado do Projeto

## Fase Atual: CONCLUÍDA até Fase 4 (aguardando teste real)

O projeto está completo em código. Todas as 4 fases foram implementadas.
**Falta fazer logout/login para testar a extensão no GNOME Shell.**

---

## Fases Concluídas

### Fase 1 — Correções Críticas ✅
- API do backend: `Clutter.get_default_backend()` → `Meta.get_backend()`
- Caps Lock: removido duplo toggle (agora é modifier interno apenas)
- Indicator: `St.Button` em `_rightBox` → `PanelMenu.Button` + `addToStatusArea()`
- Posição: hard-coded 670px → `this._panel.width` dinâmico
- Space: label vazio → "Espaço"
- Bug fix: `kv + 1` no release → `kv` correto

### Fase 2 — Layout e Input ✅
- Layout ABNT2 BR com detecção automática via `org.gnome.desktop.input-sources`
- Botão US/BR no header para trocar layout manualmente
- Dead keys: composição de acentos (ã, á, â, ä)
- Auto-repeat: 400ms delay, 80ms intervalo
- Classe CSS `.vkbd-dead` (roxo) para tecla morta ativa

### Fase 3 — Preferências e GSettings ✅
- `schemas/org.gnome.shell.extensions.eve-keyboard.gschema.xml` (8 chaves)
- `prefs.js` com GTK4/libadwaita (ComboRow + SwitchRow)
- Multi-monitor: escolha do monitor via GSettings
- Posição salva: persiste x/y ao arrastar e restaura no login
- Acessibilidade: classe `vkbd-accessible` nas teclas

### Fase 4 — Auto-show e Settings em tempo real ✅
- Auto-show: teclado aparece ao focar campo de texto via `Main.inputMethod`
- Settings watch: mudanças em tempo real (tema, layout, monitor)
- Sticky configurável: on/off via preferências

---

## Após logout/login — Testar

1. `gnome-extensions enable eve-keyboard@local`
2. Verificar se o ícone ⌨ aparece no painel
3. Testar: mostrar/esconder, arrastar, teclas normais, modificadores
4. Testar: trocar layout US/BR, dead keys (no layout BR: ~ + a = ã)
5. Testar: auto-repeat (segurar uma tecla)
6. Testar: preferências (`gnome-extensions prefs eve-keyboard@local`)
7. Debug: `journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve`

---

## Problemas Conhecidos (para investigar após teste)

- `Main.inputMethod` pode não estar disponível em todos os contextos
- `Main.layoutManager.removeChrome()` — verificar se a API correta no GNOME 50 é `_removeChrome` ou `removeChrome`
- Dead keys cobrem apenas til, agudo, circunflexo, trema (falta cedilha direto, crase)
- Não sincroniza modifier state com teclado físico

---

## Arquivos

```
~/.local/share/gnome-shell/extensions/eve-keyboard@local/
├── metadata.json
├── extension.js
├── prefs.js
├── stylesheet.css
└── schemas/
    ├── org.gnome.shell.extensions.eve-keyboard.gschema.xml
    └── gschemas.compiled

~/Documentos/PROJETOS/EVE Keyboard/
├── PLANNING.md (este arquivo)
├── README.md
├── extension.js
├── prefs.js
├── metadata.json
├── stylesheet.css
└── schemas/
```

---

## Roadmap Futuro

- Mais layouts (AZERTY, DVORAK)
- Sincronização de modifiers com teclado físico
- i18n (gettext)
- Mais dead keys (crase `, cedilha Ç direto)
- Auto-hide quando nenhum campo de texto está focado
- Drag-resize por touch/pinch
