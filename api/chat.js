const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'skills_careers.json');
let DATA = [];
try { DATA = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')); } catch (e) { DATA = []; }

const LOWER_INDEX = {};
for (const x of DATA) LOWER_INDEX[(x.name||'').toLowerCase()] = x;

function chat_reply(message) {
  const msg = (message||'').trim().toLowerCase();
  if (!msg) return 'Tell me your skills or interests, and I\'ll suggest careers or learning paths.';
  if (msg in LOWER_INDEX) {
    const it = LOWER_INDEX[msg];
    const bullets = (it.bullets||[]).slice(0,4).join(' • ');
    return `${it.name} (${it.type}, ${it.category}): ${bullets}. Try: ${(it.paths||[]).slice(0,2).join(', ')}`;
  }
  const keywords = {
    data: 'Data Scientist or Data Engineer fit well. Build projects with SQL, Python, and dashboards.',
    ml: 'ML Engineer and Data Scientist are great. Study ML fundamentals, deploy models, and monitor them.',
    ai: 'Consider AI Researcher or ML Engineer. Start with Python, calculus, and neural networks.',
    web: 'Frontend or Full-Stack Developer. Learn HTML, CSS, JS, a framework (React/Angular/Vue), and backend basics.',
    cloud: 'Cloud Architect or DevOps Engineer. Practice AWS/Azure/GCP, IaC, and CI/CD.',
    security: 'Cybersecurity Analyst or Security Engineer. Learn networking, OWASP Top 10, and threat modeling.',
    design: 'UI/UX Designer or Product Designer. Build a portfolio with Figma and usability studies.',
    mobile: 'Android (Kotlin) or iOS (Swift) Developer. Ship small apps and learn platform patterns.',
    manager: 'Product Manager. Learn roadmapping, metrics, and user research.'
  };
  for (const k of Object.keys(keywords)) if (msg.includes(k)) return keywords[k];
  // fallback
  const res = DATA.filter(d=> (d.name||'').toLowerCase().includes(msg)).slice(0,1);
  if (res.length) return `Did you mean ${res[0].name}? Key points: ${(res[0].bullets||[]).slice(0,3).join('; ')}`;
  return "I couldn't find an exact match. Try searching a specific skill (e.g., 'Python', 'React', 'Data Science').";
}

module.exports = async (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let data = {};
    try { data = JSON.parse(body || '{}'); } catch (e) { data = {}; }
    const msg = data.message || '';
    const reply = chat_reply(msg);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ reply }));
  });
};
