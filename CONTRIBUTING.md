# Contributing to CNI AI Cyber Resilience System

Thank you for your interest in contributing to the **CNI AI Cyber Resilience System** for Critical National Infrastructure!

## Code Quality & PR Requirements

Before submitting a pull request, ensure your code satisfies the Quality Gate checks:

### 1. Backend Verification
```bash
cd backend
python -m pytest tests
black --check app tests
isort --check-only app tests
```

### 2. Frontend Verification
```bash
cd frontend
npm run lint
npm run typecheck
npm run build
```

## Commit Conventions

We follow Conventional Commits standard:
- `feat(scope)`: New feature
- `fix(scope)`: Bug fix
- `docs(scope)`: Documentation updates
- `ci(scope)`: CI/CD configuration
- `refactor(scope)`: Code refactoring without behavioral change
