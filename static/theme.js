
(function(){
  const root = document.documentElement;
  const key = "pp-theme";
  const saved = localStorage.getItem(key);
  if(saved){ document.documentElement.setAttribute("data-theme", saved); }
  function setTheme(t){
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(key, t);
  }
  const btn = document.getElementById("themeToggle");
  if(btn){
    btn.addEventListener("click", ()=>{
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(cur === "dark" ? "light" : "dark");
      btn.classList.add("pop");
      setTimeout(()=>btn.classList.remove("pop"), 350);
    });
  }
  // Glow effect for nav buttons
  document.querySelectorAll("[data-glow]").forEach(a=>{
    a.addEventListener("click", ()=>{
      document.querySelectorAll("[data-glow]").forEach(x=>x.classList.remove("active-glow"));
      a.classList.add("active-glow");
    });
  });
})();
