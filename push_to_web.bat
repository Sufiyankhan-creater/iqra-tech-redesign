@echo off
echo ====================================================
echo    IQRA TECH PRO DEPLOYMENT AUTOMATION
echo ====================================================
echo.
echo 1. Make sure you have created a NEW repository on GitHub.
echo 2. Copy the URL (e.g., https://github.com/yourname/repo.git)
echo.
set /p giturl="Enter your GitHub Repository URL: "

echo.
echo [1/4] Configuring Local Identity...
git config user.email "deploy@iqratech.com"
git config user.name "Iqra Tech Deployer"

echo [2/4] Initializing Local Repository...
git init
git add .
git commit -m "Professional Release v2.0 - Futuristic Quran Reader"
git branch -M main

echo [3/4] Linking to GitHub...
git remote remove origin >nul 2>&1
git remote add origin %giturl%

echo [4/4] Pushing to GitHub...
git push -u origin main -f

echo.
echo ====================================================
echo SUCCESS: Your site is now on GitHub!
echo.
echo FINAL STEP:
echo 1. Go to your Netlify Dashboard (app.netlify.com)
echo 2. Click "Add new site" -> "Import from existing project"
echo 3. Select GitHub and pick this repository.
echo ====================================================
pause
