
const log = document.getElementById("chatLog");
function append(role, text){
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.innerText = text;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
}
append("bot", "Hi! Tell me a skill or interest and I'll suggest careers and learning paths.");
document.getElementById("chatForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if(!msg) return;
  append("user", msg);
  input.value = "";
  const res = await fetch("/api/chat", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({message: msg})});
  const data = await res.json();
  append("bot", data.reply || "I had trouble responding.");
});
