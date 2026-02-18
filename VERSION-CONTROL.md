# 🔄 Version Control Guide for VIBE-CHAT

## Git Setup

### Initial Setup

```bash
# Initialize Git repository (if not already done)
git init

# Add remote repository
git remote add origin <your-repo-url>

# Create initial commit
git add .
git commit -m "Initial commit: Docker & Kubernetes setup"
git push -u origin main
```

## 📁 What to Commit

### ✅ Always Commit:

- Source code (`VIBE-CHAT-CLIENT/src`, `VIBE-CHAT-SERVER`)
- Configuration files:
  - `package.json`, `package-lock.json`
  - `docker-compose.yml`, `docker-compose.prod.yml`
  - All Kubernetes manifests (`k8s/`)
  - `Dockerfile` (both client & server)
  - `.dockerignore` files
- Documentation:
  - `README.md`, `README-DOCKER.md`
  - Helper scripts (`.ps1` files)
- `.env.example` (template without real secrets)
- `.gitignore`

### ❌ Never Commit:

- `node_modules/` (too large, regenerated from package.json)
- `.env` (contains real secrets!)
- Build outputs (`dist/`, `build/`)
- Log files (`*.log`)
- Database data (`mongo-init/`, persistent volumes)
- IDE-specific files (`.vscode/`, `.idea/`)
- Docker volumes data

## 🔐 Managing Secrets

### Current Setup:

```
✅ .env.example      ← Commit (template only)
❌ .env              ← NEVER commit (real secrets)
```

### Best Practices:

#### 1. **Local Development**

```bash
# Copy example and fill in real values
cp .env.example .env

# Edit .env with your actual secrets
# Git will ignore this file
```

#### 2. **Team Collaboration**

- Share `.env.example` with dummy values
- Team members create their own `.env` from the template
- Document all required variables in `.env.example`

#### 3. **Production Secrets**

**For Docker:**

```bash
# Use environment-specific files
.env.production
.env.staging

# Or use Docker secrets
docker secret create jwt_secret <secret-file>
```

**For Kubernetes:**

```bash
# Create secrets from command line (not committed)
kubectl create secret generic vibe-chat-secrets \
  --from-literal=jwt-secret='your-real-secret' \
  --from-literal=jwt-refresh-secret='your-real-refresh-secret'

# Or use sealed-secrets / external secret managers
# - HashiCorp Vault
# - AWS Secrets Manager
# - Azure Key Vault
```

## 🏷️ Docker Image Versioning

### Tagging Strategy:

```bash
# Build with version tags
docker build -t vibe-chat-server:v1.0.0 ./VIBE-CHAT-SERVER
docker build -t vibe-chat-server:latest ./VIBE-CHAT-SERVER

# Use semantic versioning
# v1.0.0 - Major.Minor.Patch
# - Major: Breaking changes
# - Minor: New features (backward compatible)
# - Patch: Bug fixes
```

### Update Kubernetes deployments:

```yaml
# k8s/server-deployment.yaml
spec:
  containers:
  - name: server
    image: vibe-chat-server:v1.0.0  # Specific version
    # or
    image: your-registry/vibe-chat-server:v1.0.0  # From registry
```

### Container Registry Workflow:

```bash
# Tag for registry
docker tag vibe-chat-server:v1.0.0 ghcr.io/username/vibe-chat-server:v1.0.0

# Push to registry
docker push ghcr.io/username/vibe-chat-server:v1.0.0

# Update k8s to pull from registry
# k8s/server-deployment.yaml
image: ghcr.io/username/vibe-chat-server:v1.0.0
imagePullPolicy: Always  # For production
```

## 📋 Git Workflow

### Feature Branch Strategy:

```bash
# Create feature branch
git checkout -b feature/chat-realtime

# Make changes, commit often
git add .
git commit -m "feat: Add real-time chat with Socket.io"

# Push to remote
git push origin feature/chat-realtime

# Create Pull Request, merge to main
```

### Commit Message Convention:

```bash
# Format: <type>(<scope>): <subject>

git commit -m "feat(auth): Add JWT refresh token"
git commit -m "fix(server): Fix MongoDB connection timeout"
git commit -m "docs(k8s): Update deployment instructions"
git commit -m "chore(docker): Optimize build cache layers"

# Types:
# feat:     New feature
# fix:      Bug fix
# docs:     Documentation
# style:    Formatting (no code change)
# refactor: Code restructuring
# test:     Adding tests
# chore:    Maintenance
```

## 🚀 Deployment Workflow

### Development → Production:

```bash
# 1. Develop locally with Docker
docker-compose up

# 2. Commit changes
git add .
git commit -m "feat: Add user profile page"
git push origin feature/user-profile

# 3. Build versioned images
docker build -t vibe-chat-server:v1.1.0 ./VIBE-CHAT-SERVER
docker build -t vibe-chat-client:v1.1.0 ./VIBE-CHAT-CLIENT

# 4. Tag for release
git tag v1.1.0
git push origin v1.1.0

# 5. Deploy to Kubernetes
kubectl set image deployment/vibe-chat-server \
  server=vibe-chat-server:v1.1.0

# Or update k8s manifests and apply
kubectl apply -f k8s/
```

## 🔍 Checking What's Tracked

```bash
# See what will be committed
git status

# See what's ignored
git status --ignored

# Check if sensitive files are tracked
git ls-files | grep -E '\.env$|secret|password'

# If you accidentally committed secrets:
git rm --cached .env
git commit -m "chore: Remove .env from tracking"
```

## 📦 .gitignore Verification

Your `.gitignore` is set up to exclude:

- `node_modules/` - Dependencies
- `.env*` except `.env.example` - Secrets
- `dist/`, `build/` - Build outputs
- `*.log` - Log files
- `mongo-init/` - Database data
- IDE folders - `.vscode/`, `.idea/`

## 🛡️ Security Checklist

Before pushing to remote:

- [ ] `.env` is in `.gitignore`
- [ ] No hardcoded passwords in code
- [ ] `.env.example` has dummy values only
- [ ] Kubernetes secrets use `kubectl create secret`, not YAML files
- [ ] Database passwords are randomized
- [ ] JWT secrets are strong and unique

## 📖 Advanced: GitOps with ArgoCD/Flux

For production Kubernetes:

```yaml
# Use ArgoCD to sync Git → Kubernetes
# Your k8s/ directory becomes source of truth
# Changes to k8s/*.yaml auto-deploy to cluster

# Separate repos:
├── vibe-chat-app/          (application code)
└── vibe-chat-k8s/          (k8s manifests only)
```

## 🔄 Quick Reference

```bash
# Daily workflow
git pull origin main
# make changes
git add .
git commit -m "type: description"
git push origin <branch>

# Version a release
git tag v1.2.0
git push origin v1.2.0

# Emergency: Remove committed secret
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

Your repository is now properly configured for version control! 🎉
