const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'skills_careers.json');
let DATA = [];
try { DATA = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')); } catch (e) { DATA = []; }

function search_items(q, limit=30) {
  if (!q) return DATA.slice(0, limit);
  const ql = q.toLowerCase();
  const scored = [];
  for (const item of DATA) {
    const name = (item.name||'').toLowerCase();
    const category = (item.category||'').toLowerCase();
    let score = 0;
    if (name.includes(ql)) score += 5;
    if (category.includes(ql)) score += 2;
    for (const tok of ql.split(/\s+/)) if (tok && name.includes(tok)) score += 1;
    if (score>0) scored.push({score, item});
  }
  scored.sort((a,b)=> b.score - a.score || a.item.name.localeCompare(b.item.name));
  return scored.slice(0, limit).map(x=>x.item);
}

module.exports = async (req, res) => {
  const q = (req.query.q || '');
  const results = search_items(q, 30);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(results));
};
