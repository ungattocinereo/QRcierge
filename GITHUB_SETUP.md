# GitHub Setup Guide for QRcierge

This guide will help you set up and deploy the QRcierge project on GitHub.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- The QRcierge project cloned to your local machine

## Steps to Deploy on GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Enter a repository name (e.g., 'QRcierge')
   - Add a description (optional)
   - Choose public or private visibility
   - Click 'Create repository'

2. **Initialize Git in your local project (if not already done)**
   ```bash
   cd QRcierge
   git init
   ```

3. **Add your files to Git**
   ```bash
   git add .
   ```

4. **Commit your files**
   ```bash
   git commit -m "Initial commit of QRcierge project"
   ```

5. **Add the remote repository**
   ```bash
   git remote add origin https://github.com/yourusername/QRcierge.git
   ```
   Replace `yourusername` with your actual GitHub username.

6. **Push your code to GitHub**
   ```bash
   git push -u origin main
   ```
   If your default branch is named differently (e.g., 'master'), use that name instead of 'main'.

## Cloning the Repository

To clone the repository on another machine:

```bash
git clone https://github.com/yourusername/QRcierge.git
cd QRcierge
npm install
cp .env.example .env
# Edit .env with your configuration
node generate-qr.js
npm start
```

## Updating Your Repository

After making changes to your code:

```bash
git add .
git commit -m "Description of your changes"
git push
```

## Troubleshooting

- If you encounter authentication issues, you may need to set up SSH keys or use a personal access token.
- If you're having trouble with the initial push, try `git push -f origin main` (use with caution as it overwrites remote changes).
- For more help, refer to [GitHub's documentation](https://docs.github.com/en/get-started).