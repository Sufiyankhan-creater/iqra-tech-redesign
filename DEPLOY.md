# Iqra Tech Deployment Guide

Follow these steps to run the website locally and deploy it to the world.

## 1. Local Hosting (Localhost)
To run the website on your own machine:
1.  **Open Terminal** in this folder.
2.  **Run Server**:
    ```bash
    npx http-server . -p 8080
    ```
3.  **View Site**: Open your browser and go to `http://localhost:8080`.

## 2. Public Deployment (Netlify)
To let everyone see the website globally:

### Method A: GitHub (Recommended)
1.  **Create Repository**: Go to GitHub and create a new repository called `iqra-tech-redesign`.
2.  **Push Code**:
    ```bash
    git init
    git add .
    git commit -m "Professional Redesign Release"
    git remote add origin YOUR_GITHUB_REPO_URL
    git branch -M main
    git push -u origin main
    ```
3.  **Connect to Netlify**:
    - Go to [Netlify](https://app.netlify.com/).
    - Click **"Add new site"** -> **"Import from existing project"**.
    - Select **GitHub** and pick your repository.
    - Click **"Deploy Site"**.

### Method B: Manual Upload (Easiest)
1.  Go to [Netlify Drop](https://app.netlify.com/drop).
2.  **Drag and Drop** this entire folder into the browser.
3.  Your website will be live in seconds with a public link!

---
> [!TIP]
> **Why Netlify?**
> - It provides a global, high-performance link for free.
> - Every time you push to GitHub, the website updates automatically.
