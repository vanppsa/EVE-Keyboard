# Guia de Engenharia — EVE Keyboard

Este documento é o manual definitivo sobre o funcionamento interno da extensão. Ele cobre desde a injeção de eventos até a inteligência de UI.

---

## 🛠️ Subsistemas Técnicos

### 1. Injeção de Input (Virtual Device)
A extensão atua como um driver de hardware virtual.
- **`Clutter.VirtualInputDevice`**: Criado a partir do *Seat* padrão do backend. Ele injeta `keyval` diretamente no fluxo de eventos do GNOME Shell.
- **Fluxo de Evento**: Cada clique em uma tecla gera um `notify_keyval` com estado `PRESSED` seguido imediatamente por `RELEASED`.
- **Monotonic Time**: Usamos `GLib.get_monotonic_time()` para garantir que os eventos tenham timestamps precisos, evitando que o sistema os ignore como ruído.

### 2. Sistema de Auto-Repeat
Implementado manualmente via timers do GLib para simular o comportamento de um teclado físico.
- **Delay (400ms)**: Ao segurar uma tecla, aguardamos este tempo antes de iniciar a repetição.
- **Intervalo (80ms)**: Velocidade da repetição contínua.
- **Segurança**: O `_repeatId` garante que, se você soltar a tecla ou mover o mouse para fora dela, a repetição pare instantaneamente, evitando teclas presas.

### 3. Modificadores e "Sticky Keys"
Gerencia o estado de Shift, Caps Lock, Ctrl e Alt.
- **Sticky Behavior**: Se `sticky-modifiers` estiver ativo, o Shift/Ctrl/Alt solta automaticamente após a próxima tecla comum ser pressionada.
- **Lógica de Símbolos**: O sistema verifica o estado do Shift para decidir se envia o caractere base (`k`) ou o símbolo secundário (`s`) definido no layout.

### 4. Inteligência de Layout (Auto-Detection)
O método `_resolveLayout` tenta ser inteligente:
1. Verifica se o usuário forçou um layout nas configurações.
2. Se estiver em `auto`, ele lê o GSettings do sistema (`org.gnome.desktop.input-sources`).
3. Se encontrar `br` na lista de idiomas do usuário, ele ativa o ABNT2 automaticamente.

### 5. Auto-Show (Focus Tracker)
Utiliza o `Main.inputMethod` para monitorar o foco global.
- Quando `has-focus` muda para verdadeiro (ex: clicou em um terminal ou navegador), a extensão verifica se a opção de mostrar automaticamente está ligada e exibe o painel.

---

## 📐 Interface e Renderização

### Gerenciamento de Camadas (Chrome)
O teclado é adicionado via `Main.layoutManager.addTopChrome`.
- **Por que TopChrome?** Isso garante que o teclado fique acima de todas as janelas (incluindo janelas em tela cheia), mas permite que menus de sistema fiquem sobre ele se necessário.
- **Escalabilidade**: O método `set_scale` do Clutter é usado para o redimensionamento, o que é computacionalmente mais leve do que alterar o tamanho de cada botão individualmente.

### Posicionamento Persistente
- As coordenadas `X` e `Y` são salvas no GSettings toda vez que o arrasto termina.
- **Multi-monitor**: O teclado utiliza o `monitor-index` para saber em qual tela deve aparecer. Se as coordenadas salvas estiverem fora da tela (ex: você desconectou um monitor), ele reseta para o centro da tela primária.

---

## 🧪 Notas para Desenvolvedores

### Adicionando Inteligência às Teclas
As teclas possuem propriedades especiais no objeto `LAYOUTS`:
- `w`: Multiplicador de largura (ex: `1.5` para Tab).
- `sp`: Identificador especial (ex: `shift`, `caps`) para disparar lógica de estado.
- `dd`: Marca a tecla como *Dead Key* (necessária para acentos).
- `s`: Símbolo de Shift (caractere enviado quando Shift está ativo).

### Debugando Estados de Input
Para ver exatamente o que a extensão está injetando:
```bash
libinput debug-events
```
(Isso mostrará os eventos de teclado vindo do dispositivo virtual criado pela extensão).

---
*Este documento deve ser atualizado sempre que uma nova lógica central for implementada.*
