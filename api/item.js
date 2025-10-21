const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'skills_careers.json');
let DATA = [];
try { DATA = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')); } catch (e) { DATA = []; }

module.exports = async (req, res) => {
  const id = parseInt(req.query.id || req.params.id, 10);
  if (!id) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'missing id' }));
    return;
  }
  const it = DATA.find(x=> x.id === id);
  if (!it) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(it));
};
