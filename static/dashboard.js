
async function fetchItems(q=""){
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  return await res.json();
}
function quickCard(it){
  const bullets = (it.bullets || []).slice(0,3).map(b=>`<li>${b}</li>`).join("");
  const links = (it.links || []).slice(0,2).map(h=>`<a target="_blank" href="${h}">${new URL(h).hostname}</a>`).join("");
  return `
  <div class="mini-card">
    <div class="row">
      <span class="tag ${it.type}">${it.type}</span>
      <strong>${it.name}</strong>
    </div>
    <ul class="bullets tiny">${bullets}</ul>
    <div class="links">${links}</div>
  </div>`;
}
async function initDashboard(){
  const q = document.getElementById("quickSearch");
  const r = document.getElementById("quickResults");
  q.addEventListener("input", async (e)=>{
    const data = await fetchItems(e.target.value);
    r.innerHTML = data.slice(0,12).map(quickCard).join("");
  });
  // Seed suggestions
  const seeds = ["Python", "React", "Data Scientist", "DevOps", "Cloud Architect", "UI/UX Designer"];
  document.getElementById("pathSuggest").innerHTML = seeds.map(s=>`<li>• ${s}</li>`).join("");
}
initDashboard();
