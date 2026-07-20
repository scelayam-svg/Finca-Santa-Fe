# Claude Skills — Finca Santa Fe

Esta carpeta contiene *skills* para [Claude Code](https://docs.claude.com/claude-code)
vendorizadas (copiadas) dentro del repo. Claude Code las detecta automáticamente al
abrir este proyecto — no requieren instalación adicional.

## Skills incluidas

### 🦸 Superpowers — metodología de desarrollo
Fuente: https://github.com/obra/superpowers (MIT)

| Skill | Para qué sirve |
|---|---|
| `using-superpowers` | Meta-skill que le indica a Claude cuándo usar las demás |
| `brainstorming` | Refinar una idea/feature antes de implementarla |
| `writing-plans` / `executing-plans` | Planificar cambios grandes y ejecutarlos por etapas |
| `systematic-debugging` | Proceso estructurado para encontrar la causa raíz de un bug |
| `test-driven-development` | Flujo TDD (test → implementación → refactor) |
| `requesting-code-review` / `receiving-code-review` | Revisión de código disciplinada |
| `verification-before-completion` | Checklist antes de dar una tarea por terminada |
| `using-git-worktrees` / `finishing-a-development-branch` | Manejo de ramas de Git |
| `dispatching-parallel-agents` / `subagent-driven-development` | Delegar tareas en paralelo |
| `writing-skills` | Cómo crear nuevas skills |

### 🎨 UI/UX Pro Max — inteligencia de diseño
Fuente: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (MIT)

Base de datos local (CSV) consultable por script (`scripts/search.py`, Python 3 puro,
sin dependencias ni red) con estilos de UI, paletas de color, tipografías, guías de UX
y patrones por stack. Adaptada en su `SKILL.md` a este proyecto (HTML/CSS/JS vanilla).

## Notas

- Todo el código es de solo lectura/consulta — ningún script modifica archivos del
  proyecto ni se ejecuta automáticamente; Claude Code las invoca cuando el contexto
  de la conversación lo amerita.
- Son copias vendorizadas, no un submódulo ni una dependencia de npm — para
  actualizarlas hay que volver a copiar desde los repos originales.
- Licencias originales: `skills/LICENSE-superpowers.txt` y `skills/ui-ux-pro-max/LICENSE.txt`.
