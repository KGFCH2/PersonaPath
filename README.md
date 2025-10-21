# PersonaPath  Personalized Career & Skills Advisor 

A ready-to-run website built with **HTML, CSS, JS** on the frontend and **Python (Flask)** on the backend.
_A lightweight career-advisor experience with a rules-based chat and 500+ skills & career paths._ 

---

##  Features

-  Cool glassmorphism login with subtle animations
-  Career advisor chat backed by a rules engine and curated dataset
-  500+ skills & careers with bullets, learning paths, and links
- / Dark & Light theme toggle with animated control
-  Micro-interactions, hover-to-flip cards, and responsive layout

---

##  Tech Stack

| Layer      | Technology Used |
|------------|-----------------|
| Frontend   | HTML, CSS, JavaScript |
| Backend    | Python, Flask, Gunicorn |
| Data       | JSON |
| Deployment | Docker / Vercel / Heroku / Render |

---

##  Run locally (VS Code)

1. Ensure Python 3.10+ is installed.
2. Create a virtual environment (recommended):

`powershell
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
`

3. Install dependencies:

`powershell
pip install -r requirements.txt
`

4. Start the app (development):

`powershell
python app.py
# or use gunicorn for production-like serving
# gunicorn app:app -b 0.0.0.0:5000 --workers 2
`

5. Open http://localhost:5000/ in your browser.

---

## Deploying to Vercel (using Docker)

This repo includes ercel.json and a Dockerfile so Vercel can build and deploy the app using Docker. Vercel will use the Dockerfile to build the image and run the container.

Quick steps:

1. Install the Vercel CLI and login (optional): ercel login
2. From the project root run ercel and follow prompts.

Test locally with Docker:

`powershell
docker build -t personapath:local .
docker run -p 5000:5000 personapath:local
# then open http://localhost:5000/
`

Notes:

- Set any environment variables in the Vercel Project Settings  Environment Variables.
- The app is served by gunicorn in the Dockerfile.

---

## Project structure

`
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
`

---

## Notes

- The chat uses deterministic rules + search to return exact data where possible.
- Replace/add items in data/skills_careers.json to customize content.
- You can deploy to any Python-friendly host (Render, Railway, Heroku, etc.).
