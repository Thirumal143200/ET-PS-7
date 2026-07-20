import subprocess
import sys
import os

def run_step(command, cwd=None, name="Step"):
    print(f"\n==========================================")
    print(f"RUNNING VALIDATION: {name}")
    print(f"Command: {command}")
    print(f"==========================================")
    res = subprocess.run(command, shell=True, cwd=cwd)
    if res.returncode != 0:
        print(f"\nFAILED on step: {name}")
        sys.exit(1)
    print(f"PASSED SUCCESSFULLY: {name}\n")

def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    backend_dir = os.path.join(root, "backend")
    frontend_dir = os.path.join(root, "frontend")

    # 1. Backend Pytest
    run_step("..\\.venv\\Scripts\\python -m pytest tests", cwd=backend_dir, name="Backend Pytest Suite")

    # 2. Backend Code Format Check
    run_step("..\\.venv\\Scripts\\python -m black --check app tests", cwd=backend_dir, name="Black Code Formatting Check")
    run_step("..\\.venv\\Scripts\\python -m isort --check-only app tests", cwd=backend_dir, name="isort Import Sorting Check")

    # 3. Frontend Production Build & TypeScript Check
    run_step("npm run build", cwd=frontend_dir, name="Frontend TypeScript & Vite Production Build")

    print("\nALL QUALITY GATE VALIDATIONS PASSED CLEANLY! PROJECT IS FULLY GREEN.\n")

if __name__ == "__main__":
    main()
