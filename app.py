
from flask import Flask, jsonify, request, render_template, send_from_directory
import json, os, re

app = Flask(__name__, static_folder="static", template_folder="templates")

DATA_PATH = os.path.join("data", "skills_careers.json")
with open(DATA_PATH, "r", encoding="utf-8") as f:
    DATA = json.load(f)

NAME_INDEX = {str(x["id"]): x for x in DATA}
LOWER_INDEX = {x["name"].lower(): x for x in DATA}

def search_items(q, limit=30):
    if not q:
        return DATA[:limit]
    ql = q.lower()
    scored = []
    for item in DATA:
        name = item["name"].lower()
        category = item.get("category", "").lower()
        score = 0
        if ql in name:
            score += 5
        if ql in category:
            score += 2
        # simple fuzzy: token overlap
        for tok in ql.split():
            if tok in name:
                score += 1
        if score > 0:
            scored.append((score, item))
    scored.sort(key=lambda x: (-x[0], x[1]["name"]))
    return [x[1] for x in scored[:limit]]

def chat_reply(message):
    msg = (message or "").strip().lower()
    if not msg:
        return "Tell me your skills or interests, and I'll suggest careers or learning paths."
    # direct match
    if msg in LOWER_INDEX:
        it = LOWER_INDEX[msg]
        bullets = " • ".join(it.get("bullets", [])[:4])
        return f"{it['name']} ({it['type']}, {it['category']}): {bullets}. Try: " + ", ".join(it.get("paths", [])[:2])
    # keyword heuristics
    keywords = {
        "data": "Data Scientist or Data Engineer fit well. Build projects with SQL, Python, and dashboards.",
        "ml": "ML Engineer and Data Scientist are great. Study ML fundamentals, deploy models, and monitor them.",
        "ai": "Consider AI Researcher or ML Engineer. Start with Python, calculus, and neural networks.",
        "web": "Frontend or Full-Stack Developer. Learn HTML, CSS, JS, a framework (React/Angular/Vue), and backend basics.",
        "cloud": "Cloud Architect or DevOps Engineer. Practice AWS/Azure/GCP, IaC, and CI/CD.",
        "security": "Cybersecurity Analyst or Security Engineer. Learn networking, OWASP Top 10, and threat modeling.",
        "design": "UI/UX Designer or Product Designer. Build a portfolio with Figma and usability studies.",
        "mobile": "Android (Kotlin) or iOS (Swift) Developer. Ship small apps and learn platform patterns.",
        "manager": "Product Manager. Learn roadmapping, metrics, and user research.",
    }
    for k, v in keywords.items():
        if k in msg:
            return v
    # fallback: search top-1 and present summary
    res = search_items(msg, limit=1)
    if res:
        r = res[0]
        return f"Did you mean {r['name']}? Key points: " + "; ".join(r['bullets'][:3])
    return "I couldn't find an exact match. Try searching a specific skill (e.g., 'Python', 'React', 'Data Science')."

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/chat")
def chat():
    return render_template("chat.html")

@app.route("/explore")
def explore():
    return render_template("explore.html")

@app.route("/api/search")
def api_search():
    q = request.args.get("q", "")
    return jsonify(search_items(q))

@app.route("/api/item/<int:item_id>")
def api_item(item_id):
    for it in DATA:
        if it["id"] == item_id:
            return jsonify(it)
    return jsonify({"error": "not found"}), 404

@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.get_json(silent=True) or {}
    msg = data.get("message", "")
    return jsonify({"reply": chat_reply(msg)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
