#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Rupple27 CRM — one-shot GitHub repo creator + pusher
# Usage: bash setup.sh
# ─────────────────────────────────────────────────────────────────────────────
set -e

REPO_NAME="rupple27-crm"
COMMIT_MSG="feat: added Rupple27 CRM NLP MVP prototype"
BRANCH="main"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}[rupple27]${NC} $1"; }
warn()  { echo -e "${YELLOW}[rupple27]${NC} $1"; }
error() { echo -e "${RED}[rupple27]${NC} $1"; exit 1; }

# ── Step 1: git init & commit ─────────────────────────────────────────────────
info "Initialising git repository..."
cd "$(dirname "$0")"

# Remove any previous broken .git
rm -rf .git

git init -b "$BRANCH" 2>/dev/null || { git init && git checkout -b "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH"; }
git config user.email "ashrockstar022@gmail.com"
git config user.name  "Aneesh Kumar"

git add .
git commit -m "$COMMIT_MSG"
info "Commit created."

# ── Step 2: create GitHub repo ────────────────────────────────────────────────
if command -v gh &>/dev/null; then
  info "gh CLI found. Checking auth..."
  if gh auth status &>/dev/null; then
    info "gh is authenticated. Creating repo '$REPO_NAME'..."
    gh repo create "$REPO_NAME" \
      --public \
      --description "NLP-powered CRM prototype for Indian SMBs — query in English, Hindi, or Telugu" \
      --source=. \
      --remote=origin \
      --push
    info "Done. Repo is live at: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
    exit 0
  else
    warn "gh is installed but not logged in. Run 'gh auth login' first, then re-run this script."
    exit 1
  fi
fi

# ── Step 3: fallback — GitHub API via curl + PAT ──────────────────────────────
warn "gh CLI not found. Falling back to Personal Access Token method."
echo ""
echo "  Generate a token at: https://github.com/settings/tokens/new"
echo "  Scopes needed: repo (full control of private repositories)"
echo ""
read -rp "  Paste your GitHub PAT here: " GH_TOKEN

if [ -z "$GH_TOKEN" ]; then
  error "No token provided. Aborting."
fi

# Get GitHub username from the token
GH_USER=$(curl -s -H "Authorization: token $GH_TOKEN" https://api.github.com/user | grep '"login"' | head -1 | sed 's/.*"login": "\(.*\)".*/\1/')

if [ -z "$GH_USER" ]; then
  error "Could not resolve GitHub username. Check your token and try again."
fi

info "Authenticated as: $GH_USER"

# Create the repository
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token $GH_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"NLP-powered CRM prototype for Indian SMBs — query in English, Hindi, or Telugu\",
    \"private\": false,
    \"auto_init\": false
  }")

if [ "$HTTP_STATUS" = "201" ]; then
  info "Repository '$REPO_NAME' created on GitHub."
elif [ "$HTTP_STATUS" = "422" ]; then
  warn "Repository '$REPO_NAME' already exists under your account. Pushing to it."
else
  error "GitHub API returned HTTP $HTTP_STATUS. Check token permissions."
fi

# Add remote and push
REMOTE_URL="https://${GH_USER}:${GH_TOKEN}@github.com/${GH_USER}/${REPO_NAME}.git"
git remote add origin "$REMOTE_URL" 2>/dev/null || git remote set-url origin "$REMOTE_URL"
git push -u origin "$BRANCH"

info "Done. Repo is live at: https://github.com/$GH_USER/$REPO_NAME"
