
async function fetchItems(q=""){
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  return await res.json();
}
function cardTemplate(it){
  const bullets = (it.bullets || []).slice(0,4).map(b=>`<li>${b}</li>`).join("");
  const links = (it.links || []).slice(0,3).map(h=>`<a target="_blank" href="${h}">${new URL(h).hostname}</a>`).join("");
  return `
  <div class="card3d">
    <div class="card-face card-front">
      <div class="tag ${it.type}">${it.type}</div>
      <h4>${it.name}</h4>
      <p class="muted">${it.category}</p>
    </div>
    <div class="card-face card-back">
      <ul class="bullets small">${bullets}</ul>
      <div class="links">${links}</div>
    </div>
  </div>`;
}
async function render(q=""){
  const data = await fetchItems(q);
  const el = document.getElementById("cards");
  el.innerHTML = data.map(cardTemplate).join("");
}
const sb = document.getElementById("searchBox");
if(sb){
  sb.addEventListener("input", (e)=>render(e.target.value));
  render();
}
