# EVE Keyboard — Instruções do Assistente

Este projeto é uma extensão do GNOME Shell (versão 50+) que implementa um teclado virtual otimizado para Wayland. Ele roda diretamente no compositor, garantindo que fique sempre acima das janelas e tenha acesso ao input de baixo nível via Clutter.

## Visão Geral do Projeto

- **Tecnologias:** JavaScript (GJS), GNOME Shell API (Clutter, St, Main), GTK4/Libadwaita (Preferências), GSettings, CSS.
- **Arquitetura:** Segue o padrão de extensões modernas do GNOME (ESM), utilizando a classe `Extension` como ponto de entrada.
- **Destaques:** Injeção de teclas via `VirtualInputDevice`, suporte a layouts US/BR (ABNT2), dead keys para acentuação, posicionamento persistente e redimensionamento dinâmico.

## Estrutura de Arquivos Chave

- `extension.js`: Lógica principal, gerenciamento de janelas, renderização do teclado e injeção de input.
- `prefs.js`: Interface de configurações utilizando GTK4 e Libadwaita.
- `stylesheet.css`: Definições visuais para os temas claro e escuro.
- `metadata.json`: Metadados da extensão (UUID, versão do shell, etc).
- `schemas/`: Contém o schema XML para o GSettings (`org.gnome.shell.extensions.eve-keyboard.gschema.xml`).

## Comandos Úteis

### Instalação e Ativação
```bash
# Copiar para a pasta de extensões do usuário
mkdir -p ~/.local/share/gnome-shell/extensions/eve-keyboard@local
cp -r . ~/.local/share/gnome-shell/extensions/eve-keyboard@local/

# Compilar schemas (obrigatório após mudanças no XML)
glib-compile-schemas ~/.local/share/gnome-shell/extensions/eve-keyboard@local/schemas/

# Ativar a extensão
gnome-extensions enable eve-keyboard@local
```

### Desenvolvimento e Debug
```bash
# Visualizar logs em tempo real
journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve

# Abrir janela de preferências
gnome-extensions prefs eve-keyboard@local

# Testar em sessão aninhada (sem precisar fazer logout)
dbus-run-session -- gnome-shell --nested &
```

## Convenções de Desenvolvimento

- **JS Moderno:** Utilize imports ESM e a estrutura de classe `Extension`.
- **Estilização:** Todas as classes CSS devem começar com o prefixo `vkbd-` para evitar conflitos com o shell.
- **GSettings:** Sempre adicione novas chaves no arquivo `.gschema.xml` antes de usá-las no código e lembre-se de recompilar o schema.
- **Layouts:** Os layouts são definidos no objeto `LAYOUTS` dentro de `extension.js`. Cada tecla possui um `label` (l), `keyval` (k) e opcionalmente um símbolo de shift (s) ou largura (w).
- **Dead Keys:** A composição de acentos é gerenciada pelo `DEAD_KEY_MAP`. Se adicionar novos acentos, certifique-se de mapear as combinações de letras.

## Checklist de Alterações

1. Se alterar o CSS, verifique tanto o tema `.vkbd-dk` (dark) quanto `.vkbd-lt` (light).
2. Se adicionar uma nova configuração, atualize o `gschema.xml`, o `prefs.js` e a lógica de leitura em `extension.js`.
3. Ao adicionar layouts, verifique se os keyvals do Clutter estão corretos.
4. Sempre teste o redimensionamento e o posicionamento após mudanças na estrutura do `St.BoxLayout`.
