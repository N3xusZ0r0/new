// ========================================
// EASY CUSTOMIZATION AREA
// Edit your personal information here.
// ========================================
const profile = {
  name: "JOSEPH ZHARIEL A. SAMANIEGO",
  age: "20",
  email: "avianahsakura@gmail.com",
  university: "NUEVA VIZCAYA STATE UNIVESITY",
  location: "BAYOMBONG N.V.",
  course: "BSIT"
};
const social = {
  github: "https://github.com/N3xusZ0r0",
  
};
const tagline = "Learning how systems work so I can build them better and defend them.";
const bio = "I'm a student with a strong interest in programming, cybersecurity, computer systems, ethical hacking, networking and hardware. I enjoy understanding how things work from the inside, whether that's code, a network, or a computer I can take apart and rebuild. I'm always learning and looking for projects that help me grow.";

// Skill levels: "Learning" (1), "Familiar" (2), "Intermediate" (3). Change them to match your experience.
const skills = [
  { name: "Ethical Hacking", icon: "🕵️", level: "Learning", desc: "Studying legal, authorized security testing concepts." },
  { name: "Cybersecurity", icon: "🛡️", level: "Learning", desc: "Learning how to protect systems, data and networks." },
  { name: "Computer System Servicing", icon: "🖥️", level: "Intermediate", desc: "Installing, maintaining and troubleshooting computers." },
  { name: "Speed Typing", icon: "⌨️", level: "Intermediate", desc: "Fast, accurate typing for coding and terminal work." },
  { name: "Disassembly & Assembly", icon: "🔧", level: "Intermediate", desc: "Taking apart and rebuilding computer hardware." },
  { name: "MikroTik", icon: "📡", level: "Familiar", desc: "Basic networking and router configuration." }
];

const education = [
  { level: "Elementary", school: "Sta Rosa Elementary School", },
  { level: "Junior High School", school: "Nueva Vizcaya General Comprehensive High School", },
  { level: "Senior High School", school: "Nueva Vizcaya General Comprehensive High School", }
];

const defaultAchievements = [
  { id: 1, title: "Hack for Gov", description: "Participation in the \"Hack for Gov\" competition.", badge: "PARTICIPANT" }
];

// EXAMPLE projects: replace them (or use the admin panel: Ctrl+Shift+A).
const defaultProjects = [
  { id: 1, title: "Project Name (Example)", description: "Project description goes here.", image: "placeholder", technologies: ["HTML", "CSS", "JavaScript"], status: "Coming Soon", github: "#", demo: "#", example: true },
  { id: 2, title: "Network Lab Notes (Example)", description: "Placeholder: write about a networking or MikroTik lab you did.", image: "placeholder", technologies: ["MikroTik", "Networking"], status: "Planned", github: "#", demo: "#", example: true },
  { id: 3, title: "Typing Trainer (Example)", description: "Placeholder: a small typing practice web app.", image: "placeholder", technologies: ["JavaScript", "localStorage"], status: "Idea", github: "#", demo: "#", example: true }
];
// ========================================
// END OF CUSTOMIZATION AREA
// ========================================

const KEYS = { projects: "pf_projects", achievements: "pf_achievements", skip: "pf_skip_intro" };
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = u => /^(https?:\/\/|#|mailto:)/i.test(u || "") ? u : "#";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const levelNum = { Learning: 1, Familiar: 2, Intermediate: 3 };

// ---------- localStorage helpers (safe if storage is blocked) ----------
function load(key, defaults) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) { const v = JSON.parse(raw); if (Array.isArray(v)) return v; }
    localStorage.setItem(key, JSON.stringify(defaults));
  } catch (e) { /* storage unavailable: use defaults */ }
  return JSON.parse(JSON.stringify(defaults));
}
function save(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {} }
const store = { projects: load(KEYS.projects, defaultProjects), achievements: load(KEYS.achievements, defaultAchievements) };

// ---------- Audio (Web Audio API, generated sounds only) ----------
let audioOn = false, actx = null;
function beep(freq = 440, dur = .08, type = "square") {
  if (!audioOn || !actx) return;
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.value = freq; g.gain.value = .04;
  o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + dur);
}
$("#audioBtn").addEventListener("click", e => {
  audioOn = !audioOn;
  if (audioOn && !actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (err) { audioOn = false; } }
  e.currentTarget.textContent = "CYBER AUDIO: " + (audioOn ? "ON" : "OFF");
  e.currentTarget.setAttribute("aria-pressed", audioOn);
  beep(660);
});

// ---------- Boot / hack intro ----------
const boot = $("#boot");
let bootTimers = [];
function enterSite() {
  bootTimers.forEach(clearTimeout);
  if ($("#rememberSkip").checked) { try { localStorage.setItem(KEYS.skip, "1"); } catch (e) {} }
  beep(880, .15, "sine");
  boot.hidden = true; document.body.classList.remove("locked");
  $("#main").focus({ preventScroll: true });
}
function runBoot() {
  document.body.classList.add("locked");
  const lines = ["INITIALIZING SECURE CONNECTION...", "BYPASSING FIREWALL...", "ACCESSING PORTFOLIO DATABASE..."];
  const log = $("#bootLog"); const gap = reduced ? 150 : 900;
  lines.forEach((t, i) => bootTimers.push(setTimeout(() => {
    const p = document.createElement("p"); p.textContent = "> " + t; log.appendChild(p); beep(300 + i * 150);
  }, 300 + i * gap)));
  const t1 = 300 + lines.length * gap;
  bootTimers.push(setTimeout(() => { $("#pwned").hidden = false; beep(120, .4, "sawtooth"); }, t1));
  bootTimers.push(setTimeout(() => { $("#granted").hidden = false; $("#enterBtn").hidden = false; beep(990, .12); $("#enterBtn").focus(); }, t1 + (reduced ? 200 : 1600)));
}
$("#enterBtn").addEventListener("click", enterSite);
$("#skipBtn").addEventListener("click", enterSite);
let skip = false; try { skip = localStorage.getItem(KEYS.skip) === "1"; } catch (e) {}
if (skip) { boot.hidden = true; } else { runBoot(); }

// ---------- Navigation ----------
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
$$("#menu a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));

// ---------- Rendering ----------
function renderStatic() {
  $("#logoName").textContent = profile.name.split(" ")[0].toLowerCase();
  $("#heroName").textContent = profile.name; $("#footName").textContent = profile.name;
  $("#heroTag").textContent = tagline; $("#bio").textContent = bio;
  const info = [["👤", "Name", profile.name], ["🎂", "Age", profile.age], ["✉️", "Email", profile.email],
    ["🏫", "University / College", profile.university], ["📍", "Location", profile.location], ["💻", "Course", profile.course]];
  $("#profileCards").innerHTML = info.map(([i, l, v]) => `<article class="card glass tilt"><span class="ico" aria-hidden="true">${i}</span><p class="lab">${l}</p><h3>${esc(v)}</h3></article>`).join("");
  $("#skillGrid").innerHTML = skills.map(s => {
    const n = levelNum[s.level] || 1;
    return `<article class="card glass skill tilt"><span class="ico" aria-hidden="true">${s.icon}</span><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p>
    <div class="lvl" role="img" aria-label="Level: ${s.level}">${[1, 2, 3].map(k => `<i class="${k <= n ? "on" : ""}"></i>`).join("")}<span>${s.level}</span></div></article>`;
  }).join("");
  $("#timeline").innerHTML = education.map(e => `<li><div class="card glass tilt"><span class="badge">${esc(e.level)}</span><h3>${esc(e.school)}</h3><p class="lab">${esc(e.years)}</p><p>${esc(e.desc)}</p></div></li>`).join("");
  const mail = profile.email.includes("@") ? `<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : esc(profile.email);
  $("#contactCards").innerHTML = [["✉️", "Email", mail], ["🏫", "University", esc(profile.university)], ["📍", "Location", esc(profile.location)],
    ["🐙", "GitHub", `<a href="${esc(social.github)}" target="_blank" rel="noopener">${esc(social.github)}</a>`],
    ...(social.linkedin ? [["🔗", "LinkedIn", `<a href="${esc(social.linkedin)}" target="_blank" rel="noopener">${esc(social.linkedin)}</a>`]] : [])]
    .map(([i, l, v]) => `<article class="card glass tilt"><span class="ico" aria-hidden="true">${i}</span><p class="lab">${l}</p><h3>${v}</h3></article>`).join("");
}
function renderDynamic() {
  $("#achGrid").innerHTML = store.achievements.length ? store.achievements.map(a => `<article class="card glass ach tilt">
    <span class="ico" aria-hidden="true" data-tip="Achievement">🏆</span><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p>
    <p class="lab">${esc(a.year)}</p><span class="badge st">${esc(a.badge || "ACHIEVEMENT")}</span></article>`).join("") : `<p class="muted">No achievements yet. Press Ctrl+Shift+A to add one.</p>`;
  $("#projGrid").innerHTML = store.projects.length ? store.projects.map(p => {
    const img = p.image && p.image !== "placeholder" ? `<img src="${esc(safeUrl(p.image))}" alt="Screenshot of ${esc(p.title)}">` : "[ PROJECT IMAGE ]";
    const link = (u, t) => safeUrl(u) === "#" ? `<span class="btn small off" aria-disabled="true" title="Add a link in the admin panel">${t}</span>` : `<a class="btn small" href="${esc(safeUrl(u))}" target="_blank" rel="noopener">${t}</a>`;
    return `<article class="card glass tilt"><div class="thumb">${img}</div>
    ${p.example ? '<span class="badge ex">EXAMPLE</span>' : ""}<span class="badge st">${esc(p.status)}</span>
    <h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
    <div class="tags">${(p.technologies || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
    <div class="btns">${link(p.github, "GitHub")}${link(p.demo, "Demo")}</div></article>`;
  }).join("") : `<p class="muted">No projects yet. Press Ctrl+Shift+A to add one.</p>`;
  bindTilt();
}

// ---------- 3D tilt (mouse only, skipped for touch / reduced motion) ----------
function bindTilt() {
  if (reduced || !matchMedia("(hover:hover)").matches) return;
  $$(".tilt").forEach(el => {
    if (el.dataset.tilt) return; el.dataset.tilt = "1";
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 8 + "deg");
      el.style.setProperty("--rx", -((e.clientY - r.top) / r.height - .5) * 8 + "deg");
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  });
}

// ---------- Scroll animations ----------
function observe() {
  const els = $$(".reveal, .timeline li");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  els.forEach((e, i) => { if (e.tagName === "LI") e.style.transitionDelay = i * 0.12 + "s"; io.observe(e); });
}

// ---------- Terminal ----------
const out = $("#termOut"), inp = $("#termIn");
const history = []; let hIdx = 0, queue = Promise.resolve();
const sleep = ms => new Promise(r => setTimeout(r, ms));
function print(lines, cls = "") {
  queue = queue.then(async () => {
    for (const l of [].concat(lines)) {
      const d = document.createElement("div"); d.textContent = l; if (cls) d.className = cls; out.appendChild(d);
      out.scrollTop = out.scrollHeight; if (!reduced) await sleep(14);
    }
  });
}
const banner = () => ["  ____   ___  ____ _____ _____ ___  _     ___ ___ ", " |  _ \\ / _ \\|  _ \\_   _|  ___/ _ \\| |   |_ _/ _ \\", " | |_) | | | | |_) || | | |_ | | | | |    | | | | |", " |  __/| |_| |  _ < | | |  _|| |_| | |___ | | |_| |", " |_|    \\___/|_| \\_\\|_| |_|   \\___/|_____|___\\___/ ", "", ` ${profile.name} :: cybersecurity & systems student`];
const commands = {
  help: () => ["Available commands:", "  help          show this list", "  about         short bio", "  skills        list skills", "  education     education timeline", "  achievements  achievements", "  projects      project list", "  contact       contact info", "  whoami        who am I", "  date          current date/time", "  banner        show banner", "  clear         clear the screen"],
  about: () => [bio, "", `Name: ${profile.name}`, `Age: ${profile.age}`, `School: ${profile.university}`, `Course: ${profile.course}`, `Location: ${profile.location}`],
  skills: () => skills.map(s => `[${"#".repeat(levelNum[s.level] || 1).padEnd(3, ".")}] ${s.name} (${s.level})`),
  education: () => education.flatMap(e => [`${e.level}: ${e.school}`, `   ${e.years}`]),
  achievements: () => store.achievements.length ? store.achievements.map(a => `* ${a.title}${a.year ? ` (${a.year})` : ""} - ${a.description}`) : ["No achievements saved."],
  projects: () => store.projects.length ? store.projects.flatMap(p => [`* ${p.title} [${p.status}]`, `    ${p.description}`, `    Tech: ${(p.technologies || []).join(", ")}`]) : ["No projects saved."],
  contact: () => [`Email:      ${profile.email}`, `University: ${profile.university}`, `Location:   ${profile.location}`, `GitHub:     ${social.github}`, ...(social.linkedin ? [`LinkedIn:   ${social.linkedin}`] : [])],
  whoami: () => [`${profile.name} - aspiring programmer & cybersecurity student`],
  date: () => [new Date().toString()],
  banner
};
function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  print(`user@portfolio:~$ ${raw}`, "cmd");
  if (!cmd) return;
  history.push(raw); hIdx = history.length;
  if (cmd === "clear") { queue = queue.then(() => { out.innerHTML = ""; }); return; }
  if (commands[cmd]) print(commands[cmd]()); else print('Command not found. Type "help" for available commands.', "err");
}
inp.addEventListener("keydown", e => {
  if (e.key === "Enter") { runCommand(inp.value); inp.value = ""; }
  else if (e.key === "ArrowUp") { e.preventDefault(); if (hIdx > 0) inp.value = history[--hIdx]; }
  else if (e.key === "ArrowDown") { e.preventDefault(); hIdx = Math.min(hIdx + 1, history.length); inp.value = history[hIdx] || ""; }
});
$("#termBox").addEventListener("click", () => inp.focus());

// ---------- Admin panel (local demo only, NOT secure) ----------
const ADMIN = {
  projects: [["title", "Title"], ["description", "Description", "ta"], ["image", "Image URL (or 'placeholder')"], ["technologies", "Technologies (comma separated)"], ["status", "Status"], ["github", "GitHub URL"], ["demo", "Demo URL"]],
  achievements: [["title", "Title"], ["description", "Description", "ta"], ["year", "Year / date"], ["badge", "Badge text"]]
};
const defaults = { projects: defaultProjects, achievements: defaultAchievements };
let tab = "projects", editId = null, lastFocus = null;
const modal = $("#admin"), form = $("#adminForm");

function openAdmin() { lastFocus = document.activeElement; modal.hidden = false; renderAdmin(); $("#adminClose").focus(); }
function closeAdmin() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
function renderAdmin() {
  $$(".tabs .btn").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === tab));
  $("#adminList").innerHTML = store[tab].map(i => `<li><span>${esc(i.title)}</span><span><button type="button" class="btn small" data-edit="${i.id}">Edit</button> <button type="button" class="btn small alt" data-del="${i.id}">Delete</button></span></li>`).join("") || "<li>Nothing here yet.</li>";
  const item = store[tab].find(i => i.id === editId) || {};
  form.innerHTML = `<h3 class="mono">${editId ? "Edit item" : "Add new item"}</h3>` + ADMIN[tab].map(([k, l, t]) => {
    let v = item[k] ?? ""; if (Array.isArray(v)) v = v.join(", ");
    return `<label>${l}${t ? `<textarea name="${k}" rows="3">${esc(v)}</textarea>` : `<input name="${k}" value="${esc(v)}">`}</label>`;
  }).join("") + `<div class="admin-actions"><button class="btn small" type="submit">${editId ? "Save changes" : "Add"}</button>${editId ? '<button class="btn small alt" type="button" id="cancelEdit">Cancel edit</button>' : ""}</div>`;
}
form.addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.title.trim()) { alert("Title is required."); return; }
  if (tab === "projects") data.technologies = data.technologies.split(",").map(t => t.trim()).filter(Boolean);
  if (editId) { const i = store[tab].findIndex(x => x.id === editId); store[tab][i] = { ...store[tab][i], ...data, example: false }; }
  else store[tab].push({ id: Date.now(), ...data });
  editId = null; save(KEYS[tab], store[tab]); renderAdmin(); renderDynamic();
});
$("#adminList").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.edit) { editId = +b.dataset.edit; renderAdmin(); }
  if (b.dataset.del && confirm("Delete this item?")) { store[tab] = store[tab].filter(x => x.id !== +b.dataset.del); editId = null; save(KEYS[tab], store[tab]); renderAdmin(); renderDynamic(); }
});
form.addEventListener("click", e => { if (e.target.id === "cancelEdit") { editId = null; renderAdmin(); } });
$$(".tabs .btn").forEach(b => b.addEventListener("click", () => { tab = b.dataset.tab; editId = null; renderAdmin(); }));
$("#adminReset").addEventListener("click", () => {
  if (!confirm(`Reset ${tab} to the original defaults?`)) return;
  store[tab] = JSON.parse(JSON.stringify(defaults[tab])); editId = null; save(KEYS[tab], store[tab]); renderAdmin(); renderDynamic();
});
$("#adminClose").addEventListener("click", closeAdmin);
$("#adminOpen").addEventListener("click", openAdmin);
modal.addEventListener("click", e => { if (e.target === modal) closeAdmin(); });
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") { e.preventDefault(); modal.hidden ? openAdmin() : closeAdmin(); }
  else if (e.key === "Escape" && !modal.hidden) closeAdmin();
});

// ---------- Background: lightweight digital rain on one canvas ----------
(function rain() {
  const c = $("#bg"), ctx = c.getContext("2d"); let cols, drops, w, h, last = 0;
  const chars = "01{}[]<>/;$#ABCDEF";
  function size() { w = c.width = innerWidth; h = c.height = innerHeight; cols = Math.ceil(w / 18); drops = Array.from({ length: cols }, () => Math.random() * h / 18); }
  size(); addEventListener("resize", size);
  function frame(t) {
    requestAnimationFrame(frame);
    if (document.hidden || t - last < (innerWidth < 700 ? 110 : 70)) return; last = t;
    ctx.fillStyle = "rgba(7,8,12,.12)"; ctx.fillRect(0, 0, w, h); ctx.font = "14px monospace";
    drops.forEach((y, i) => {
      ctx.fillStyle = Math.random() > .96 ? "#00ffff" : "#00aaff";
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 18, y * 18);
      drops[i] = y * 18 > h && Math.random() > .975 ? 0 : y + 1;
    });
  }
  if (reduced) { ctx.fillStyle = "#07080c"; ctx.fillRect(0, 0, w, h); } else requestAnimationFrame(frame);
})();

// ---------- Start ----------
renderStatic(); renderDynamic(); observe();
print(["Welcome to the portfolio terminal.", 'Type "help" to see available commands.', ""]);
