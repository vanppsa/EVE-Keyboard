# EVE Keyboard — Teclado Virtual para GNOME Shell

O **EVE Keyboard** é uma extensão de teclado virtual de alto desempenho para o GNOME Shell (versão 47/50+), projetada especificamente para o **Fedora 44** e sessões **Wayland**.

Diferente de teclados baseados em janelas comuns, o EVE Keyboard roda diretamente dentro do compositor (GNOME Shell), garantindo que ele sempre apareça sobre qualquer janela, tela de bloqueio ou menu do sistema, utilizando a API Clutter para injeção de input de baixo nível.

---

## ✨ Destaques

- 🚀 **Otimizado para Wayland**: Injeção de teclas via `VirtualInputDevice`.
- 📐 **Redimensionamento Livre**: Arraste o canto do teclado para ajustar a escala (0.5x a 2.0x).
- 🖱️ **Posicionamento Persistente**: Arraste e posicione onde quiser; o teclado lembra o local na próxima sessão.
- 🎨 **Interface Moderna**: Segue o design do GNOME com temas claro e escuro automáticos.
- ⌨️ **Layouts Híbridos**: Suporte completo para **US (QWERTY)** e **BR (ABNT2)** com dead keys (acentuação).
- ⚡ **Auto-Show**: O teclado aparece automaticamente ao focar em campos de texto (opcional).

---

## 🛠️ Instalação no Fedora 44

### 1. Dependências do Sistema
Certifique-se de ter as ferramentas necessárias para compilar os schemas de configuração:

```bash
sudo dnf install glib2-devel gnome-extensions-app
```

### 2. Instalação Rápida (Script)
Execute o bloco abaixo no seu terminal para baixar, instalar e configurar a extensão automaticamente:

```bash
# Definir o ID da extensão
UUID="eve-keyboard@local"
DEST="$HOME/.local/share/gnome-shell/extensions/$UUID"

# Criar diretórios e copiar arquivos
mkdir -p "$DEST"
cp -r . "$DEST/"

# Compilar os schemas de configuração
glib-compile-schemas "$DEST/schemas/"

# Ativar a extensão
gnome-extensions enable "$UUID"
```

### 3. Reinicie o GNOME Shell
Como o EVE Keyboard é uma extensão do sistema, é necessário reiniciar a sessão para que o Shell carregue o novo código:
- Salve seu trabalho e faça **Logout** e **Login** novamente.

---

## 🚀 Como Usar

1. **Ativação**: Um ícone de teclado (**⌨**) aparecerá no painel superior (systray).
2. **Mover**: Clique e segure no ícone de "setas" no cabeçalho do teclado para arrastá-lo.
3. **Escalar**: Use o botão de redimensionamento no canto inferior direito para ajustar o tamanho.
4. **Troca de Layout**: Clique no indicador de idioma (`US` / `BR`) para alternar instantaneamente.
5. **Acentuação**: Funciona como um teclado físico (ex: pressione `~` e depois `A` para obter `ã`).

### Preferências
Você pode ajustar o comportamento do **Auto-Show**, escala padrão e comportamentos de teclas abrindo as configurações:
```bash
gnome-extensions prefs eve-keyboard@local
```

---

## 👨‍💻 Desenvolvimento e Contribuição

Se você deseja modificar o teclado ou adicionar novos layouts:

**Logs de Erro:**
```bash
journalctl -f -o cat /usr/bin/gnome-shell | grep -i eve
```

**Testar em Sessão Aninhada (sem deslogar):**
```bash
dbus-run-session -- gnome-shell --nested &
```

---

## 📄 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir.

---
*Desenvolvido para a comunidade GNOME.*
