# Personal Skills

A collection of AI agent skills for Claude Code, organized by category.

## Repository Structure

```
personal-skills/
├── README.md              # This file
├── development/           # Development workflow skills
│   └── SKILL.md           # Developer flow (git workflow)
└── [future categories]/
    └── SKILL.md           # Skills in that category
```

## Categories

| Category | Description | Skills |
|----------|-------------|--------|
| `development/` | General development workflows | `developer-flow` |

## Adding New Skills

When adding a new skill:

1. Choose the appropriate category directory, or create a new one
2. Create a `SKILL.md` file with YAML frontmatter:

```yaml
---
name: skill-name
description: Brief description of what this skill does
---
```

3. Follow the same format as existing skills for consistency

## Usage

To use these skills in Claude Code:

1. Clone this repository: `git clone https://github.com/jorge-sanchez/personal-skills.git`
2. Copy the desired skill's `SKILL.md` to your project's `skills/` directory
3. Or reference this repo as a submodule if Claude Code supports it

## License

Private - for personal use.
