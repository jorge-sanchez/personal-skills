---
name: developer-flow
description: Standard development workflow - pull latest, create branch, implement ticket, create PR.
---

# Developer Flow

This skill defines the standard development workflow. Use this when you need to implement a new feature, fix a bug, or make any code change.

## When to Use This Skill

Use this workflow whenever you start working on a new task:
- Implementing a new feature
- Fixing a bug
- Refactoring code
- Updating documentation
- Any other development task

## Standard Workflow

Follow these steps every time you start implementing work:

### Step 1: Pull Latest Code
Always start with the latest main branch code:
```bash
git checkout main
git pull origin main
```

### Step 2: Create New Branch
Create a descriptive branch for the work:
```bash
git checkout -b feature/<description>-<issue-number>
# or
git checkout -b fix/<description>-<issue-number>
```

### Step 3: Implement the Ticket
- Review the GitHub issue for requirements
- Understand the acceptance criteria
- Make targeted changes following existing patterns in the codebase
- Run tests to verify changes
- Run linting to ensure code quality

### Step 4: Create Pull Request
When the work is complete, create a PR:
```bash
gh pr create \
  --title "<title> (fixes #<issue-number>)" \
  --body "Addresses GitHub issue #<issue-number>..."
```

## Key Principles

1. **Always pull from main first** - ensures you're working with the latest code
2. **Use descriptive branch names** - include the issue number for traceability
3. **Test your changes** - run `go test` for Go code
4. **Lint before committing** - run `make lint` or equivalent
5. **Reference the issue** - use `#fixes <issue>` or `#closes <issue>` in PR description
6. **Keep PRs focused** - one issue per PR, avoid combining multiple unrelated changes

## Quick Reference

| Task | Command |
|------|---------|
| Pull latest main | `git checkout main && git pull origin main` |
| Create branch | `git checkout -b feature/<name>-<issue>` |
| Run tests | `go test ./...` |
| Run lint | `make lint` |
| Create PR | `gh pr create --title "..." --body "..."` |
