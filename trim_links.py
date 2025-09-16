import json

with open('data/skills_careers.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for entry in data:
    if 'links' in entry and isinstance(entry['links'], list):
        entry['links'] = entry['links'][:2]

with open('data/skills_careers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)    