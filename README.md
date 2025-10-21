
# PersonaPath – Personalized Career & Skills Advisor

A ready-to-run website built with **HTML, CSS, JS** on the frontend and **Python (Flask)** on the backend.

## Features

- Cool **glassmorphism login** with subtle animations
- **Career advisor chat** backed by a rules engine and dataset
- **500+ skills & careers** with bullets, paths, and learning links
- **Dark/Light** theme toggle with glowing **sun/moon** button
- Transparent blur effects, glowing active tabs, and micro-interactions
- **Hover to flip** skill/career cards to reveal bullets and links
- Home page includes a **career journey SVG** illustration (right side)

## Run locally (VS Code)

1. Ensure Python 3.10+ is installed.
2. Create a virtual environment (recommended):

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install flask
   ```

4. Start the app:

   ```bash
   python app.py
   ```

5. Open <http://localhost:5000> in your browser.

## Project structure

```
career_advisor_site/
  app.py
  data/skills_careers.json
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

## Notes

- The chat uses deterministic rules + search to return **exact data** where possible.
- Replace/add items in `data/skills_careers.json` to customize content.
- You can deploy to any Python-friendly host (Render, Railway, etc.).
