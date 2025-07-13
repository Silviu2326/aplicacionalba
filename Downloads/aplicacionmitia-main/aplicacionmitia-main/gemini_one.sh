#!/usr/bin/env bash
# Lanza Gemini CLI con un ÚNICO prompt leído de stdin o de un fichero.
# Uso:
#   cat prompt.md | ./gemini_one.sh
#   ./gemini_one.sh prompt.md

set -euo pipefail

# ── 1 · Decide de dónde viene el texto ────────────────────────────────
if [[ $# -gt 0 ]]; then
  prompt_content="$(cat "$1")"
else
  prompt_content="$(cat -)"           # lo que llegue por stdin
fi

# ── 2 · Lanza Gemini en modo YOLO ─────────────────────────────────────
printf '%s\n' "$prompt_content" | \
  gemini -y 2>&1               | \
  tr '\r' '\n'                 | \
  awk 'prev != $0 {print; prev=$0}'