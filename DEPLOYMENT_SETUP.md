# Deployment Setup Instructions

## 1. Create Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name it: "Blog Deployment Token"
4. Select scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)

## 2. Add Token to Private Repository

1. Go to your private blog repository: https://github.com/A-moment096/blog
2. Go to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `DEPLOY_TOKEN`
5. Value: [paste your personal access token]

## 3. Test Deployment

After setting up the token, push any change to the private repository and the GitHub Action will automatically:
1. Build your Hugo site
2. Deploy the built files to your public A-moment096.github.io repository
3. GitHub Pages will serve the updated site

## 4. New Workflow

### Development:
```bash
# Work in your private blog repository
git clone https://github.com/A-moment096/blog.git
cd blog
# Make changes
git add .
git commit -m "Update content"
git push origin main
```

### Automatic Deployment:
- GitHub Actions automatically builds and deploys
- No manual intervention needed
- Check deployment status in Actions tab

## 5. Benefits

✅ Private source code  
✅ Automatic deployment  
✅ Clean public repository  
✅ Professional workflow  
✅ Easy collaboration  
