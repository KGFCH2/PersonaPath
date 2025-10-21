# PersonaPath — Personalized Career & Skills Advisor 🧭💼

A ready-to-run web app with a lightweight frontend and a small Flask backend: a rules-based career advisor and a curated dataset of skills & career paths (500+).

---

## ✨ Features

- 🪟 Glassmorphism login with smooth animations
- 💬 Career advisor chat powered by a rules engine and searchable dataset
- 📚 500+ skills & careers with bullets, learning paths, and links
- 🌗 Dark / Light theme toggle with animated control
- ✨ Micro-interactions, hover-to-flip cards, and responsive layout

---

## 🛠 Tech Stack

| Layer      | Technology Used |
|------------|-----------------|
| Frontend   | HTML, CSS, JavaScript |
| Backend    | Python, Flask, Gunicorn |
| Data       | JSON |
| Deployment | Docker / Vercel / Render / Heroku |

---

## 🖥 Run locally (VS Code)

1. Ensure Python 3.10+ is installed.
2. Create and activate a virtual environment (recommended):

```powershell
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
```

3. Install dependencies:

```powershell
pip install -r requirements.txt
```

4. Start the app (development):

```powershell
python app.py

# or use gunicorn for production-like serving
# gunicorn app:app -b 0.0.0.0:5000 --workers 2
```

5. Open http://localhost:5000 in your browser.

---

## 🚀 Deploying (recommendations)

This repo includes a `Dockerfile` and a `render.yaml` so you can deploy easily to Render using Docker. Vercel's Docker builder may not be available in some environments — for Vercel we can convert the app to use serverless functions or publish an image to a container registry.

Quick options:

- Deploy to Render (Docker): connect your GitHub repo in Render and it will use `render.yaml` and your `Dockerfile`.
- Deploy to Vercel: convert to a Vercel-friendly setup (serverless) or publish a container image and configure Vercel to use it.

Test locally with Docker (if Docker is installed):

```powershell
docker build -t personapath:local .
docker run -p 5000:5000 personapath:local
# then open http://localhost:5000
```

Notes:

- Set environment variables in your host's project settings (Render / Vercel / Heroku).
- The app is served by `gunicorn` in the Dockerfile for production.

---

## 📁 Project structure

```
PERSONAPATH/
  app.py
  Procfile
  README.md
  requirements.txt
  trim_links.py
  data/
    skills_careers.json        # Add/edit skills & careers here
  static/
    styles.css
    theme.js
    explore.js
    dashboard.js
    chat.js
  templates/
    base.html
    index.html
    login.html
    dashboard.html
    chat.html
    explore.html
```

---

## 📝 Notes

- The chat uses deterministic rules + search to return exact data where possible.
- Edit `data/skills_careers.json` to update the dataset.
- You can deploy to any Python-friendly host (Render, Railway, Heroku, etc.).

